const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from DevOps Project!; Jenikin done; Happy");
	res.send("Hello from DevOps Project v2!");
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
