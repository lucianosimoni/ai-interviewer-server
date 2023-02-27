require("dotenv").config();
const openai = require("openai");
const { Configuration, OpenAIApi } = openai;

const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: apiKey,
});
const ai = new OpenAIApi(configuration);

async function generateResponse(req, res) {
  if (!configuration.apiKey) {
    res.status(404).json({ error: "OpenAI API key not configured." });
    return;
  }

  const message = req.body.message;
  if (message.trim().length === 0) {
    res.status(404).json({ error: "Message is empty." });
    return;
  }

  try {
    const completion = await ai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(message),
      temperature: 0.6,
      frequency_penalty: 1,
      presence_penalty: 1,
      stop: ["\n"],
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(message) {
  const capitalizedMessage =
    message[0].toUpperCase() + message.slice(1).toLowerCase();

  // FIXME: Remove this! Model will be trained so this is not required
  return capitalizedMessage;
}

module.exports = { generateResponse, generatePrompt };
