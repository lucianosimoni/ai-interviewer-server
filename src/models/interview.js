const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createInterview({ userId, maxRound, level }) {
  return await prisma.interview.create({
    data: {
      maxRound: maxRound,
      level: level,
      user: {
        connect: {
          id: userId,
        },
      },
      interviewStats: {
        create: {},
      },
    },
    include: {
      interviewStats: true,
    },
  });
}

async function getInterviewById(interviewId) {
  return await prisma.interview.findUnique({
    where: {
      id: Number(interviewId),
    },
  });
}

async function getAllInterviews() {
  return await prisma.interview.findMany();
}

async function getInterviewsByUser(userId) {
  return await prisma.interview.findMany({
    where: {
      user: {
        id: userId,
      },
    },
    include: {
      interviewStats: true,
    },
  });
}

module.exports = {
  createInterview,
  getInterviewById,
  getAllInterviews,
  getInterviewsByUser,
};
