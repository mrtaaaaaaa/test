import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initial-state";
import { InitialType } from "./initial-type";
import { RootState } from "../store";

export const insurance = createSlice({
  name: "insurance",
  initialState,
  reducers: {
    ADD_INSURNCE: (state: InitialType, { payload }) => {
      const index = state.insurances.findIndex((object) => {
        return object.type === payload.type;
      });
      if (index > -1) {
        state.insurances[index] = payload;
      } else {
        state.insurances.push(payload);
      }
    },

    REMOVE_INSURNCE: (state, { payload }) => {
      const index = state.insurances.findIndex((object: any) => {
        return object.type === payload;
      });
      state.insurances.splice(index, 1); // 2nd parameter means remove one item only
    },

    ADD_WHOLE_INSURANE: (state, { payload }) => {
      state.insurances = payload;
    },
  },
});

export const { ADD_INSURNCE, REMOVE_INSURNCE, ADD_WHOLE_INSURANE } =
  insurance.actions;

export const insuranceSelector = (state: RootState) => state.insurance;

export default insurance.reducer;
