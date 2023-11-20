import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import { loginPass, loginUser } from "../auth-actions";
import { initialState } from "./initial-state";
import getSecondsAndMinutes from "@/utils/get-seconds-and-minutes";

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login userPass
    builder.addCase(loginPass?.pending, (state) => {
      state.login_pass_loading = true;
      state.login_pass_error = {
        message: "",
        code: null,
      };
    });

    builder.addCase(loginPass?.fulfilled, (state, { payload }) => {
      state.login_pass_loading = false;
      state.login_pass_success = true;
      state.login_pass_error = {
        message: "",
        code: null,
      };
    });

    builder.addCase(loginPass?.rejected, (state, { payload }) => {
      const { status: code } = payload;

      const message =
        code == 400
          ? payload.data.Duration
            ? `به علت ۱۰ تلاش ناموفق، دسترسی به مدت ${getSecondsAndMinutes(
                payload?.data.Duration
              )} مسدود می‌شود.`
            : "نام کاربری یا رمز عبور اشتباه است"
          : "متاسفانه خطایی رخ داده است.";

      state.login_pass_loading = false;
      state.login_pass_success = false;
      state.login_pass_error = {
        message: message,
        code: code,
      };
    });

    // Login user
    builder.addCase(loginUser?.pending, (state) => {
      state.loading = true;
      state.login_OTP_error = null;
    });

    builder.addCase(loginUser?.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.login_OTP_success = true;
      state.login_OTP_error = false;
    });

    builder.addCase(loginUser?.rejected, (state) => {
      state.loading = false;
      state.login_OTP_error = true;
      state.login_OTP_success = false;
    });
  },
});

export const loginSelector = (state: RootState) => state.login;

export default loginSlice.reducer;
