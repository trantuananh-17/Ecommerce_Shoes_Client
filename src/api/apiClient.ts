import axios from "axios";

export const baseURL = "http://localhost:4000/api";

let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

const client = axios.create({
  baseURL,
  timeout: 100000,
  withCredentials: true,
});

export default client;
