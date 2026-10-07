import apiClient from "@/lib/apiClient";

export function getStats() {
  return apiClient("/admin/stats");
}
