import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRoutes } from "react-router-dom";

import AppRoutes from "./routes";
import AxiosInterceptor from "./api/axiosInterceptor";
import {
  logoutState,
  updateAuthState,
  setAuthLoaded,
} from "./stores/slices/authSlice";
import { auth } from "./api/axiosInterceptor";

function App() {
  const dispatch = useDispatch();
  const routing = useRoutes(AppRoutes);

  const [interceptorReady, setInterceptorReady] = useState(false);

  useEffect(() => {
    console.log("[App.tsx]  Khởi tạo Axios Interceptor");

    AxiosInterceptor(() => {
      console.log("[App.tsx]  Token hết hạn - logout");
      dispatch(logoutState());
    });

    setInterceptorReady(true);

    return;
  }, [dispatch]);

  useEffect(() => {
    if (!interceptorReady) return;

    const refresh = async () => {
      try {
        const userInfo = await auth.get("/auth/me");
        dispatch(updateAuthState({ user: userInfo.data.data }));
      } catch {
        dispatch(updateAuthState({ user: null }));
      } finally {
        dispatch(setAuthLoaded());
      }
    };

    refresh();
  }, [interceptorReady, dispatch]);

  return <>{routing}</>;
}

export default App;
