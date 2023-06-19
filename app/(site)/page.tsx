"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCurrentUser } from "@/store/useCurrentUser";
import { useAuth } from "@/Context/AuthContext";
import Loading from "../(components)/loadingModal";
import { account, databases } from "@/libs/appwrite";
import { server } from "@/utils/utils";
import { ID } from "appwrite";
import Button from "../(components)/Button";
import { toast } from "react-hot-toast";

const Home = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  

  useEffect(() => {
    if (!user) {
      router.push("/enter");
    }
  }, [user, router]);

 
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={logout}>Logout</button>
          <div>
           {/* <button onClick={createTweet}>Create tweet</button> */}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Home;
