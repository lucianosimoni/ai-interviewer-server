const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { generateResponse } = require("./myOpenAi.js");
const {
  createNewUser,
  createNewInterview,
  getAllUserInterviews,
  createNewMessage,
  createNewSummary,
  updateMessageSummaryId,
} = require("./database.js");

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

// INTERVIEWS
app.get("/user/:userId/interview", (req, res) => {
  getAllUserInterviews(req, res);
});
app.post("/user/:userId/interview", (req, res) => {
  createNewInterview(req, res);
});

// MESSAGES
app.post("/user/:userId/interview/:interviewId/message", (req, res) => {
  createNewMessage(req, res);
});
app.patch(
  "/user/:userId/interview/:interviewId/message/:messageId",
  (req, res) => {
    updateMessageSummaryId(req, res);
  }
);

// SUMMARIES
app.post("/user/:userId/interview/:interviewId/summary", (req, res) => {
  createNewSummary(req, res);
});

app.listen(port, () => {
  console.log(`🟢 [SERVER] Running on http://localhost:${port}/`);
});
