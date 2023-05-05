import {
  createMessage,
  getAllInterviewMessages,
  getMessageById,
  updateMessageSummaryId,
} from "../models/interviewMessage.js";
import { getInterviewById } from "../models/interview.js";
import { getSummaryById } from "../models/interviewSummary.js";
import { missingBody, missingQuery } from "../utils/defaultResponses.js";

export async function create(req, res) {
  const { message, author, userId, interviewId } = req.body;
  if (!message || !author || !userId || !interviewId) {
    return missingBody(res);
  }

  const returnedInterview = await getInterviewById(Number(interviewId));
  if (!returnedInterview) {
    return res.status(400).json({
      error: { message: `Interview id ${interviewId} does not exist.` },
    });
  }

  const data = {
    userId: Number(userId), // FIXME: not being used by model. Check if it is necessary
    interviewId: Number(interviewId),
    message,
    author,
  };
  const createdMessage = await createMessage(data);
  if (!createdMessage) {
    return res
      .status(401)
      .json({ error: { message: "Unable to create message." } });
  }

  return res.status(201).json({
    createdMessage: createdMessage,
  });
}

export async function getAll(req, res) {
  const { userId, interviewId } = req.query;
  if (!userId || !interviewId) {
    return missingQuery(res);
  }

  const data = { interviewId: Number(interviewId) };
  const allMessages = await getAllInterviewMessages(data);
  if (!allMessages) {
    return res
      .status(401)
      .json({ error: { message: "Unable to get all messages." } });
  }

  return res.status(200).json({ allMessages: allMessages });
}

export async function updateSummary(req, res) {
  const { userId, interviewId, messageId } = req.query;
  const { summaryId } = req.body;

  if (!userId || !interviewId || !messageId) {
    return missingQuery(res);
  }
  if (!summaryId) {
    return missingBody(res);
  }

  const returnedInterview = await getInterviewById(Number(interviewId));
  if (!returnedInterview) {
    return res.status(400).json({
      error: { message: `Interview id ${interviewId} does not exist.` },
    });
  }
  const returnedMessage = await getMessageById(Number(messageId));
  if (!returnedMessage) {
    return res.status(400).json({
      error: { message: `Message id ${messageId} does not exist.` },
    });
  }
  const returnedSummary = await getSummaryById(Number(summaryId));
  if (!returnedSummary) {
    return res.status(400).json({
      error: { message: `Summary id ${summaryId} does not exist.` },
    });
  }

  const data = {
    userId: Number(userId), // FIXME: Not being used by the Model
    interviewId: Number(interviewId), // FIXME: Not being used by the Model
    messageId: Number(messageId),
    summaryId: Number(summaryId),
  };
  const updatedMessage = await updateMessageSummaryId(data);
  if (!updatedMessage) {
    return res
      .status(401)
      .json({ error: { message: "Unable to update message." } });
  }

  return res.status(201).json({ updateMessage: updatedMessage });
}
