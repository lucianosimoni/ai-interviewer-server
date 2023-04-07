const express = require("express");
const {
  create,
  getAll,
  getById,
  getByUser,
} = require("../controllers/interview");
const router = express.Router();

router.post("/", async (req, res) => {
  await create(req, res);
});

router.get("/", async (req, res) => {
  await getAll(req, res);
});

router.get("/:interviewId", async (req, res) => {
  await getById(req, res);
});

router.get("/user/:userId", async (req, res) => {
  await getByUser(req, res);
});

module.exports = router;
