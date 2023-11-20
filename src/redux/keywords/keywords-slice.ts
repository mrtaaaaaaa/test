import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./inital-state";
import { InitialType } from "./initial-type";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const keyword = createSlice({
  name: "keyword",
  initialState,
  reducers: {
    ADD_KEYWORD: (state: InitialType, { payload }) => {
      state.keywords = payload;
    },
    REMOVE_KEYWORD: (state: InitialType) => {
      state.keywords = "";
    },
  },
});

export const { ADD_KEYWORD, REMOVE_KEYWORD } = keyword.actions;

export const keywordSelector = (state: RootState) => state.keywords;

export default keyword.reducer;
