import { auth } from "../api/axiosInterceptor";
import { apiRequest } from "../api/apiRequest";

export const fetchSizesAPI = async (page = 1, limit = 8) => {
  return await apiRequest(
    auth.get(`/sizes?page=${page}&limit=${limit}`, {
      headers: { "Cache-Control": "no-cache" },
    })
  );
};

export const addSizeAPI = async (name: string) => {
  return await apiRequest(auth.post("/sizes", { name: name.trim() }));
};

export const deleteSizeAPI = async (id: string) => {
  return await apiRequest(auth.delete(`/sizes/${id}`));
};
