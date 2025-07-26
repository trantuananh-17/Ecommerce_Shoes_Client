import axios from "axios";
import { baseURL } from "../api/apiClient";
import { apiRequest } from "../api/apiRequest";
const auth = axios.create({ baseURL });

export const fetchBrandAPI = async (
  page = 1,
  limit = 7,
  query = "",
  isActive?: boolean
) => {
  const isActiveParam = isActive !== undefined ? `&isActive=${isActive}` : "";
  return await apiRequest(
    auth.get(`/brands?page=${page}&limit=${limit}${isActiveParam}&q=${query}`, {
      headers: { "Cache-Control": "no-cache" },
    })
  );
};

export const updateActiveBrandAPI = async (id: string, active: boolean) => {
  return await apiRequest(auth.patch(`/brands/${id}`, { isActive: active }));
};

export const deleteBrandAPI = async (id: string) => {
  return await apiRequest(auth.delete(`/brands/${id}`));
};

export const fetchBrandNameAPI = async () => {
  return await apiRequest(auth.get(`/brands/list-name`));
};
