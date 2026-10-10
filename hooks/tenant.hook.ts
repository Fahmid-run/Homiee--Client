"use client";

import {
  createViewReq,
  getMyViewReq,
  getPaymentList,
} from "@/features/auth/api/tenant.api";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useCreateViewReq = (roomId: string) => {
  return useMutation({
    mutationFn: createViewReq,
  });
};
