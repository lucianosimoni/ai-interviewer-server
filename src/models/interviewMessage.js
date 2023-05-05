import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createMessage({ userId, interviewId, message, author }) {
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

export async function getAllInterviewMessages({ interviewId }) {
  return await prisma.interviewMessage.findMany({
    where: {
      interviewId: interviewId,
    },
  });
}

export async function getMessageById(messageId) {
  return await prisma.interviewMessage.findUnique({
    where: {
      id: messageId,
    },
  });
}

export async function updateMessageSummaryId({ messageId, summaryId }) {
  return await prisma.interviewMessage.update({
    where: {
      id: messageId,
    },
    data: {
      summaryId: summaryId,
    },
  });
}
