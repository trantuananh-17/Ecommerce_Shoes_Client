import { apiRequest } from "../api/apiRequest";
import { auth } from "../api/axiosInterceptor";

export type addCategory = {
  name: { vi: string; en: string };
};

export type updateCategory = {
  name: { vi: string; en: string };
  isActive: boolean;
};

export const fetchCategoryAPI = async (
  page = 1,
  limit = 7,
  isActive?: boolean
) => {
  const isActiveParam = isActive !== undefined ? `&active=${isActive}` : "";
  return await apiRequest(
    auth.get(`/categories/admin?page=${page}&limit=${limit}${isActiveParam}`, {
      headers: { "Cache-Control": "no-cache" },
    })
  );
};

export const addCategoryAPI = async (category: addCategory) => {
  return await apiRequest(auth.post("/categories", category));
};

export const updateCategoryAPI = async (
  id: string,
  category: updateCategory
) => {
  return await apiRequest(auth.put(`/categories/${id}`, category));
};

export const deleteCategoryAPI = async (category: addCategory) => {
  return await apiRequest(auth.post("/categories", category));
};
