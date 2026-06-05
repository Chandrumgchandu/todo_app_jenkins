const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from DevOps Project!");
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
