import apiClient from "@/lib/apiClient";

export const getAllProperty = () => {
  return apiClient("/property/");
};
