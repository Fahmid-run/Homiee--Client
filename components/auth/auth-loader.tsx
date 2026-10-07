"use client";

import { Loader, Loader2, Loader2Icon, LoaderIcon } from "lucide-react";
import React from "react";

const AuthLoader = ({ label = "Loading" }: { label?: string }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader2Icon className="size-6 animate-spin"></Loader2Icon>
      {label}
    </div>
  );
};

export default AuthLoader;
