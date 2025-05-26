import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

const reducers = combineReducers({
  auth: authReducer,
});

const store = configureStore({ reducer: reducers });

export type RootState = ReturnType<typeof store.getState>;

export default store;
