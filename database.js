const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createNewUser(req, res) {
  const { email, passwordHash, firstName, lastName } = req.body;

  const newUser = await prisma.user.create({
    data: {
      email: email,
      passwordHash: passwordHash,
      Profile: {
        create: {
          firstName: firstName,
          lastName: lastName,
        },
      },
    },
  });

  res.status(201).json({ user: newUser });
}

module.exports = { createNewUser };
