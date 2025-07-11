import { apiRequest } from "../api/apiRequest";
import { auth } from "../api/axiosInterceptor";

export const fetchCartSumaryAPI = async () => {
  return await apiRequest(
    auth.get(`/carts/sumary`, {
      headers: { "Cache-Control": "no-cache", "Accept-Language": "vi" },
    })
  );
};
