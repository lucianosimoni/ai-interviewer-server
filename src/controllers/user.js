const {
  missingBody,
  wrongPasswordOrEmail,
} = require("../utils/defaultResponses");
const { getUserByEmail, createUser } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return missingBody(res);
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return wrongPasswordOrEmail(res);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return wrongPasswordOrEmail(res);
  }

  delete user.passwordHash;
  const token = jwt.sign({ userEmail: user.email }, process.env.JWT_SECRET_KEY);
  const loggedInUser = {
    ...user,
    token,
  };
  return res.status(200).json({ loggedInUser: loggedInUser });
}

async function register(req, res) {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return missingBody(res);
  }

  const emailExists = await getUserByEmail(email);
  if (emailExists) {
    res.status(409).json({
      error: { message: "Account already exists" },
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    email: email,
    passwordHash: hashedPassword,
    firstName: firstName,
    lastName: lastName,
  });
  if (!user) {
    res.status(500).json({ error: { message: "An error occurred." } });
    return;
  }

  const token = jwt.sign({ userEmail: user.email }, process.env.JWT_SECRET_KEY);
  res.status(201).json({
    createdUser: {
      ...user,
      token,
    },
  });
}

module.exports = {
  login,
  register,
};
