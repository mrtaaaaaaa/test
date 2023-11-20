import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initial-state";
import { InitialType } from "./initial-type";
import { RootState } from "../store";

const brandModel = createSlice({
  name: "brandModel",
  initialState,
  reducers: {
    ADD_CAR_MODEL: (state: InitialType, { payload }) => {
      Object.keys(state).map((item) => {
        if (item == payload.name) {
          state[item] = payload.value;
        }
      });
    },
    SET_COMPONENT: (state: InitialType, { payload }) => {
      state.component = payload;
    },
    SET_IS_MULTIPLE: (state, { payload }) => {
      state.multiple = payload;
    },
    ADD_CATEGORY: (state, { payload }) => {
      state.category = payload;
    },
  },
});

export const { ADD_CAR_MODEL, SET_COMPONENT, SET_IS_MULTIPLE, ADD_CATEGORY } =
  brandModel.actions;
  export const brandModelSelector = (state: RootState) => state.brandModel;
export default brandModel.reducer;
