const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { createNewSummary } = require("./database.js");

const app = express();
const port = 3000;

app.use(morgan("short"));
app.use(express.json());
// FIXME: Cors open to all endpoints - Not cool, right? - For dev only
app.use(cors());

const userRouter = require("./routers/user.js");
const interviewRouter = require("./routers/interview.js");
const openaiRouter = require("./routers/openai.js");
const interviewMessageRouter = require("./routers/interviewMessage.js");

app.use("/user", userRouter);
app.use("/interview", interviewRouter);
app.use("/interview-message", interviewMessageRouter);
app.use("/openai", openaiRouter);

// Basic back-end preview
app.get("/", (req, res) => {
  res.send(
    "<h1>Hello there! 🧙‍♂️</h1><a target='_blank' href='https://github.com/lucianosimoni/ai-interviewer-server'>GitHub</a><br/><a target='_blank' href='https://www.linkedin.com/in/luciano-simoni/'>LinkedIn</a>"
  );
});

// SUMMARIES
app.post("/user/:userId/interview/:interviewId/summary", (req, res) => {
  createNewSummary(req, res);
});

app.listen(port, () => {
  console.log(`🟢 [SERVER] Running on http://localhost:${port}/`);
});
