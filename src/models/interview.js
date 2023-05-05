import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createInterview({ userId, maxRound, level }) {
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

export async function getInterviewById(interviewId) {
  return await prisma.interview.findUnique({
    where: {
      id: Number(interviewId),
    },
  });
}

export async function getAllInterviews() {
  return await prisma.interview.findMany();
}

export async function getInterviewsByUser(userId) {
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
