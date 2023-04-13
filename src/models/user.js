const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
      return createdUser;
    });
}

async function getUserById(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getUserByEmail(userEmail) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        Profile: true,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
};
