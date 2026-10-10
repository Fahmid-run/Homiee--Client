import { userGetMe, userLogin, userRegister } from "@/features/auth/api";
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: userRegister,
  });
}

export const meQueryOptions = queryOptions({
  queryKey: ["User-Token"],
  queryFn: userGetMe,
  retry: false,
});

export function useGetMe() {
  return useQuery(meQueryOptions);
}
