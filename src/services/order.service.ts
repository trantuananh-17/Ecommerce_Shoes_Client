import { auth } from "../api/axiosInterceptor";
import { apiRequest } from "../api/apiRequest";
import type { OrderNote } from "../types/order.type";

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

export const updateStatusOrderAPI = async (id: string, status: string) => {
  console.log(id, status);

  return await apiRequest(
    auth.patch(`/orders/${id}`, { orderStatus: status.trim() })
  );
};

export const cancelOrderAPI = async (id: string, note: OrderNote) => {
  return await apiRequest(
    auth.patch(`/orders/cancel/${id}`, { orderNote: note })
  );
};
