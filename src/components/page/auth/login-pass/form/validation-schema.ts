import * as Yup from "yup";

// @@@___________________ Formik validationSchema ___________________@@@
export const LoginPassValidationSchema = Yup.object({
  password: Yup.string()
    .required("ورود گذرواژه الزامی است.")
    .min(8, "رمز عبور نباید کمتر از ۸ کاراکتر باشد.")
    .matches(/[a-z]/, "صفحه کلید را به انگلیسی تغییر دهید"),
});
