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

module.exports = {
  missingBody,
  missingQuery,
  missingParams,
};
