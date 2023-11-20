import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initial-state";
import { InitialType } from "./initial-type";
import { RootState } from "../store";

export const VehicleCheckSlice = createSlice({
  name: "vehicleCheck",
  initialState,
  reducers: {
    ADD_BRAND: (state: InitialType, { payload }) => {
      state.brand_and_model = payload;
    },
    ADD_YEAR: (state: InitialType, { payload }) => {
      state.year_of_manufacture = payload;
    },
    ADD_AREA: (state: InitialType, { payload }) => {
      state.vehicle_check_area = payload;
    },
    ADD_PAYMENT: (state: InitialType, { payload }) => {
      state.payment = payload;
    },
    SET_ERROR_BRAND: (state: InitialType, { payload }) => {
      state.error.brand = payload;
    },
    SET_ERROR_YEAR: (state: InitialType, { payload }) => {
      state.error.year = payload;
    },
    SET_ERROR_AREA: (state: InitialType, { payload }) => {
      state.error.area = payload;
    },
    REMOVE_VEHICLE_CHECKS: (state) => {
      state.order = 0;
      state.payment = [];
      state.brand_and_model = [];
      state.year_of_manufacture = [];
      state.vehicle_check_area = [];
      state.error.brand = [];
      state.error.year = [];
      state.error.area = [];
    },
  },
});

export const {
  ADD_BRAND,
  ADD_YEAR,
  ADD_AREA,
  ADD_PAYMENT,
  REMOVE_VEHICLE_CHECKS,
  SET_ERROR_BRAND,
  SET_ERROR_YEAR,
  SET_ERROR_AREA,
} = VehicleCheckSlice.actions;

export const vehicleSelector = (state: RootState) => state.vehicleCheck;

export default VehicleCheckSlice.reducer;
