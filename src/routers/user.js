const express = require("express");
const { login, register } = require("../controllers/user");
const router = express.Router();

router.post("/login", async (req, res) => {
  await login(req, res);
});

router.post("/register", async (req, res) => {
  await register(req, res);
});

module.exports = router;
