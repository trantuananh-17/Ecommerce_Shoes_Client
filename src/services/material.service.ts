import { apiRequest } from "../api/apiRequest";
import { auth } from "../api/axiosInterceptor";

export type addMaterial = {
  name: { vi: string; en: string };
  description: { vi: string; en: string };
};

export type MaterialResponse = {
  id: string;
  name: string;
};

export const fetchMaterialsByAdminAPI = async (page = 1, limit = 7) => {
  return await apiRequest(
    auth.get(`/materials/admin?page=${page}&limit=${limit}`, {
      headers: { "Cache-Control": "no-cache" },
    })
  );
};

export const addMaterialAPI = async (closure: addMaterial) => {
  return await apiRequest(auth.post("/materials", closure));
};

export const updateMaterialAPI = async (id: string, closure: addMaterial) => {
  return await apiRequest(auth.put(`/materials/${id}`, closure));
};

export const fetchMaterialNameAPI = async () => {
  return await apiRequest(auth.get(`/materials`));
};
