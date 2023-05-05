import express from "express";
import { login, register } from "../controllers/user.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  await login(req, res);
});

router.post("/register", async (req, res) => {
  await register(req, res);
});

export default router;
