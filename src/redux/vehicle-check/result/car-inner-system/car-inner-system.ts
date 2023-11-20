import { CarInnerSystemTypes } from "src/data/static-data/car-expert/car-inner-system-types";
import { createSlice } from "@reduxjs/toolkit";
import { initialState as initState } from "./initial-state";
import { InitialType } from "./initial-type";

const innerType = CarInnerSystemTypes.map((type) => type);

const initialState: InitialType = initState;

innerType.forEach((element) => {
  initialState[element.en] = { title: element.name, status: "", score: "" };
});

export const carInnerSystemSlice = createSlice({
  name: "carInnerSystem",
  initialState,
  reducers: {
    ADD_SCORE_INNER_SYSTEM: (state: InitialType, { payload }) => {
      state[payload.name].score = payload.score;
      state[payload.name].status = "دارد";
      state.score += Number(payload.score);
    },
    REMOVE_SCORE_INNER_SYSTEM: (state: InitialType, { payload }) => {
      state[payload.name].score = payload.score;
      state[payload.name].status = "ندارد";
      state.score -= state.score == 0 ? 0 : Number(payload.score);
    },
    ADD_DESCRIPTION_INNER_SYSTEM: (state: InitialType, { payload }) => {
      state.description = payload;
    },
  },
});

export const {
  REMOVE_SCORE_INNER_SYSTEM,
  ADD_SCORE_INNER_SYSTEM,
  ADD_DESCRIPTION_INNER_SYSTEM,
} = carInnerSystemSlice.actions;

export default carInnerSystemSlice.reducer;
