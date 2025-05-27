import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type Profile = {
  id: string;
  email: string;
  fullname: string;
  role: string;
  avatar?: string;
};

interface AuthState {
  user: Profile | null;
  isAuthenticated: boolean;
  authLoaded: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authLoaded: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState(
      state,
      action: PayloadAction<{
        user: Profile | null;
      }>
    ) {
      state.isAuthenticated = !!action.payload.user;
      state.user = action.payload.user;
    },

    logoutState(state) {
      state.isAuthenticated = false;
      state.user = null;
    },

    setAuthLoaded(state) {
      state.authLoaded = true;
    },
  },
});

export const { updateAuthState, logoutState, setAuthLoaded } =
  authSlice.actions;

export const getAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
