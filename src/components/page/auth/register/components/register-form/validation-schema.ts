import * as Yup from "yup";

export  const RegisterFormValidationSchema = Yup.object({
    first_name: Yup.string().required("درج نام الزامی است."),
    last_name: Yup.string().required("درج نام‌خانوادگی الزامی است."),
    password: Yup.string().required("گذرواژه الزامی است."),
  });