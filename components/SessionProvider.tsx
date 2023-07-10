"use client";

import React from "react";
import { SessionProvider as Provider } from "next-auth/react";
import { Session } from "next-auth";
// import { firebaseApp } from "./Firebase";

type Props = {
  children: React.ReactNode;
  session: Session | null;
};

const NextAuthProvider = ({ children, session }: Props) => {
  // firebaseApp;
  return <Provider>{children}</Provider>;
};

export default NextAuthProvider;
