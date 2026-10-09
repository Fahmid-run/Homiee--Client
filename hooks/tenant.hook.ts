import { getMyViewReq } from "@/features/auth/api/tenant.api";
import { useQuery } from "@tanstack/react-query";

export const useGetTenantViewQRequests = () => {
  return useQuery({
    queryKey: ["tenant-view-req-list"],
    queryFn: getMyViewReq,
  });
};
