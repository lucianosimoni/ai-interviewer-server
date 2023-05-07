import fs from "graceful-fs";
import dotenv from "dotenv";
dotenv.config();

import OpenAIUtils from "../utils/OpenAI.js";

export async function generateResponse(req, res) {
  const { message } = req.body;

  if (!message || message.trim().length === 0) {
    return res.status(400).json({
      error: {
        message: "Message is empty. OpenAI can't process an Empty message",
      },
    });
  }

  try {
    console.log(
      "🧠 Message received at the backend. Getting the res in the OpenAIUtils..."
    );
    const response = await OpenAIUtils.getCompletion(message);
    console.log("🧠🧠 Response is: ", response);
    // 💥🧠 End of Interviewer
    if (response.endsWith("<end-interview>")) {
      message = message.slice(0, -15);
      return res.status(200).json({
        result: message,
        interviewOver: true,
      });
    }
    // 🟢🧠 Interview ok
    res.status(200).json({ result: response, interviewOver: false });
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({
        error: {
          message:
            "An error occurred during your OpenAI Completion (Interviewer Response) request.",
          data: error,
        },
      });
    }
  }
}

export async function generateTextFromSpeech(req, res) {
  if (!req.file) {
    res.status(400).json({
      error: {
        message: "Request File is empty. Server can't process without data.",
      },
    });
    return;
  }

  const filename = req.file.filename;

  fs.renameSync(
    `./public/data/uploads/${filename}`,
    `./public/data/uploads/${filename}.mp3`
  );

  try {
    const response = await OpenAIUtils.getTranscription(filename);
    res.status(200).json({ transcription: response.data.text });
    fs.unlinkSync(`./public/data/uploads/${filename}.mp3`); // 💥Delete audio
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
      fs.unlinkSync(`./public/data/uploads/${filename}.mp3`); // 💥Delete audio
    } else {
      res.status(500).json({
        error: {
          message: "An error occurred during your OpenAI request.",
          data: error,
        },
      });
      fs.unlinkSync(`./public/data/uploads/${filename}.mp3`); // 💥Delete audio
    }
  }
}
