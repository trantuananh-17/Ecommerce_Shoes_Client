import { apiRequest } from "../api/apiRequest";
import { auth } from "../api/axiosInterceptor";

interface updateCartItem {
  sizeQuantityId: string;
  quantity: number;
}

export const fetchCartSumaryAPI = async () => {
  return await apiRequest(
    auth.get(`/carts/sumary`, {
      headers: { "Cache-Control": "no-cache", "Accept-Language": "vi" },
    })
  );
};

export const fetchDataCartAPI = async () => {
  return await apiRequest(
    auth.get(`/carts`, {
      headers: { "Cache-Control": "no-cache", "Accept-Language": "vi" },
    })
  );
};

export const updateQuantityAPI = async (item: updateCartItem) => {
  return await apiRequest(auth.put(`/carts`, item));
};

export const deleteCartItemAPI = async (productId: string) => {
  return await apiRequest(auth.delete(`/carts/${productId}`));
};
