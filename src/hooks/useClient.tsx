import axios from "axios";
import { baseURL } from "../api/apiClient";

const authClient = axios.create({ baseURL: baseURL });

const useClient = () => {
  return { authClient };
};
export default useClient;
