"use client";

import { getDashboard } from "@/lib/route";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetMe } from "./auth.hook";

export const useAfterAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  return async () => {
    const res = await queryClient.fetchQuery({
      queryKey: ["User-Token"],
      queryFn: useGetMe,
      staleTime: 0,
    });

    const next = searchParams.get("next");
    const safeNext =
      next?.startsWith("/") && !next.startsWith("//") ? next : null;

    router.replace(safeNext ?? getDashboard(res.data.role));
  };
};
