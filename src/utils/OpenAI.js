import { Configuration, OpenAIApi } from "openai";
import fs from "graceful-fs";
import dotenv from "dotenv";
dotenv.config();

export default class OpenAIUtils {
  static configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  static openAi = new OpenAIApi(this.configuration);

  static async getCompletion(message) {
    try {
      const response = await this.openAi.createCompletion({
        model: process.env.FINE_TUNNED_MODEL,
        prompt: message,
        temperature: 0.8,
        max_tokens: 80,
        frequency_penalty: 1,
        presence_penalty: 1,
        stop: ["\n"],
      });
      console.log(
        "⚙️ Res returned from OpenAI official api. its data.choices[0].text is: ",
        response.data.choices[0].text
      );
      return response.data.choices[0].text;
    } catch (error) {
      console.error("⚠️ An Error happened while getting Completion: ", error);
      throw error;
    }
  }

  static async getTranscription(filename) {
    try {
      const response = await this.openAi.createTranscription(
        fs.createReadStream(`./public/data/uploads/${filename}.mp3`),
        process.env.WHISPER_MODEL
      );
      return response;
    } catch (error) {
      console.error(
        "⚠️ An Error happened while getting Transcription: ",
        error
      );
      throw error;
    }
  }
}
