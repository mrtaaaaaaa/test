import { Dispatch, SetStateAction } from "react";

export interface MainPageFilterPropsType {
  models: any;
  classes: string;
  setShowFilter: Dispatch<SetStateAction<boolean | null>>;
  showFilter: boolean | null;
  showMileAge?: boolean;
  colors: {
    value: string;
    label: string;
  }[];
}

export interface StatusType {
  loading: null | boolean;
  error: null | boolean;
}
