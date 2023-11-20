import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initial-state";
import { RootState } from "../store";

export const exhibitorSlice = createSlice({
  name: "exhibitor",
  initialState,
  reducers: {
    SET_USERS_LEASING_DATA: (state, { payload }) => {
        
      state.usersLeasingData = payload;
    },
  },
});

export const { SET_USERS_LEASING_DATA } = exhibitorSlice.actions;

export const exhibitorSelector = (state: RootState) => state.exhibitor;

export default exhibitorSlice.reducer;
