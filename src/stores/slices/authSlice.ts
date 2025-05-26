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
  access_token: string | null;
  user: null | Profile;
  isAuthenticated: boolean;
  authLoaded: boolean;
}

const initialState: AuthState = {
  access_token: null,
  user: null,
  isAuthenticated: false,
  authLoaded: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState(
      authState,
      action: PayloadAction<{
        access_token: string | null;
        user: Profile | null;
      }>
    ) {
      authState.isAuthenticated = true;
      authState.access_token = action.payload.access_token;
      authState.user = action.payload.user;
    },

    logoutState(authState) {
      authState.access_token = null;
      authState.isAuthenticated = false;
      authState.user = null;
    },

    setAuthLoaded(authState) {
      authState.authLoaded = true;
    },
  },
});

export const { updateAuthState, logoutState, setAuthLoaded } =
  authSlice.actions;

export const getAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
