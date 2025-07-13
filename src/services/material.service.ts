import axios from "axios";
import { baseURL } from "../api/apiClient";
import { apiRequest } from "../api/apiRequest";
const auth = axios.create({ baseURL });

type addMaterial = {
  name: { vi: string; en: string };
  description: { vi: string; en: string };
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
