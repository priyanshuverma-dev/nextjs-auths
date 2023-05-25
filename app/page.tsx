"use client";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import signUp from "./auth/login";
import { getAuth } from "firebase/auth";
import { app, db } from "./firebase/config";
import getDoument from "./firebase/getData";
import { Firestore, doc, getDoc, getFirestore } from "firebase/firestore";
import React from "react";
import { useAuthContext } from "./auth/authContext";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();
  React.useEffect(() => {
    if (user) redirect("/home");
  }, [user]);

  const handleLogin = async () => {
    const { result, error } = await signUp();
    if (error) {
      return console.log(error);
    }

    return router.push("/home");
  };

  return (
    <div className="flex items-center justify-center flex-col m-28 p-24 gap-4">
      <h1 className="text-center font-bold text-3xl text-neutral-800">
        Welcome back
      </h1>
      <button
        onClick={handleLogin}
        className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
      >
        <Image
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
          width={24}
          height={24}
        />
        <span>Login with Google</span>
      </button>
      <button
        onClick={async () => {
          const auth = getAuth(app);

          let docRef = doc(db, "users", auth.currentUser!.uid);

          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }

          console.log(auth.currentUser!.uid);
        }}
        className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
      >
        <span>Test</span>
      </button>
    </div>
  );
}
