const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getUserById(userId) {
  userId = Number(userId);
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

async function getUserByEmail(userEmail) {
  return await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
}

async function getAllUsers() {
  return await prisma.user.findMany();
}

async function createUser(userData) {
  return await prisma.user
    .create({
      data: {
        email: userData.email,
        passwordHash: userData.passwordHash,
        Profile: {
          create: {
            firstName: userData.firstName,
            lastName: userData.lastName,
          },
        },
      },
      include: {
        Profile: true,
      },
    })
    .then((createdUser) => {
      delete createdUser.passwordHash;
      console.log("CREATED");
      return createdUser;
    });
}

module.exports = {
  getUserById,
  getUserByEmail,
  getAllUsers,
  createUser,
};
