const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createNewUser(req, res) {
  const { email, passwordHash, firstName, lastName } = req.body;

  await prisma.user
    .create({
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
      include: {
        Profile: true,
      },
    })
    .then((createdUser) => {
      delete createdUser.passwordHash;
      res.status(201).json({ user: createdUser });
    })
    .catch((error) => {
      // Email not unique
      if (error.code === "P2002") {
        res
          .status(409)
          .json({ error: { message: "E-mail already in use.", code: 001 } });
      } else {
        res.status(error.status).json({ error: { message: error.message } });
      }
      return;
    });
}

module.exports = { createNewUser };
