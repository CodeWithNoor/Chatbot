"use client";
import React, { useState } from "react";
import NewChat from "./NewChat";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../Firebase";
// import { collection } from "firebase/firestore";
import ChatRow from "./ChatRow";
import { BiDotsHorizontal } from "react-icons/bi";
import { VscSignOut } from "react-icons/vsc";
import { MdDeleteSweep } from "react-icons/md";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-hot-toast";

const Sidebar = () => {
  const { data: session } = useSession();
  const [show, setShow] = useState(false);

  // message collection by timestamp, order, asc (oldest to newest) 
  //   const [chats, loading, error] = useCollection(
  //     session && query(collection(db, "users", session?.user?.email!, "chats"),
  //     orderBy("timestamp", "desc")
  //   )
  // )

  // all chats collection 
  const [chats, loading, error] = useCollection(
    session && collection(db, "users", session?.user?.email!, "chats")
  );

  // delete all conversation
  const deleteAllConversation = () => {
    chats?.docs.map((chat) => {
      deleteDoc(doc(db, "users", session?.user?.email!, "chats", chat.id))
    })
    toast.success("All conversation deleted successfully");
  };

  return (
    <>
      <div className="flex flex-col h-screen p-2 text-white">
        <div className="flex-1">
          {/* New Chat */}
          <NewChat />
          <div>{/* model selection */}</div>

          {/* map through there chat rows */}
          {chats?.docs.map((chat) => (
            <ChatRow key={chat.id} id={chat.id} />
          ))}
        </div>

        {/* user profile, signOut & clear conversation */}
        <div className="user_data border-t-[1px] border-white py-2">
          {session && <img src={session.user?.image!} alt="profile_pic" className="h-10 w-10 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 "/>}
          {session && <p>{session.user?.email!.slice(0, 20)}</p>}
          <BiDotsHorizontal id="profile"
            className="icon h-5 w-5 mx-auto cursor-pointer"
            onClick={() => setShow(!show)}/> 
          {show && (
            <div className=" bg-gradient-to-br from-[#001044] from-[20%] to-blue-500 w-[240px] h-30 rounded-md shadow-lg absolute top-[725px] left-2px p-3">
              <div
                className="logout items-start flex justify-start my-2 cursor-pointer"
                onClick={() => signOut()}>
                <VscSignOut className="w-6 h-6" />
                <p className="text-white text-center px-5">Logout</p>
              </div>
              <div
                className="logout items-start flex justify-start my-2 cursor-pointer"
                onClick={() => deleteAllConversation()}>
                <MdDeleteSweep className="w-6 h-6" />
                <p className="text-white text-center px-5">Clear Conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
