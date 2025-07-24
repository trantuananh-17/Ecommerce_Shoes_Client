import { apiRequest } from "../api/apiRequest";
import { auth } from "../api/axiosInterceptor";

export type addColor = {
  name: {
    vi: string;
    en: string;
  };
};

export const fetchColorsByAdminAPI = async (page = 1, limit = 12) => {
  return await apiRequest(
    auth.get(`/colors/admin?page=${page}&limit=${limit}`, {
      headers: { "Cache-Control": "no-cache" },
    })
  );
};

export const addColorAPI = async (color: addColor) => {
  return await apiRequest(auth.post("/colors", color));
};
