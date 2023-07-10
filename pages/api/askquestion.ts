import type { NextApiRequest, NextApiResponse } from "next";
import query from "../../lib/chatbot";
import { adminDb } from "../../FirebaseAdminAccount";
import admin from "firebase-admin";

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  // get the prompt, chatId and model from the request body (sent from the client side)
  const { prompt, chatId, model, session } = req.body;

  if (!prompt) {
    res.status(400).json({ answer: "please provide a prompt" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "please provide a valid chat id" });
    return;
  }

  // CHATBOT QUERY  
  const response = await query(prompt, chatId, model);

  // return the response to the client side!
  const message: Message = {
    text: response || "Chatbot was enable to find a response to your question",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "chatbot",
      name: "chatbot",
      avatar: "https://e7.pngegg.com/pngimages/1001/63/png-clipart-internet-bot-computer-icons-chatbot-sticker-electronics-face.png",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ answer: message.text })
  // console.log(message.text)
}