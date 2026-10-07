"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoader from "./auth-loader";
import { UserRole } from "@/types";
import AccessDenied from "./access-denied";

interface IProps {
  children: ReactNode;
  roles: UserRole[];
}

export const RoleGuard = ({ children, roles }: IProps) => {
  const { data, isPending, isError } = useGetMe();

  const router = useRouter();
  const user = data?.data;

  const isAuthorized = !!user && roles.includes(user.role);
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

  if (!user) {
    return null;
  }

  if (isAuthorized) {
    return <div>{children}</div>;
  }

  return <AccessDenied></AccessDenied>;
};
