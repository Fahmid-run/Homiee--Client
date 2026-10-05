import { getAllProperty } from "@/features/auth/api/property.api";
import { useQuery } from "@tanstack/react-query";

export const useGetProperties = () => {
  return useQuery({ queryKey: ["properties"], queryFn: getAllProperty });
};
