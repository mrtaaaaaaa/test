import { InitialType } from "./initial-type";

export const initialState: InitialType = {
  register_loading: false,
  register_error: {
    message: "",
    code : null
  },
  register_success: null,
  otp:""
};
