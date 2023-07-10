"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../Firebase";
import { orderBy, query } from "firebase/firestore";
import Message from "./Message";
// import logo from "../image/pngwing.com.png";

type Props = {
  chatId: string;
};

const Chat = ({ chatId }: Props) => {
  const { data: session } = useSession();

  const [messages] = useCollection(session && query (collection(
    db, "users", session?.user?.email!, "chats", chatId, "messages"),
    orderBy("createdAt", "asc")))

  return (
    <>
      {/* chats */}
      <div className="mt-2 chats text-gray-200 text-[17px] flex-1 w-[90%] overflow-y-auto overflow-x-hidden">
        {messages?.docs.map((message) => (
          <Message key={message.id} message={message.data()}/>
        ))}
      </div>
    </>
  );
};

export default Chat;
