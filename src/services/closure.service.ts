import { apiRequest } from "../api/apiRequest";
import { auth } from "../api/axiosInterceptor";

export type addClosure = {
  name: { vi: string; en: string };
  description: { vi: string; en: string };
};

export const fetchClosureByAdminAPI = async (page = 1, limit = 7) => {
  return await apiRequest(
    auth.get(`/closures/admin?page=${page}&limit=${limit}`, {
      headers: { "Cache-Control": "no-cache" },
    })
  );
};

export const addClosureAPI = async (closure: addClosure) => {
  return await apiRequest(auth.post("/closures", closure));
};

export const updateClosureAPI = async (id: string, closure: addClosure) => {
  return await apiRequest(auth.put(`/closures/${id}`, closure));
};
