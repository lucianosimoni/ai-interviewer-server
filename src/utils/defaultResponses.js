function missingBody(res) {
  return res.status(400).json({
    error: { message: "Request body is missing arguments." },
  });
}

function missingQuery(res) {
  return res.status(400).json({
    error: { message: "URL queries are missing arguments." },
  });
}

function missingParams(res) {
  return res.status(400).json({
    error: { message: "URL params are missing arguments." },
  });
}

function wrongPasswordOrEmail(res) {
  return res.status(400).json({
    error: { message: "Email or Password is wrong." },
  });
}

function missingAuth(res) {
  return res.status(401).json({
    error: { message: "Authorization header missing" },
  });
}

function missingBearer(res) {
  return res.status(401).json({
    error: { message: "Bearer token missing" },
  });
}

module.exports = {
  missingBody,
  missingQuery,
  missingParams,
  wrongPasswordOrEmail,
  missingAuth,
  missingBearer,
};
