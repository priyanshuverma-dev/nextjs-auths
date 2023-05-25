import React, { Suspense } from "react";
import Loading from "./loading";
import Page from "./page";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </>
  );
}
