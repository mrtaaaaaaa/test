import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../auth-actions";
import { initialState } from "./initial-state";

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register user
    builder.addCase(registerUser?.pending, (state) => {
      state.register_loading = true;
      state.register_error = {
        message: "",
        code: null,
      };
    });

    builder.addCase(registerUser?.fulfilled, (state) => {
      state.register_loading = false;
      state.register_success = true;
      state.register_error = {
        message: "",
        code: null,
      };
    });

    builder.addCase(registerUser?.rejected, (state, { payload }) => {
      const { status: code } = payload;

      const message =
        code == 400
          ? payload.data.Duration
            ? `به علت ۱۰ تلاش ناموفق، دسترسی به مدت ${getSecondsAndMinutes(
                payload?.data.Duration
              )} مسدود می‌شود.`
            : "متاسفانه خطایی رخ داده است."
          : "متاسفانه خطایی رخ داده است.";

      state.register_loading = false;
      state.register_success = false;
      state.register_error = {
        message: message,
        code: code,
      };
    });
  },
});
export const registerSelector = (state: RootState) => state.register;
export default registerSlice.reducer;
