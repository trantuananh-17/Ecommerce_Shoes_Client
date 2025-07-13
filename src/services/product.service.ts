import { apiRequest } from "../api/apiRequest";
import { auth } from "../api/axiosInterceptor";

export const fetchListDiscountedProductAPI = async (page = 1, limit = 4) => {
  return await apiRequest(
    auth.get(
      `/products?page=${page}&limit=${limit}&sortBy=discounted_price_asc`,
      {
        headers: { "Cache-Control": "no-cache" },
      }
    )
  );
};

export const fetchListNewProductAPI = async (page = 1, limit = 4) => {
  return await apiRequest(
    auth.get(`/products?page=${page}&limit=${limit}&sortBy=createdAt_desc`, {
      headers: { "Cache-Control": "no-cache" },
    })
  );
};

export const fetchDetailProducttAPI = async (slug: string) => {
  return await apiRequest(
    auth.get(`/products/slug/${slug}`, {
      headers: { "Cache-Control": "no-cache" },
    })
  );
};
