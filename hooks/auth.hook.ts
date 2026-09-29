import { userLogin, userRegister } from "@/features/auth/api";
import { useMutation } from "@tanstack/react-query";

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
