"use client";

import React, { useEffect } from "react";
import AuthForm from "../(components)/AuthForm";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import Loading from "../(components)/loadingModal";

const Enter = () => {
  const { user } = useAuth();
  React.useEffect(() => {
    if (user) redirect("/");
  }, [user]);

  return (
    <div
      className="
        flex 
        min-h-full 
        flex-col 
        justify-center 
        py-12 
        sm:px-6 
        lg:px-8 
        bg-gray-100
      "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          "
        >
          🖐 Hey, Check In First
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default Enter;
