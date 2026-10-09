import { getMyViewReq } from "@/features/auth/api/tenant.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCreateProperty } from "./properties.hook";
import { createProperty } from "@/features/auth/api/property.api";

export const useGetTenantViewQRequests = () => {
  return useQuery({
    queryKey: ["tenant-view-req-list"],
    queryFn: getMyViewReq,
  });
};

export const useCreateNewProperty = () => {
  return useMutation({
    mutationFn: createProperty,
  });
};
