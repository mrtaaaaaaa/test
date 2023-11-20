import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import { sendCode } from "../auth-actions";
import { initialState } from "./initial-state";
import { InitialType } from "./initial-type";

const sendCodeSlice = createSlice({
  name: "sendCode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Send code
    builder.addCase(sendCode?.pending, (state) => {
      state.verifaction_loading = true;
    });

    builder.addCase(sendCode?.fulfilled, (state: InitialType, { payload }) => {
      state.verifaction_loading = false;
      state.verifaction_success = true;
      state.verifaction_error = false;
    });

    builder.addCase(sendCode?.rejected, (state: InitialType, { payload }) => {
      state.verifaction_error = true;
      state.verifaction_success = false;
      state.verifaction_loading = false;
    });
  },
});
export const SendCodeSelector = (state: RootState) => state.sendCode;
export default sendCodeSlice.reducer;
