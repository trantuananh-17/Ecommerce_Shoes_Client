import axios from "axios";

export const baseURL = "http://localhost:4000/api";

const client = axios.create({ baseURL });

export default client;
