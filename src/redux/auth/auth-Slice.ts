import { createSlice } from "@reduxjs/toolkit";
import { loginUser, loginPass, registerUser } from "./auth-actions";
import { RootState } from "../store";
import { checkExistWindow } from "@/utils/check-exist-window";

const initialState = {
  userInfo:
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("userInfo") ?? "{}"),
  // for storing the JWT
  userToken:
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("userToken") ?? "{}"),
  // for storing the JWT
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser?.fulfilled, (state, { payload }) => {
      state.userInfo =
        payload ??
        (checkExistWindow() &&
          JSON.parse(window.localStorage.getItem("userInfo") ?? "{}"));
      state.userToken =
        payload?.Authorization ??
        (checkExistWindow() &&
          JSON.parse(window.localStorage.getItem("userToken") ?? "{}"));
    });

    builder.addCase(loginPass?.fulfilled, (state, { payload }) => {
      state.userInfo =
        payload ??
        (checkExistWindow() &&
          JSON.parse(window.localStorage.getItem("userInfo") ?? "{}"));
      state.userToken =
        payload?.Authorization ??
        (checkExistWindow() &&
          JSON.parse(window.localStorage.getItem("userToken") ?? "{}"));
    });

    builder.addCase(registerUser?.fulfilled, (state, { payload }) => {
      state.userInfo =
        payload ??
        (checkExistWindow() &&
          JSON.parse(window.localStorage.getItem("userInfo") ?? "{}"));
      state.userToken =
        payload?.Authorization ??
        (checkExistWindow() &&
          JSON.parse(window.localStorage.getItem("userToken") ?? "{}"));
    });
  },
});
export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
