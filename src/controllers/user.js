const {
  getUserById,
  getUserByEmail,
  getAllUsers,
  createUser,
} = require("../models/user");

async function getById(req, res) {
  const { userId } = req.params;
  const user = await getUserById(userId);

  if (!user) {
    res
      .status(404)
      .json({ error: { message: `User with ID ${userId} does not exist` } });
    return;
  }

  res.status(200).json({
    user: user,
  });
}

async function getAll(req, res) {
  const users = await getAllUsers();
  res.status(200).json({
    users: users,
  });
}

async function create(req, res) {
  const { email, passwordHash, firstName, lastName } = req.body;

  if (!email || !passwordHash || !firstName || !lastName) {
    res.status(400).json({
      error: { message: "Request body is missing arguments", code: 2 },
    });
    return;
  }

  const userEmailExists = await getUserByEmail(email);
  if (userEmailExists) {
    res.status(409).json({
      error: { message: "Account already exists" },
    });
    return;
  }

  const userData = {
    email: email,
    passwordHash: passwordHash,
    firstName: firstName,
    lastName: lastName,
  };

  const user = await createUser(userData);
  if (!user) {
    res.status(500).json({ error: { message: "An error occurred." } });
    return;
  }

  res.status(201).json({ user: user });
}

module.exports = {
  getById,
  getAll,
  create,
};
