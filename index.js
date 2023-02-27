const express = require("express");
const morgan = require("morgan");
const myOpenAi = require("./myOpenAi");
// const [generateResponse] = require("./openai.js");

const app = express();
const port = 3000;
app.use(morgan("dev"));
app.use(express.json());

app.post("/", (req, res) => {
  myOpenAi.generateResponse(req, res);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`🟢 [SERVER] Running on http://localhost:${port}/`);
});
