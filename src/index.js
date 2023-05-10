import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import authenticate from "./middleware/authenticate.js";

const app = express();
const port = 3000;

app.use(morgan("short"));
app.use(express.json());
// FIXME: Cors open to all endpoints - Not cool, right? - For dev only
app.use(cors());

const upload = multer({ dest: "./public/data/uploads/" });

import userRouter from "./routers/user.js";
import interviewRouter from "./routers/interview.js";
import interviewMessageRouter from "./routers/interviewMessage.js";
import interviewSummaryRouter from "./routers/interviewSummary.js";
import openaiRouter from "./routers/openai.js";

app.use("/user", userRouter);
app.use("/interview", authenticate, interviewRouter);
app.use("/interview-message", authenticate, interviewMessageRouter);
app.use("/interview-summary", authenticate, interviewSummaryRouter);
app.use("/openai", authenticate, upload.single("audioFile"), openaiRouter);

// Basic back-end preview
app.get("/", (req, res) => {
  res.send(
    "<h1>Hello there! 🧙‍♂️</h1><a target='_blank' href='https://github.com/lucianosimoni/ai-interviewer-server'>GitHub</a><br/><a target='_blank' href='https://www.linkedin.com/in/luciano-simoni/'>LinkedIn</a>"
  );
});

app.listen(port, () => {
  console.log(`🟢 [SERVER] Running on http://localhost:${port}/`);
});
