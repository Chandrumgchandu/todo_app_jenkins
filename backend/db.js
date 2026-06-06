const { Pool } = require("pg");

const pool = new Pool({
  user: "todo_user",
  host: "localhost",
  database: "todoapp",
  password: "StrongPassword123",
  port: 5432,
});

module.exports = pool;
