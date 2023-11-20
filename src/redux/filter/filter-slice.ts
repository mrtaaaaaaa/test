import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { initialState } from "./initial-state";

// const initialState = {
//   shownCars: [],
//   brand: [],
//   model: [],
//   type: [],
//   min_price: -1,
//   max_price: -1,
//   min_Mileage: -1,
//   max_Mileage: -1,
//   colors: [],
//   carDamage: [],
//   gear_box_types: [],
//   fuel_types: [],
//   min_year_of_manufacture: -1,
//   max_year_of_manufacture: -1,
//   previewData: [],
//   showNull: false,
//   showNullButton: false,
//   byDefault: false,
//   with_image: false,
//   insurances: {
//     BodyInsurance: false,
//     ThirdPartyInsurance: false,
//     CarAccidentInsurance: false,
//     InternationalCarInsurance: false,
//   },
//   mapData: {
//     longitude: 35.6892,
//     latitude: 51.389,
//   },
//   distance: -1,
//   sort: "",
//   ascending: true,
// };

export const filter = createSlice({
  name: "filter",
  initialState,
  reducers: {
    ADD_INSURANCE: (state, { payload }) => {
      state.insurances[payload.name] = payload.value;
      state.showNullButton = true;
    },

    ADD_BRAND: (state, { payload }) => {
      state.showNullButton = true;
      let arr = [];
      if (Array.isArray(payload)) {
        payload?.map((item) => {
          return arr.push(item.value);
        });
      } else {
        arr.push(payload);
      }
      let uniqueItems = [...new Set(arr)];
      state.brand = uniqueItems;

      if (Array.isArray(payload) && payload.length === 0) {
        state.brand = [];
      }
    },
    ADD_MODEL: (state, actions) => {
      state.showNullButton = true;
      if (Array.isArray(actions.payload)) {
        state.model.push(actions.payload[0]);
      } else {
        state.model.push(actions.payload);
      }
    },
    ADD_TYPE: (state, actions) => {
      state.showNullButton = true;
      if (Array.isArray(actions.payload)) {
        state.type.push(actions.payload[0]);
      } else {
        state.type.push(actions.payload);
      }
    },
    REMOVED_MODEL: (state, actions) => {
      state.showNullButton = true;
      state.model = [];
      if (actions.payload.length > 0) {
        state.model = actions.payload;
      }
    },
    REMOVED_BRAND: (state, actions) => {
      state.showNullButton = true;
      state.brand = [];
      if (actions.payload.length > 0) {
        state.brand = actions.payload;
      }
    },
    REMOVED_TYPE: (state, actions) => {
      state.showNullButton = true;
      state.type = [];
      if (actions.payload.length > 0) {
        state.type = actions.payload;
      }
    },
    ADD_MIN_PRICE: (state, { payload }) => {
      state.showNullButton = true;
      state.byDefault = false;
      state.min_price = payload * 1000000;
      if (payload == -1) {
        state.min_price = payload;
      }
    },
    ADD_MAX_PRICE: (state, { payload }) => {
      state.showNullButton = true;
      state.byDefault = false;
      state.max_price = payload * 1000000;
      if (payload == -1) {
        state.max_price = -1;
      }
    },
    ADD_MIN_MILEAGE: (state, { payload }) => {
      state.showNullButton = true;
      state.min_Mileage = +payload;
      state.byDefault = false;
    },
    ADD_WITH_IMAGE: (state, { payload }) => {
      state.showNullButton = true;
      state.with_image = payload;
    },
    ADD_MAX_MILEAGE: (state, { payload }) => {
      state.showNullButton = true;
      state.max_Mileage = +payload;
      state.byDefault = false;
    },
    ADD_MIN_YEAR_MANUFACTURE: (state, { payload }) => {
      state.showNullButton = true;
      state.byDefault = false;
      state.min_year_of_manufacture = +payload;
    },
    ADD_MAX_YEAR_MANUFACTURE: (state, { payload }) => {
      state.showNullButton = true;
      state.byDefault = false;
      state.max_year_of_manufacture = +payload;
    },

    ADD_COLORS: (state, { payload }) => {
      state.showNullButton = true;
      state.colors.push(payload);
    },
    REMOVE_COLOR: (state, { payload }) => {
      state.showNullButton = true;
      const index = state.colors.findIndex((object) => {
        return object === payload;
      });
      state.colors.splice(index, 1);
    },

    ADD_CARDAMAGE: (state, { payload }) => {
      state.showNullButton = true;
      let arr = [];
      payload?.map((item) => {
        return arr.push(item.value);
      });
      let uniqueItems = [...new Set(arr)];
      state.carDamage = uniqueItems;
    },
    ADD_GEAR_BOX_TYPES: (state, { payload }) => {
      state.showNullButton = true;
      state.gear_box_types.push(payload);
    },
    REMOVED_GEAR: (state, { payload }) => {
      state.showNullButton = true;
      const index = state.gear_box_types.findIndex((object) => {
        return object === payload;
      });
      state.gear_box_types.splice(index, 1);
    },
    ADD_FUEL_TYPES: (state, { payload }) => {
      state.showNullButton = true;
      state.fuel_types.push(payload);
    },
    REMOVED_FUEL: (state, { payload }) => {
      state.showNullButton = true;
      const index = state.fuel_types.findIndex((object) => {
        return object === payload;
      });
      state.fuel_types.splice(index, 1);
    },
    SET_SHOW_NULL: (state, { payload }) => {
      state.showNull = payload;
    },
    PREVIEW_DATA: (state, { payload }) => {
      state.showNullButton = true;
      state.previewData = payload;
    },
    SHOW_NULL_BUTTON: (state, { payload }) => {
      state.showNullButton = true;
      state.showNullButton = payload;
    },
    ADD_MAP_DATA: (state, { payload }) => {
      state.showNullButton = true;
      state.mapData = payload;
    },
    ADD_DISTANCE: (state, { payload }) => {
      state.showNullButton = true;
      state.distance = payload;
    },
    ADD_SORT: (state, { payload }) => {
      state.showNullButton = true;
      state.sort = payload.sort;
      state.ascending = Boolean(payload.ascending);
    },
    SET_SHOW_CAR: (state, { payload }) => {
      state.shownCars.push(payload);
    },
    REMOVE_SHOW_CAR: (state, { payload }) => {
      state.shownCars = payload;
    },
    REMOVE_ALL: (state, { payload }) => {
      state.brand = [];
      state.shownCars = [];
      state.model = [];
      state.type = [];
      state.min_price = -1;
      state.max_price = -1;
      state.min_Mileage = -1;
      state.max_Mileage = -1;
      state.colors = [];
      state.carDamage = [];
      state.gear_box_types = [];
      state.fuel_types = [];
      state.min_year_of_manufacture = -1;
      state.max_year_of_manufacture = -1;
      state.previewData = [];
      state.showNull = false;
      state.showNullButton = false;
      state.byDefault = false;
      state.with_image = false;
      state.insurances.BodyInsurance = false;
      state.insurances.ThirdPartyInsurance = false;
      state.insurances.CarAccidentInsurance = false;
      state.insurances.InternationalCarInsurance = false;
      state.mapData.longitude = 51.389;
      state.mapData.latitude = 35.6892;
      state.distance = -1;
      state.sort = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  PREVIEW_DATA,
  SET_SHOW_NULL,
  REMOVED_TYPE,
  REMOVED_BRAND,
  ADD_WITH_IMAGE,
  ADD_FUEL_TYPES,
  ADD_GEAR_BOX_TYPES,
  ADD_COLORS,
  ADD_CARDAMAGE,
  ADD_MAX_YEAR_MANUFACTURE,
  ADD_MIN_YEAR_MANUFACTURE,
  ADD_MAX_MILEAGE,
  ADD_MIN_MILEAGE,
  ADD_MAX_PRICE,
  ADD_MIN_PRICE,
  ADD_MODEL,
  REMOVED_MODEL,
  REMOVED_GEAR,
  ADD_BRAND,
  ADD_TYPE,
  REMOVED_FUEL,
  SHOW_NULL_BUTTON,
  REMOVE_ALL,
  ADD_INSURANCE,
  ADD_MAP_DATA,
  SET_SHOW_CAR,
  ADD_DISTANCE,
  ADD_SORT,
  REMOVE_COLOR,
  REMOVE_SHOW_CAR,
} = filter.actions;

export const filterSelector = (state: RootState) => state.filter;

export default filter.reducer;
