import { CarEngineTypes } from "src/data/static-data/car-expert/car-engine-types";
import { createSlice } from "@reduxjs/toolkit";
import { initialState as initState } from "./initial-state";
import { InitialType } from "./initial-type";

const innerType = CarEngineTypes.map((type) => type);
const initialState: InitialType = initState;

innerType.forEach((element) => {
  initialState[element.en] = { title: element.name, status: "", score: "" };
});

export const carEngine = createSlice({
  name: "carEngine",
  initialState,
  reducers: {
    ADD_SCORE_CAR_ENGINE: (state: InitialType, { payload }) => {
      state[payload.name].score = payload.score;
      state[payload.name].status = "دارد";
      state.score += Number(payload.score);
    },

    REMOVE_SCORE_CAR_ENGINE: (state: InitialType, { payload }) => {
      state[payload.name].score = payload.score;
      state[payload.name].status = "ندارد";
      state.score -= state.score == 0 ? 0 : Number(payload.score);
    },
    ADD_DESCRIPTION_CAR_ENGINE: (state, { payload }) => {
      state.description = payload;
    },
  },
});

export const {
  REMOVE_SCORE_CAR_ENGINE,
  ADD_SCORE_CAR_ENGINE,
  ADD_DESCRIPTION_CAR_ENGINE,
} = carEngine.actions;

export default carEngine.reducer;
