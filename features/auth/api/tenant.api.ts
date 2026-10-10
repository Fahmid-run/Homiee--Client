import apiClient from "@/lib/apiClient";

export const getMyViewReq = () => {
  return apiClient("/tenant/view-request");
};

// export const getOwnerProperty = () => {
//   return apiClient("/property/owner/me");
// };

export const getPaymentList = () => {
  return apiClient("/tenant/payments");
};

export const createViewReq = (roomId: string) => {
  return apiClient(`/tenant/view-request/${roomId}`);
};
