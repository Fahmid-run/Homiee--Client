"use client";

import {
  createProperty,
  getAllProperty,
  getOwnerProperty,
  getPropertyById,
} from "@/features/auth/api/property.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllProperties = () => {
  return useQuery({ queryKey: ["properties"], queryFn: getAllProperty });
};

export const useGetOwnerPropertyList = () => {
  return useQuery({
    queryKey: ["owner-properties"],
    queryFn: getOwnerProperty,
  });
};

export const useCreateProperty = () => {
  return useMutation({
    mutationFn: createProperty,
  });
};

export const useGetPropertyById = (id: string) => {
  return useQuery({
    queryKey: ["property-by-id", id],
    queryFn: () => getPropertyById(id),
    enabled: !!id && id !== "null",
  });
};
