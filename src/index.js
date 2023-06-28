import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";

import authenticate from "./middleware/authenticate.js";
import userRouter from "./routers/user.js";
import interviewRouter from "./routers/interview.js";
import interviewMessageRouter from "./routers/interviewMessage.js";
import interviewSummaryRouter from "./routers/interviewSummary.js";
import openaiRouter from "./routers/openai.js";

dotenv.config();

const app = express();
const port = 3000;

const whitelist = process.env.WHITELIST.split(",");
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(`🔴⚠️ Not allowed by CORS from origin: ${origin}`, false);
  },
};
app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());

const upload = multer({ dest: "./public/data/uploads/" });

app.use("/user", userRouter);
app.use("/interview", authenticate, interviewRouter);
app.use("/interview-message", authenticate, interviewMessageRouter);
app.use("/interview-summary", authenticate, interviewSummaryRouter);
app.use("/openai", authenticate, upload.single("audioFile"), openaiRouter);

// Basic back-end preview
app.get("/", (req, res) => {
  res.send(
    `<h1>Hello there! 🧙‍♂️</h1>
    <a target='_blank' href='https://github.com/lucianosimoni/ai-interviewer-server'>GitHub</a>
    <br/>
    <a target='_blank' href='https://www.linkedin.com/in/luciano-simoni/'>LinkedIn</a>
    <br/>
    <a target='_blank' href='https://lucianosimoni.dev'>My portfolio</a>`
  );
});

app.listen(port, () => {
  console.log(`🟢 [SERVER] Running on http://localhost:${port}/`);
});
