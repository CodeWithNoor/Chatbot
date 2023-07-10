"use client";

import React, { useState, FormEvent } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { useSession } from "next-auth/react";
import { addDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { collection } from "firebase/firestore";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
  chatId: string;
};

const ChatInput = ({ chatId }: Props) => {
  const model = "text-davinci-003"; // APENAI MODEL
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState(""); // PROMPT: is the user input text

  // e: FormEvent<HTMLFormElement> is the type of event
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(db, "users", session?.user?.email!, "chats", chatId, "messages"),
      message
    );

    // notification for loading...
    const notification = toast.loading("thinking...!");
    console.log(notification);

    // api fetch for response...
    await fetch("/api/askquestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // error handling...
      // notification for success...
      toast.success("responding...!", {
        id: notification,
      });
    });
  };

  return (
    <>
      <div className="bg-[#3b82f638] text-gray-200 rounded-sm text-[17px] w-[90%] my-[1.75rem]">
        <form onSubmit={handleSubmit} className="px-5 py-4 space-x-5 flex">
          <input
            className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled: text-gray-300"
            disabled={!session}
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            name="message"
            id="message"
            autoComplete="off"
            placeholder="Type your message..."/>

          <button
            type="submit"
            disabled={!prompt || !session} // if prompt is empty or session is not available so button will be disabled
            className="p-1 rounded disabled: cursor-not-allowed disabled:bg-[#0b1347]">
            <RiSendPlaneFill className="text-gray-300 h-6 w-6 transition ease-in-out delay-150 hover:-translate-x-1 hover:scale-110 duration-300" />
          </button>
        </form>
        <div>{/* model selection */}</div>
      </div>
    </>
  );
};

export default ChatInput;
