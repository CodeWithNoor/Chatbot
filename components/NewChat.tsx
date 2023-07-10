import React from "react";
import { HiPlus } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "../Firebase";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";

const NewChat = () => {
  const router = useRouter();
  const { data: session} = useSession();

  const createNewChat = async () => {
    const doc = await addDoc(collection(db, "users", session?.user?.email!, "chats"), {
      userId: session?.user?.email!,
      timeStamp: serverTimestamp()
    }); 
   router.push(`/chat/${doc.id}`) 
  };

  return (
    <>
      <div onClick={createNewChat} className="chatRow border-gray-700 border items-center justify-center">
          <HiPlus className="icon h-4 w-4" />
          <p className="text">New Chat</p>
      </div>
    </>
  );
};

export default NewChat;
