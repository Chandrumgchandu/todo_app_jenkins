const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.POSTGRES_USER || "todo_user",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "todoapp",
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT || 5432),
});

module.exports = pool;
