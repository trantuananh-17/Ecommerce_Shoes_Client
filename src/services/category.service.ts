import axios from "axios";
import { baseURL } from "../api/apiClient";
import { apiRequest } from "../api/apiRequest";
const auth = axios.create({ baseURL });

export const fetchCategoryAPI = async (
  page = 1,
  limit = 7,
  isActive?: boolean
) => {
  const isActiveParam = isActive !== undefined ? `&active=${isActive}` : "";
  return await apiRequest(
    auth.get(`/categories?page=${page}&limit=${limit}${isActiveParam}`, {
      headers: { "Cache-Control": "no-cache" },
    })
  );
};
