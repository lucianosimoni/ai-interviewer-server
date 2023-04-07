const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createMessage({ userId, interviewId, message, author }) {
  return await prisma.interviewMessage.create({
    data: {
      message: message,
      author: author,
      interview: {
        connect: {
          id: interviewId,
        },
      },
    },
  });
}

async function getAllInterviewMessages({ interviewId }) {
  return await prisma.interviewMessage.findMany({
    where: {
      interviewId: interviewId,
    },
  });
}

async function getMessageById(messageId) {
  return await prisma.interviewMessage.findUnique({
    where: {
      id: messageId,
    },
  });
}

async function updateMessageSummaryId({ messageId, summaryId }) {
  return await prisma.interviewMessage.update({
    where: {
      id: messageId,
    },
    data: {
      summaryId: summaryId,
    },
  });
}

module.exports = {
  createMessage,
  getAllInterviewMessages,
  getMessageById,
  updateMessageSummaryId,
};
