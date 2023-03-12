require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(configuration);

async function generateResponse(req, res) {
  const { message } = req.body;

  if (!configuration.apiKey) {
    res
      .status(500)
      .json({ error: { message: "OpenAI API key not configured." } });
    return;
  }

  if (!message || message.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Message is empty. OpenAI can't process an Empty message",
      },
    });
    return;
  }

  await openAi
    .createCompletion({
      model: process.env.FINE_TUNNED_MODEL,
      prompt: createPrompt(message),
      temperature: 0.8,
      max_tokens: 80,
      frequency_penalty: 1,
      presence_penalty: 1,
      stop: ["\n"],
    })
    .then((response) => {
      const message = response.data.choices[0].text;

      if (message.endsWith("<end-interview>")) {
        message = message.slice(0, -15);
        res.status(200).json({
          result: message,
          interviewOver: true,
        });
        return;
      }

      res.status(200).json({ result: message, interviewOver: false });
    })
    .catch((error) => {
      if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
          error: {
            message: "An error occurred during your OpenAI request.",
          },
        });
      }
    });
}

function createPrompt(message) {
  return message.trim() + "->";
}

module.exports = {
  generateResponse,
};
