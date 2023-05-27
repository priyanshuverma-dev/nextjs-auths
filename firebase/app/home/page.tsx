"use client";
import React, { Suspense } from "react";
import { useAuthContext } from "../auth/authContext";
import { redirect, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return (
    <div className="">
      <h1>Only logged in users can view this page</h1>

      <p>{user?.email}</p>
      <button
        type="button"
        onClick={() => {
          signOut(auth);
          router.refresh();
          // redirect("/");
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default Page;
