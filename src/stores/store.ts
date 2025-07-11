import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

const reducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;

export default store;
