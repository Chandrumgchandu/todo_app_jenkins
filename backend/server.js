const express = require("express");
const cors = require("cors");
const path = require("path");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/message", (req, res) => {
    res.json({
        message: "Hello from DevOps Project v2!"
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.post("/api/todos", async (req, res) => {
    try {
        const { title } = req.body;

        const result = await pool.query(
            "INSERT INTO todos (title) VALUES ($1) RETURNING *",
            [title]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.get("/api/todos", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM todos ORDER BY id"
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



app.put("/api/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;

        const result = await pool.query(
            "UPDATE todos SET completed=$1 WHERE id=$2 RETURNING *",
            [completed, id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




app.delete("/api/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query(
            "DELETE FROM todos WHERE id=$1",
            [id]
        );

        res.json({ message: "Todo deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




