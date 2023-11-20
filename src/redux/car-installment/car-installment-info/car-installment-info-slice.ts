const { createSlice } = require("@reduxjs/toolkit");
import { initialState } from "./initial-state";
import { InitialType } from "./initial-type";

const carInstallmentInfo = createSlice({
  name: "carInstallmentInfo",
  initialState,
  reducers: {
    ADD_INFO: (state: InitialType, { payload }: any) => {
      state.user_info = payload.user_info;
      state.car_info = payload.car_info;
      state.images = payload.images;
      state.car_installment_info = payload.car_installment_info;
    },
    SET_SHOW_INFO: (state: InitialType, { payload }: any) => {
      state.show_info = payload;
    },
  },
});

export const { ADD_INFO, SET_SHOW_INFO } = carInstallmentInfo.actions;

export default carInstallmentInfo.reducer;
