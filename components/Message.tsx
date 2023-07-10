import React from "react";
import { DocumentData } from "firebase/firestore";

type Props = {
  message: DocumentData;
};
const Message = ({ message }: Props) => {
  const isChatBot = message.user.name === "chatbot";
  return (
    <div className={`p-5 text-white items-center rounded-sm ${isChatBot && "bg-[#3b82f638]"}`}>
      <div className="flex space-x-5 px-10 max-w-6xl mx-auto">
        <img src={message.user.avatar} alt="" className="h-8 w-8 rounded-full"/>
        <p className="text-base font-sans">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
