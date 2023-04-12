const express = require("express");
const {
  create,
  getAll,
  updateSummary,
} = require("../controllers/interviewMessage.js");
const router = express.Router();
// 🟢 url is: /message"

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

module.exports = router;
