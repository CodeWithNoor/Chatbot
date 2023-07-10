"use client";

import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "../image/pngwing.com.png";

// import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
// const googleProvider = new GoogleAuthProvider();

const Login = () => {
  // const {data: session} = useSession(); 
  // const auth = getAuth(); 
  // const signInWithGoogle = () => {
  //   signInWithRedirect(auth, googleProvider);
  // };

  return (
    <>
      <div className="bg-[url('../image/background-vector.jpg')] bg-no-repeat bg-cover items-center justify-center h-screen flex flex-col">
        <Image src={logo} height={200} width={200} alt="logo" />
        <button
          className="bg-[#3b82f638] rounded my-3 p-3 text-white text-base font-light font-mono pointer transition ease-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#3b83f6a6] hover:text-white duration-1000"
          onClick={() => signIn("google")}>
          SignIn with Google
        </button>
      </div>
    </>
  );
};

export default Login;