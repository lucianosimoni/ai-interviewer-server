const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getSummaryById(summaryId) {
  return await prisma.interviewSummary.findUnique({
    where: {
      id: summaryId,
    },
  });
}

module.exports = {
  getSummaryById,
};
