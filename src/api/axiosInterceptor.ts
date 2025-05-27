import axios, { AxiosError } from "axios";
import type {
  AxiosHeaders,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { getAccessToken, setAccessToken, baseURL } from "./apiClient";
import { apiRequest } from "./apiRequest";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const auth = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

export default function AxiosInterceptor(onUnauthenticated: () => void) {
  const onRequestSuccess = async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const token = getAccessToken();

    if (token) {
      (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
    }

    return config;
  };

  const onResponseSuccess = (response: AxiosResponse) => {
    return response;
  };

  const onResponseError = async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      const errMessage = error.response?.data || error?.response || error;
      return Promise.reject(errMessage);
    }

    originalRequest._retry = true;

    return refreshToken(originalRequest, onUnauthenticated);
  };

  const refreshToken = async (
    originalRequest: CustomAxiosRequestConfig,
    logout: () => void
  ) => {
    try {
      const { data } = await apiRequest(
        auth.post("/auth/refresh", {}, { withCredentials: true })
      );

      const newAccessToken = data.access_token;

      setAccessToken(newAccessToken);

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      return await axios(originalRequest);
    } catch (refreshError) {
      logout();
      return Promise.reject(refreshError);
    }
  };

  const requestInterceptorId = auth.interceptors.request.use(onRequestSuccess);
  const responseInterceptorId = auth.interceptors.response.use(
    onResponseSuccess,
    onResponseError
  );

  return () => {
    auth.interceptors.request.eject(requestInterceptorId);
    auth.interceptors.response.eject(responseInterceptorId);
  };
}
