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
  const [input, setinput] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/enter");
    }
  }, [user, router]);

  const fetch = async () => {
    const res = await databases.listDocuments(
      server.databaseID,
      server.tweetsCollection
    );
    console.log(res);
  };

  const createTweet = async () => {
    if (input === null) return;
    try {
      const res = await databases.createDocument(
        server.databaseID,
        server.tweetsCollection,
        ID.unique(),
        {
          text: input,
          users: [`${user?.$id}`],
        }
      );
      console.log(res);
      toast.success(`Success to create`);
      fetch();
    } catch (err: any) {
      toast.error(`${err.message}`);
      console.log(err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <div>
          <p>Welcome, {user.name}</p>
          <button onClick={logout}>Logout</button>
          <div>
            <input
              className="border border-cyan-800 rounded"
              type="text"
              name="text"
              id="text"
              onChange={(e) => {
                e.preventDefault();
                setinput(e.target.value);
                console.log(input);
              }}
            />
            <Button onClick={createTweet}>Create tweete</Button>
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
