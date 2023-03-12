const express = require("express");
const { create, getAll, getById } = require("../controllers/user");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  await getById(req, res);
});

router.get("/", async (req, res) => {
  await getAll(req, res);
});

router.post("/", async (req, res) => {
  await create(req, res);
});

module.exports = router;
