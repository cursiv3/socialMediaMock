const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

module.exports = app;
