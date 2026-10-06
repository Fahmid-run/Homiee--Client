import apiClient from "@/lib/apiClient";

export const getAllProperty = () => {
  return apiClient("/property/");
};

export const getOwnerProperty = () => {
  return apiClient("/property/owner/me");
};

export const createProperty = (payload) => {
  return apiClient("/property/", {
    headers: {
      Accept: "application/json",
    },
    method: "POST",
    body: payload,
  });
};
