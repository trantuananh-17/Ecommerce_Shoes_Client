import { auth } from "../api/axiosInterceptor";
import { apiRequest } from "../api/apiRequest";

export const fetchOrdersAPI = async (status: string, page = 1, limit = 8) => {
  return await apiRequest(
    auth.get(`/orders/admin?status=${status}&page=${page}&limit=${limit}`, {
      headers: { "Cache-Control": "no-cache" },
    })
  );
};

export const fetchOrderDetailAPI = async (id: string) => {
  return await apiRequest(
    auth.get(`/orders/admin/${id}`, {
      headers: { "Cache-Control": "no-cache" },
    })
  );
};
