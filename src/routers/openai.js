const express = require("express");
const { generateResponse } = require("../services/openai");
const router = express.Router();

router.post("/", async (req, res) => {
  await generateResponse(req, res);
});

module.exports = router;
