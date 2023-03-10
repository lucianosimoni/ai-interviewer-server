const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

async function getInterviewsByUser(req, res) {
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

module.exports = {
  getInterviewById,
  getAllInterviews,
  getInterviewsByUser,
};
