import axios from "axios";
import { baseURL } from "../api/client";
import { apiRequest } from "../api/apiRequest";
const auth = axios.create({ baseURL });

export const fetchClosureAPI = async (page = 1, limit = 7) => {
  return await apiRequest(
    auth.get(`/closures?page=${page}&limit=${limit}`, {
      headers: { "Cache-Control": "no-cache" },
    })
  );
};
