import { userGetMe, userLogin, userRegister } from "@/features/auth/api";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export function useGetMe() {
  return useQuery({
    queryKey: ["User-Token"],
    queryFn: userGetMe,
    retry: false,
  });
}
