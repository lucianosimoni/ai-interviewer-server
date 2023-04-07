const express = require("express");
const {
  create,
  getAll,
  updateSummary,
} = require("../controllers/interviewMessage.js");
const router = express.Router();
// 🟢 url is: /message"

router.post("/", async (req, res) => {
  create(req, res);
});

router.get("/", async (req, res) => {
  // 📦 Accepts QUERY interviewId and userId
  getAll(req, res);
});

router.patch("/", async (req, res) => {
  // 📦 Accepts QUERY interviewId, userId and messageId
  updateSummary(req, res);
});

module.exports = router;
