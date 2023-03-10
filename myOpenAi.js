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
    res
      .status(404)
      .json({ error: { message: "OpenAI API key not configured." } });
    return;
  }

  const message = req.body.message;
  if (message.trim().length === 0) {
    res.status(400).json({ error: { message: "Message is empty." } });
    return;
  }

  try {
    const completion = await ai.createCompletion({
      model: process.env.FINE_TUNNED_MODEL,
      prompt: generatePrompt(message),
      temperature: 0.8,
      max_tokens: 80,
      frequency_penalty: 1,
      presence_penalty: 1,
      stop: ["\n"],
    });

    handleResponse(completion.data.choices[0].text, res);
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
  const formattedMessage = message.trim() + "->";
  return formattedMessage;
}

function handleResponse(aiResponse, res) {
  // 🔴 Response is to End interview.
  if (aiResponse.endsWith("<end-interview>")) {
    // Removes tag from end of response.
    aiResponse = aiResponse.slice(0, -15);

    res.status(200).json({
      result: aiResponse,
      status: "over",
    });
    return;
  }

  // 🟢 Response is Ok
  res.status(200).json({ result: aiResponse, status: "ok" });
}

module.exports = { generateResponse, generatePrompt };
