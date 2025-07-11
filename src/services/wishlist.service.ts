import { apiRequest } from "../api/apiRequest";
import { auth } from "../api/axiosInterceptor";

export const fetchWislistSumaryAPI = async () => {
  return await apiRequest(
    auth.get(`/wishlists/sumary`, {
      headers: { "Cache-Control": "no-cache", "Accept-Language": "vi" },
    })
  );
};
