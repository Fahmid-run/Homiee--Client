import { ofetch } from "ofetch";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiClient = ofetch.create({
  baseURL: baseUrl,
});

export default apiClient;
