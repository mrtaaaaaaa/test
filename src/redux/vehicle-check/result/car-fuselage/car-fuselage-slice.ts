import {
  CarFuselageTypes,
  Tire,
} from "src/data/static-data/car-expert/car-fuselage-types";
import { createSlice } from "@reduxjs/toolkit";
import { initialState as initState } from "./initial-state";
import { InitialType } from "./initial-type";

const initialState: InitialType = initState;

const innerType = CarFuselageTypes.map((type) => type);
const innerTireType = Tire.map((type) => type);

innerType.forEach((element) => {
  initialState[element.enName] = {
    title: element.name,
    name: element.enName,
    status: "",
    score: "",
  };
});

innerTireType.forEach((element) => {
  initialState[element.enName] = {
    title: element.name,
    name: element.enName,
    status: "",
    score: "",
  };
});

export const carFuselageSlice = createSlice({
  name: "carFuselage",
  initialState,
  reducers: {
    ADD_SCORE_CARFUSELAGE: (state: InitialType, { payload }) => {
      state.score = payload;
    },
    ADD_CARFUSELAGE: (state: InitialType, { payload }) => {
      state[payload.title].status = payload.status;
      state[payload.title].score = payload.score;
    },
    ADD_DESCRIPTION_CARFUSELAGE: (state: InitialType, { payload }) => {
      state.description = payload;
    },
  },
});

export const {
  ADD_SCORE_CARFUSELAGE,
  ADD_CARFUSELAGE,
  ADD_DESCRIPTION_CARFUSELAGE,
} = carFuselageSlice.actions;

export default carFuselageSlice.reducer;
