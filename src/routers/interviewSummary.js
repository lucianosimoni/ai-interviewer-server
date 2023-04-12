const express = require("express");
const { create, getById } = require("../controllers/interviewSummary");
const router = express.Router();

router.post("/", async (req, res) => {
  await create(req, res);
});

router.get("/:summaryId", async (req, res) => {
  await getById(req, res);
});

module.exports = router;
