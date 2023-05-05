import express from "express";
import {
  create,
  getAll,
  updateSummary,
} from "../controllers/interviewMessage.js";

const router = express.Router();

router.post("/", async (req, res) => {
  await create(req, res);
});

router.get("/", async (req, res) => {
  // 📦 Accepts QUERY interviewId and userId
  await getAll(req, res);
});

router.patch("/", async (req, res) => {
  // 📦 Accepts QUERY interviewId, userId and messageId
  await updateSummary(req, res);
});

export default router;
