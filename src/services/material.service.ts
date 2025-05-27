import axios from "axios";
import { baseURL } from "../api/apiClient";
import { apiRequest } from "../api/apiRequest";
const auth = axios.create({ baseURL });

export const fetchMaterialsAPI = async (page = 1, limit = 7) => {
  return await apiRequest(
    auth.get(`/materials?page=${page}&limit=${limit}`, {
      headers: { "Cache-Control": "no-cache" },
    })
  );
};
