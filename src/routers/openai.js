import express from "express";
import {
  generateResponse,
  generateTextFromSpeech,
} from "../controllers/openai.js";

const router = express.Router();

router.post("/", async (req, res) => {
  await generateResponse(req, res);
});

router.post("/speech-to-text", async (req, res) => {
  await generateTextFromSpeech(req, res);
});

export default router;
