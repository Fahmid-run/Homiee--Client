"use client";

import { getMyViewReq, getPaymentList } from "@/features/auth/api/tenant.api";
import { useQuery } from "@tanstack/react-query";

export const useGetTenantViewQRequests = () => {
  return useQuery({
    queryKey: ["tenant-view-req-list"],
    queryFn: getMyViewReq,
  });
};

export const useGetPaymentList = () => {
  return useQuery({
    queryKey: ["tenant-payment-list"],
    queryFn: getPaymentList,
  });
};
