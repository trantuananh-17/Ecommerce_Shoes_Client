import { useDispatch, useSelector } from "react-redux";
import {
  getAuthState,
  logoutState,
  updateAuthState,
} from "../stores/slices/authSlice";
import { apiRequest } from "../api/apiRequest";
import axios from "axios";
import { baseURL, setAccessToken } from "../api/apiClient";
const auth = axios.create({ baseURL });

type UserInfo = {
  email: string;
  password: string;
};

export interface LoginResponse {
  data: {
    id: string;
    email: string;
    fullname: string;
    role: string;
    avatar?: string;
    token: {
      access_token: string;
      refresh_token: string;
    };
  };
}

const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector(getAuthState);

  const login = async (userInfo: UserInfo) => {
    try {
      const res = await apiRequest(
        auth.post("/auth/login", userInfo, {
          withCredentials: true,
        })
      );

      const userData = res?.data;
      const token = userData?.token;

      if (token?.access_token && userData) {
        setAccessToken(token.access_token);

        const user = {
          id: userData.id,
          email: userData.email,
          fullname: userData.fullname,
          role: userData.role,
          avatar: userData.avatar || "",
        };

        dispatch(
          updateAuthState({
            user,
          })
        );

        return user;
      }
      return null;
    } catch (error) {
      console.error(" Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await apiRequest(
        auth.post("/auth/logout", null, {
          withCredentials: true,
        })
      );
    } catch (error) {
      console.log("error: " + error);
    }

    dispatch(logoutState());
  };

  const loggedIn = authState.user ? true : false;
  return { login, authState, logout, loggedIn };
};

export default useAuth;
