import apiClient from "@/lib/apiClient";

export const getAllProperty = () => {
  return apiClient("/property/");
};
export const getPropertyById = (id: string) => {
  return apiClient(`/property/${id}`);
};

export const getOwnerProperty = () => {
  return apiClient("/property/owner/me");
};

export const createProperty = (payload: any) => {
  return apiClient("/property/", {
    headers: {
      Accept: "application/json",
    },
    method: "POST",
    body: payload,
  });
};
