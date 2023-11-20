import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initial-state";
import { InitialType } from "./initial-type";
import { RootState } from "../store";

export const EditSlice = createSlice({
  name: "editPersonalInfo",
  initialState,
  reducers: {
    SET_MODAL_SITUATION: (state: InitialType, { payload }) => {
      state.open = payload;
    },
    SET_DATA: (state, { payload }) => {
      state.data = payload;
    },
    SET_BIRTHDAY: (state: InitialType, { payload }) => {
      state.data.day_of_birth = payload.day;
      state.data.month_of_birth = payload.month;
      state.data.year_of_birth = payload.year;
    },
  },
});

export const { SET_MODAL_SITUATION, SET_DATA, SET_BIRTHDAY } =
  EditSlice.actions;

export const editSliceSelector = (state: RootState) => state.editPersonalInfo;

export default EditSlice.reducer;
