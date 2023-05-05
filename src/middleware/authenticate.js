import jwt from "jsonwebtoken";
import { missingAuth, missingBearer } from "../utils/defaultResponses.js";
import dotenv from "dotenv";
dotenv.config();

export default function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return missingAuth(res);
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return missingBearer(res);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    // req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: { message: "Invalid token" } });
  }
}
