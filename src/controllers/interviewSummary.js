import { getInterviewById } from "../models/interview.js";
import {
  getMessageById,
  updateMessageSummaryId,
} from "../models/interviewMessage.js";
import { getUserById } from "../models/user.js";
import { missingBody } from "../utils/defaultResponses.js";
import { createSummary, getSummaryById } from "../models/interviewSummary.js";

export async function create(req, res) {
  const { userId, interviewId, summary, messagesId } = req.body;
  if (!userId || !interviewId || !summary || !messagesId) {
    return missingBody(res);
  }

  const returnedUser = await getUserById(Number(userId));
  if (!returnedUser) {
    return res
      .status(400)
      .json({ error: { message: `User id ${userId} does not exist.` } });
  }
  const returnedInterview = await getInterviewById(Number(interviewId));
  if (!returnedInterview) {
    return res.status(400).json({
      error: { message: `Interview id ${interviewId} does not exist.` },
    });
  }

  const data = {
    //userId: Number(userId), // FIXME: Not in use by the model
    interviewId: Number(interviewId),
    summary,
    //messagesId, // FIXME: Not in use by the model
  };
  const createdSummary = await createSummary(data);
  if (!createdSummary) {
    return res
      .status(401)
      .json({ error: { message: "Unable to create summary." } });
  }

  // Update messages to the new SummaryId
  for (const messageId of messagesId) {
    const returnedMessage = await getMessageById(messageId);
    if (!returnedMessage) {
      continue;
    }

    const data = {
      messageId: Number(messageId),
      summaryId: Number(createdSummary.id),
    };
    await updateMessageSummaryId(data);
  }

  return res.status(201).json({ createdSummary: createdSummary });
}

export async function getById(req, res) {
  const { summaryId } = req.params;
  if (!summaryId) {
    return missingBody(res);
  }

  const returnedSummary = await getSummaryById(Number(summaryId));
  if (!returnedSummary) {
    return res
      .status(400)
      .json({ error: { message: `Summary id ${summaryId} does not exist.` } });
  }

  return res.status(200).json({ interviewSummary: returnedSummary });
}
