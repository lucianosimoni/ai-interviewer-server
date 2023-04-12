const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createSummary({ summary, interviewId }) {
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

async function getSummaryById(summaryId) {
  return await prisma.interviewSummary.findUnique({
    where: {
      id: summaryId,
    },
    include: {
      InterviewMessage: true,
    },
  });
}

module.exports = {
  createSummary,
  getSummaryById,
};
