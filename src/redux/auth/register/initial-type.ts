export interface InitialType {
  register_loading: boolean;
  register_error: {
    message: string;
    code: null;
  };
  register_success: null | boolean;
  [name: string | number]: any;
  otp: string;
}
