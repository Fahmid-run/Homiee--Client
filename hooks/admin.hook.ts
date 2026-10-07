import { getStats } from "@/features/auth/api/admin.api";
import { useQuery } from "@tanstack/react-query";

export function useGetStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getStats,
  });
}
