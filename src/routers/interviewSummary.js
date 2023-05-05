import express from "express";
import { create, getById } from "../controllers/interviewSummary.js";

const router = express.Router();

router.post("/", async (req, res) => {
  await create(req, res);
});

router.get("/:summaryId", async (req, res) => {
  await getById(req, res);
});

export default router;
