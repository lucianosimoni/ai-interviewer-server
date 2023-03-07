const express = require("express");
const morgan = require("morgan");
const { generateResponse } = require("./myOpenAi.js");
const { createNewUser } = require("./database.js");

const app = express();
const port = 3000;
app.use(morgan("dev"));
app.use(express.json());

app.post("/", (req, res) => {
  generateResponse(req, res);
});

app.post("/user", (req, res) => {
  createNewUser(req, res);
});

app.listen(port, () => {
  console.log(`🟢 [SERVER] Running on http://localhost:${port}/`);
});
