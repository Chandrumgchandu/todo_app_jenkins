const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("./db");
const auth = require("./middleware/auth");

const app = express();

const JWT_SECRET = "mysecretkey";

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

/* =========================
   TEST ROUTES
========================= */

app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.get("/api/message", (req, res) => {
    res.json({
        message: "Hello from DevOps Project v2!"
    });
});

/* =========================
   AUTH ROUTES
========================= */

app.post("/api/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const result = await pool.query(
            `
            INSERT INTO users(username, password)
            VALUES($1, $2)
            RETURNING id, username
            `,
            [username, hashedPassword]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

app.post("/api/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        const user = result.rows[0];

        const validPassword =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!validPassword) {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                userId: user.id
            },
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            token
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

/* =========================
   TODO ROUTES
========================= */

app.post("/api/todos", auth, async (req, res) => {

    try {

        const { title } = req.body;

        const result = await pool.query(
            `
            INSERT INTO todos(title, user_id)
            VALUES($1, $2)
            RETURNING *
            `,
            [
                title,
                req.userId
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

app.get("/api/todos", auth, async (req, res) => {

    try {

        const result = await pool.query(
            `
            SELECT *
            FROM todos
            WHERE user_id = $1
            ORDER BY id
            `,
            [req.userId]
        );

        res.json(result.rows);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

app.put("/api/todos/:id", auth, async (req, res) => {

    try {

        const { id } = req.params;
        const { completed } = req.body;

        const result = await pool.query(
            `
            UPDATE todos
            SET completed = $1
            WHERE id = $2
            AND user_id = $3
            RETURNING *
            `,
            [
                completed,
                id,
                req.userId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Todo not found"
            });
        }

        res.json(result.rows[0]);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

app.delete("/api/todos/:id", auth, async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            DELETE FROM todos
            WHERE id = $1
            AND user_id = $2
            RETURNING *
            `,
            [
                id,
                req.userId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Todo not found"
            });
        }

        res.json({
            message: "Todo deleted"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

/* =========================
   START SERVER
========================= */

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
