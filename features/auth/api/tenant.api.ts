import apiClient from "@/lib/apiClient";

export const getMyViewReq = () => {
  return apiClient("/tenant/view-request");
};

// export const getOwnerProperty = () => {
//   return apiClient("/property/owner/me");
// };
