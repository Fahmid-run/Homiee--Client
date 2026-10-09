"use client";

import AuthLoader from "@/components/auth/auth-loader";
import VisitRequests from "@/components/shared/view";
import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ViewRequest = () => {
  const { data, isError, isPending } = useGetMe();

  const user = data?.data;

  const router = useRouter();

  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      router.replace("/auth");
    }
  }, [isError, isPending, user]);

  if (isPending) {
    return <AuthLoader></AuthLoader>;
  }

  return (
    <div>
      <VisitRequests role={user.role}></VisitRequests>
    </div>
  );
};

export default ViewRequest;
