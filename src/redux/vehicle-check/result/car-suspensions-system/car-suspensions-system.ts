import { CarSuspensionSystemTypes } from "src/data/static-data/car-expert/car-suspension-system-types";
import { createSlice } from "@reduxjs/toolkit";
import { initialState as initState } from "./initial-state";
import { InitialType } from "./initial-type";

const innerType = CarSuspensionSystemTypes.map((type) => type);
const initialState: InitialType = initState;

innerType.forEach((element) => {
  initialState[element.en] = { title: element.name, status: "", score: "" };
});

export const caSuspensionsSlice = createSlice({
  name: "carSuspensions",
  initialState,
  reducers: {
    ADD_SCORE_SUSPENSIONS_SYSTEM: (state: InitialType, { payload }) => {
      state[payload.name].score = payload.score;
      state[payload.name].status = "دارد";
      state.score += Number(payload.score);
    },
    REMOVE_SCORE_SUSPENSIONS_SYSTEM: (state: InitialType, { payload }) => {
      state[payload.name].score = payload.score;
      state[payload.name].status = "ندارد";
      state.score -= state.score == 0 ? 0 : Number(payload.score);
    },
    ADD_DESCRIPTION_SUSPENSIONS_SYSTEM: (state: InitialType, { payload }) => {
      state.description = payload;
    },
  },
});

export const {
  REMOVE_SCORE_SUSPENSIONS_SYSTEM,
  ADD_SCORE_SUSPENSIONS_SYSTEM,
  ADD_DESCRIPTION_SUSPENSIONS_SYSTEM,
} = caSuspensionsSlice.actions;

export default caSuspensionsSlice.reducer;
