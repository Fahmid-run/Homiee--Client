import apiClient from "@/lib/apiClient";

export function userLogin(payload: { email: string; password: string }) {
  return apiClient("/auth/login", { method: "POST", body: payload });
}

export function userRegister(payload: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) {
  return apiClient("/auth/register", { method: "POST", body: payload });
}
