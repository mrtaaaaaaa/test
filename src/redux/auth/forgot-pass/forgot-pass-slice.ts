import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import { forgotPass } from "../auth-actions";
import { initialState } from "./initial-state";

const forgotPassSlice = createSlice({
  name: "forgotPass",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login userPass
    builder.addCase(forgotPass?.pending, (state) => {
      state.forgot_pass_loading = true;
      state.forgot_pass_error = false;
    });

    builder.addCase(forgotPass?.fulfilled, (state) => {
      state.forgot_pass_loading = false;
      state.forgot_pass_error = false;
      state.forgot_pass_success = true;
    });

    builder.addCase(forgotPass?.rejected, (state) => {
      state.forgot_pass_loading = false;
      state.forgot_pass_error = true;
      state.forgot_pass_success = false;
    });
  },
});

export const forgotPassSelector = (state: RootState) => state.forgotPass;

export default forgotPassSlice.reducer;
