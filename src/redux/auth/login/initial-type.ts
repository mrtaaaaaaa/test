export interface InitialType {
  loading: boolean | null;
  login_pass_error: {
    message: string | null,
    code: number | null
  };
  login_pass_success: boolean | null;
  login_OTP_success: boolean | null;
  login_OTP_error: boolean | null;
  [name: string | number]: any;
}
