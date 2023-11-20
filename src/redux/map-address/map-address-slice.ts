import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./inital-state";
import { InitialType } from "./initial-type";

export const mapAddress = createSlice({
  name: "address",
  initialState,
  reducers: {
    SET_ADDRESS: (state : InitialType, { payload }) => {
      state.address = payload;
    },
  },
});

export const { SET_ADDRESS } = mapAddress.actions;

export default mapAddress.reducer;
