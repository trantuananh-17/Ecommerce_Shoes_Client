import axios from "axios";
import Cookies from "js-cookie";

export const baseURL = "http://localhost:4000/api";

export const setAccessToken = (token: string) => {
  Cookies.set("access_token", token, { expires: 15 / (24 * 60) });
};

export const getAccessToken = () => {
  return Cookies.get("access_token");
};

const client = axios.create({
  baseURL,
  timeout: 100000,
  withCredentials: true,
});

export default client;
