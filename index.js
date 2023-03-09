const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { generateResponse } = require("./myOpenAi.js");
const { createNewUser } = require("./database.js");

const app = express();
const port = 3000;
app.use(morgan("short"));
app.use(express.json());
// TODO: Cors open to all endpoints - Not cool, right? - For dev only
app.use(cors());

// Basic back-end preview
app.get("/", (req, res) => {
  res.send(
    "<h1>Hello there! 🧙‍♂️</h1><a target='_blank' href='https://github.com/lucianosimoni/ai-interviewer-server'>GitHub</a><br/><a target='_blank' href='https://www.linkedin.com/in/luciano-simoni/'>LinkedIn</a>"
  );
});

app.post("/", (req, res) => {
  generateResponse(req, res);
});

app.post("/user", (req, res) => {
  createNewUser(req, res);
});

app.listen(port, () => {
  console.log(`🟢 [SERVER] Running on http://localhost:${port}/`);
});
