import { InitialType } from "./initial-type";

export const initialState: InitialType = {
  login_pass_loading: false,
  loading: false,
  login_pass_error: {
    message: "",
    code : null
  },
  login_pass_success: null,
  login_OTP_success: null,
  login_OTP_error: null,
};
