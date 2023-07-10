import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsChatRightText, BsTrash } from "react-icons/bs";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from "firebase/firestore";
import toast from "react-hot-toast";

type Props = {
  id: string;
};

const ChatRow = ({ id }: Props) => {
  const path_name = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  // messages collection
  const [messages] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );

  // message not be sorted or show in order
  // const [messages] = useCollection(
  //   session && query(collection(db, "users", session?.user?.email!, "chats", id, "messages"),
  //   orderBy("timeStamp", "asc")
  //   )
  // )

  useEffect(() => {
    if (!path_name) return;
    setActive(path_name.includes(id));
  }, [path_name]);

  // delete conversation at one time
  const deleteConversation = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    router.replace("/");
    toast.success("conversation deleted successfully");
  };

  return (
    <>
      <Link href={`chat/${id}/`} className={`chatRow justify-center my-2 ${active && "bg-gray-700/50"}`}>
        <BsChatRightText className="h-5 w-5 text-gray-300" />
        <p className="flex-1 hidden md:inline-flex truncate">
          {messages?.docs[messages?.docs?.length - 1]?.data().text.slice(0, 24) || "New Chat"}
        </p>
        <BsTrash className="h-5 w-5 text-gray-700 hover:text-gray-500" onClick={deleteConversation}/>
      </Link>
    </>
  );
};

export default ChatRow;