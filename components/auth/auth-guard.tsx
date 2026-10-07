"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import authLoader from "./auth-loader";
import AuthLoader from "./auth-loader";

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { data, isPending, isError } = useGetMe();

  const router = useRouter();
  const user = data?.data;
  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      router.replace("/auth");
    }
  }, [isError, isPending, user]);

  if (isPending) {
    return <AuthLoader />;
  }

  return <div>{children}</div>;
};
