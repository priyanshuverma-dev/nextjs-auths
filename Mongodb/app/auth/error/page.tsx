import { useParams } from "next/navigation";
import React from "react";

const Error = () => {
  const { params } = useParams();
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <p className="text-center text-gray-950">Error Occured</p>
      <p>{params}</p>
    </div>
  );
};

export default Error;
