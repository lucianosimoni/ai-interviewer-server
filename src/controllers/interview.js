const { getInterviewById, getAllInterviews } = require("../models/interview");

async function create(req, res) {
  const { email, passwordHash, firstName, lastName } = req.body;
  if (!email || !passwordHash || !firstName || !lastName) {
    res.status(400).json({
      error: { message: "Request body is missing arguments", code: 2 },
    });
    return;
  }

  const userEmailExists = await getUserByEmail(email);
  if (userEmailExists) {
    res.status(409).json({
      error: { message: "Account already exists" },
    });
    return;
  }

  const userData = {
    email: email,
    passwordHash: passwordHash,
    firstName: firstName,
    lastName: lastName,
  };
  const user = await createUser(userData);
  if (!user) {
    res.status(500).json({ error: { message: "An error occurred." } });
    return;
  }

  return res.status(201).json({ user: user });
}

async function getAll(req, res) {
  const interviews = await getAllInterviews();
  return res.status(200).json({
    interviews: interviews,
  });
}

async function getById(req, res) {
  const { interviewId } = req.query;
  if (!interviewId) {
    return res
      .status(400)
      .json({ error: { message: "Missing query interviewId." } });
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
  getById,
  getAll,
  create,
};
