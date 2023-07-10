import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};
const page = ({params :{ id }}: Props) => {
  // console.log(id);
  return (
    <>
      <div className="chatting mt-[2.5rem] mb-10 mx-20 md:h-[91vh] flex flex-col items-center overflow-hidden">
        <Chat chatId = {id}/>
        <ChatInput chatId = {id}/>
      </div>
    </>
  );
};

export default page;
