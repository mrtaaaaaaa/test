import { PasswordInput } from "@/attom/form@/components@/inputs/password-input";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { registerUser } from "@/redux/auth/auth-actions";
import { registerSelector } from "@/redux/auth/register/register-slice";
import { checkExistWindow } from "@/utils/check-exist-window";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import RegexValidation from "../../../components/regex-validation";
import { RegisterFormInitValues } from "./initial-values";
import { RegisterFormValidationSchema } from "./validation-schema";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";

const RegisterForm = (otp: string) => {
  // @@@___________________ phone_number ___________________@@@
  const phone_number =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("phone_number") ?? "");

  // @@@___________________ RegisterSelector ___________________@@@
  const { register_error, register_loading } = useSelector(registerSelector);

  // @@@___________________ useDispatch ___________________@@@
  const dispatch = useAppDispatch();

  // @@@___________________ formik handle Submit ___________________@@@
  const onSubmit = (values) => {
    const postData = {
      phone_number: phone_number,
      first_name: values.first_name,
      last_name: values.last_name,
      password: values.password,
      verify_code: otp.otp,
    };

    dispatch(registerUser(postData));
  };

  // @@@___________________ use Formik ___________________@@@
  const formik = useFormik({
    initialValues: RegisterFormInitValues,
    validationSchema: RegisterFormValidationSchema,
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
        <div>
          <PasswordInput formik={formik} label="رمز عبور" name="password" />
          <RegexValidation formik={formik} />
        </div>

        <FormInput
          formik={formik}
          label=" نام"
          name="first_name"
          placeholder="نام"
        />

        <FormInput
          formik={formik}
          label=" نام‌خانوادگی"
          name="last_name"
          placeholder="نام‌خانوادگی"
        />

        <button
          className={`bg-blue text-white py-2 rounded-md w-full disabled:cursor-not-allowed disabled:bg-[#B8C7F5] font-light text-lg ${
            register_loading && " cursor-not-allowed"
          }`}
          type="submit"
          disabled={register_loading}
        >
          ثبت نام
          {register_loading && <LinearProgress />}
        </button>
      </form>

      {register_error.message && (
        <span className="mt-2 block text-center text-sm font-medium text-red-500">
          {register_error.message}
        </span>
      )}
    </>
  );
};

export default RegisterForm;
