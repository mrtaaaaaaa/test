export interface StatusStateType {
  loading: boolean;
  error: {
    message: string,
  };
}

export interface FormValuesType {
  phone_number: string | number;
}
