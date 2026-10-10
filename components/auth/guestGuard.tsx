"use client";

import { useGetMe } from "@/hooks";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import AuthLoader from "./auth-loader";
import { getDashboard } from "@/lib/route";

export const GuestGuard = ({ children }: { children: ReactNode }) => {
  const { data, isPending } = useGetMe();
  const router = useRouter();
  const user = data?.data;

  useEffect(() => {
    if (user) router.replace(getDashboard(user.role));
  }, [user, router]);

  if (isPending || user) return <AuthLoader />;

  return <>{children}</>;
};
