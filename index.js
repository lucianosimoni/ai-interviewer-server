const express = require("express");
const morgan = require("morgan");
const { generateResponse } = require("./myOpenAi.js");
const { PrismaClient } = require("@prisma/client");

const app = express();
const port = 3000;
app.use(morgan("dev"));
app.use(express.json());

const prisma = new PrismaClient();

app.post("/", (req, res) => {
  generateResponse(req, res);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`🟢 [SERVER] Running on http://localhost:${port}/`);
});
