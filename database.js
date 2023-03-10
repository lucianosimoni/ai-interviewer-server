const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createNewUser(req, res) {
  const { email, passwordHash, firstName, lastName } = req.body;

  // Check for Missing fields
  if (!email || !passwordHash || !firstName || !lastName) {
    res.status(400).json({
      error: { message: "Request body is missing arguments", code: 2 },
    });
    return;
  }

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
          .json({ error: { message: "E-mail already in use.", code: 1 } });
      } else {
        res.status(500).json({ error: { message: error.message } });
      }
      return;
    });
}

async function getAllUserInterviews(req, res) {
  const { userId } = req.params;

  await prisma.interview
    .findMany({
      where: {
        userId: {
          equals: Number(userId),
        },
      },
      include: {
        interviewStats: true,
      },
    })
    .then((interviews) => {
      res.status(200).json({ interviews: interviews });
    })
    .catch((error) => {
      res.status(500).json({ error: { message: error.message } });
    });
}

async function createNewInterview(req, res) {
  const { userId } = req.params;
  const { maxRound, level } = req.body;

  if (!userId || !maxRound || !level) {
    res.status(400).json({
      error: { message: "Request body is missing arguments", code: 2 },
    });
    return;
  }

  await prisma.interview
    .create({
      data: {
        maxRound: maxRound,
        level: level,
        user: {
          connect: {
            id: Number(userId),
          },
        },
        interviewStats: {
          create: {},
        },
      },
      include: {
        interviewStats: true,
      },
    })
    .then((createdInterview) => {
      res.status(201).json({ interview: createdInterview });
    })
    .catch((error) => {
      res.status(500).json({ error: { message: error.message } });
    });
}

module.exports = { createNewUser, createNewInterview, getAllUserInterviews };
