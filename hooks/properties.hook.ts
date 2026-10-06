import {
  createProperty,
  getAllProperty,
  getOwnerProperty,
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
