import { useCallback, useEffect, useState } from "react";
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
import { getAccessToken } from "./api/apiClient";
import { fetchCartSumaryAPI, fetchDataCartAPI } from "./services/cart.service";
import {
  setCartItems,
  setCartLoaded,
  setCartSummary,
  setTotalPrices,
} from "./stores/slices/cartSlice";
// import WebSocketComponent from "./pages/user/sockettest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const routing = useRoutes(AppRoutes);

  const [interceptorReady, setInterceptorReady] = useState(false);

  const fetchCartData = useCallback(async () => {
    try {
      const accessToken = getAccessToken();

      if (accessToken) {
        const cartItemsSumaryResponse = await fetchCartSumaryAPI();
        const cartItemsResponse = await fetchDataCartAPI();

        dispatch(
          setCartSummary({
            totalQuantity: cartItemsSumaryResponse.data.totalItems,
          })
        );

        if (cartItemsResponse && cartItemsResponse.data.result) {
          dispatch(setCartItems(cartItemsResponse.data.result));

          dispatch(
            setTotalPrices({ totalPrice: cartItemsResponse.data.totalPrices })
          );
          dispatch(setCartLoaded());
        }
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }, [dispatch]);

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
        await fetchCartData();
      } catch {
        dispatch(updateAuthState({ user: null }));
      } finally {
        dispatch(setAuthLoaded());
      }
    };

    refresh();
  }, [interceptorReady, dispatch, fetchCartData]);

  return (
    // <>
    //   <WebSocketComponent />
    // </>
    <>
      {routing}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
