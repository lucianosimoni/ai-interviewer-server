import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createSummary({ summary, interviewId }) {
  return await prisma.interviewSummary.create({
    data: {
      summary: summary,
      interview: {
        connect: {
          id: interviewId,
        },
      },
    },
  });
}

export async function getSummaryById(summaryId) {
  return await prisma.interviewSummary.findUnique({
    where: {
      id: summaryId,
    },
    include: {
      InterviewMessage: true,
    },
  });
}
