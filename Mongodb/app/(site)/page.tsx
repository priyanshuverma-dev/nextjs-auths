"use client";
import Button from "@/components/Button";
import LoadingModal from "@/components/LoadingModal";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);

  if (status === "loading") {
    return <LoadingModal />;
  }

  if (status === "unauthenticated") {
    redirect("/auth");
  }

  return <div></div>;
}
