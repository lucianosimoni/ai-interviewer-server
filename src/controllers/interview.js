const {
  createInterview,
  getInterviewById,
  getInterviewsByUser,
  getAllInterviews,
} = require("../models/interview");
const { getUserById } = require("../models/user");
const { missingBody, missingParams } = require("../utils/defaultResponses.js");

async function create(req, res) {
  const { userId, maxRound, level } = req.body;
  if (!userId || !maxRound || !level) {
    return missingBody(res);
  }

  const returnedUser = await getUserById(Number(userId));
  if (!returnedUser) {
    return res
      .status(400)
      .json({ error: { message: `User id ${userId} does not exist.` } });
  }

  const data = {
    userId: Number(userId),
    maxRound: Number(maxRound),
    level,
  };
  const createdInterview = await createInterview(data);
  if (!createInterview) {
    return res
      .status(401)
      .json({ error: { message: "Unable to create interview." } });
  }

  return res.status(201).json({ createdInterview: createdInterview });
}

async function getAll(req, res) {
  const interviews = await getAllInterviews();
  return res.status(200).json({
    interviews: interviews,
  });
}

async function getByUser(req, res) {
  const { userId } = req.params;
  if (!userId) {
    return missingParams(res);
  }

  const returnedUser = await getUserById(Number(userId));
  if (!returnedUser) {
    return res
      .status(400)
      .json({ error: { message: `User id ${userId} does not exist.` } });
  }

  const userInterviews = await getInterviewsByUser(Number(userId));
  if (!userInterviews) {
    return res
      .status(401)
      .json({ error: { message: "Unable to get user interviews." } });
  }

  return res.status(200).json({ userInterviews: userInterviews });
}

async function getById(req, res) {
  const { interviewId } = req.params;
  if (!interviewId) {
    return missingParams(res);
  }

  const returnedInterview = await getInterviewById(interviewId);
  if (!returnedInterview) {
    return res.status(404).json({
      error: { message: `Interview with ID ${interviewId} does not exist` },
    });
  }

  return res.status(200).json({
    interview: returnedInterview,
  });
}

module.exports = {
  create,
  getAll,
  getByUser,
  getById,
};
