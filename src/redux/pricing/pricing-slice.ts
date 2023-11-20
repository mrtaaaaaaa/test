import { staticData } from "@/data";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { initialState } from "./init-state";
import { InitialType } from "./initial-type";

const pricingIntialValue = staticData.pricing_list_items.map((type) => type);

pricingIntialValue.forEach((element) => {
  initialState[element.en] = "none";
});

export const pricing = createSlice({
  name: "pricing",
  initialState,
  reducers: {
    ADD_CAR_MODEL_INFO: (state, { payload }) => {
      state.type = payload.type;
      state.model = payload.model;
      state.brand = payload.brand;
    },

    ADD_ERROR_FOR_BRANDMODEL: (state, { payload }) => {
      state.brand_model_error = payload;
    },
    ADD_YEAR_OF_MANUFACTURE: (state, { payload }) => {
      state.year_of_manufacture = payload;
    },
    ADD_YEAR_TYPE: (state, { payload }) => {
      state.year_type = payload;
    },
    ADD_MILEAGE: (state, { payload }) => {
      state.mileage = payload;
    },
    ADD_MADE_ABROAD: (state, { payload }) => {
      state.is_car_made_aboard = payload;
    },
    ADD_CAR_DETAILS_INFO: (state, { payload }) => {
      state[payload.name] = payload.state;
    },
    ADD_WHOLE_CAR_DETAILS_INFO: (state: InitialType, { payload }) => {
      payload.map(({ name, value }: { name: string; value: any }) => {
        state[name] = value;
      });
    },
    SET_TAB: (state, { payload }) => {
      state.tab = payload;
    },
    SET_RESULT: (state, { payload }) => {
      state.estimate = payload.estimate;
      state.lower_estimate = payload.lower_estimate;
      state.upper_estimate = payload.upper_estimate;
    },
    REMOVE_CAR_INFO: (state) => {
      pricingIntialValue.forEach((element) => {
        state[element.en] = "none";
      });
    },
    REMOVE_PRICING_DATA: (state) => {
      state.brand = "";
      state.type = "";
      state.model = "";
      state.brand_model_error = false;
      state.year_of_manufacture = "";

      state.year = 1402;
      state.mileage = "";
      state.year_type = true;
      state.is_car_made_aboard = null;
      state.tab = 1;
      state.estimate = 0;
      state.lower_estimate = 0;
      state.upper_estimate = 0;
      staticData.pricing_list_items.map(({en})=> {
        state[en] = "none"
      })

    },
  },
});

export const {
  ADD_CAR_MODEL_INFO,
  ADD_YEAR_OF_MANUFACTURE,
  ADD_MILEAGE,
  ADD_YEAR_TYPE,
  ADD_MADE_ABROAD,
  ADD_CAR_DETAILS_INFO,
  ADD_WHOLE_CAR_DETAILS_INFO,
  SET_TAB,
  SET_RESULT,
  REMOVE_CAR_INFO,
  ADD_ERROR_FOR_BRANDMODEL,
  REMOVE_PRICING_DATA,
} = pricing.actions;

export const pricingSelector = (state: RootState) => state.pricing;

export default pricing.reducer;
