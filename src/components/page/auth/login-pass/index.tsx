"use client";
import { postAuthLoginRequest } from "@/apis/authentication@";
import { PasswordInput } from "@/attom/form@/components@/inputs/password-input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { loginPass, sendCode } from "@/redux/auth/auth-actions";
import { loginSelector } from "@/redux/auth/login/login-slice";
import { checkExistWindow } from "@/utils/check-exist-window";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { LoginPassInitialValues } from "./form/initial-values";
import { LoginPassValidationSchema } from "./form/validation-schema";
import { SubmitValuesType } from "./type";
import { SendCodeSelector } from "@/redux/auth/send-code/send-code-slice";
import getSecondsAndMinutes from "@/utils/get-seconds-and-minutes";

const LoginByPass = () => {
  // @@@___________________ Phone number ___________________@@@
  const phone_number =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("phone_number") ?? "");

  // @@@___________________ use Dispatch ___________________@@@
  const dispatch = useAppDispatch();

  // @@@___________________ use Router ___________________@@@
  const router = useRouter();

  // @@@___________________ Login selector ___________________@@@
  const { login_pass_error, login_pass_success, login_pass_loading } =
    useAppSelector(loginSelector);

  // @@@___________________ Formik onSubmit ___________________@@@
  const onSubmit = (values: SubmitValuesType) => {
    dispatch(
      loginPass({
        phone_number: phone_number,
        password: values.password,
      })
    );
  };

  // @@@___________________ use Formik ___________________@@@
  const formik = useFormik({
    initialValues: LoginPassInitialValues,
    validationSchema: LoginPassValidationSchema,
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });

  // @@@___________________ ForgotPassword ___________________@@@
  const forgotPassHandler = () => {
    postAuthLoginRequest(phone_number)
      .then(() => {
        router.push("/auth/forgot-pass");
      })
      .catch(({ response }) => {
        const message =
          response.status == 400
            ? response.data.Duration
              ? `به علت ۱۰ تلاش ناموفق، دسترسی به مدت ${getSecondsAndMinutes(
                  response?.data.Duration
                )} مسدود می‌شود.`
              : "نام کاربری یا رمز عبور اشتباه است"
            : "متاسافانه خطایی رخ داده است.";

        toast.error(message);
      });
  };

  useEffect(() => {
    if (login_pass_success) {
      router.push("/");
    }
  }, [login_pass_success]);

  return (
    <>
      <h2 className="font-bold text-xl block text-center mb-5">ورود</h2>

      <form onSubmit={formik.handleSubmit}>
        <PasswordInput
          formik={formik}
          label="رمز عبور خود را وارد نمایید"
          name="password"
        />

        {login_pass_error.message && (
          <span className="mt-2 block text-center text-sm font-medium text-red-500">
            {login_pass_error.message}
          </span>
        )}
        <button
          className={`bg-blue text-white py-2 rounded-md w-full text-lg mt-5 ${
            login_pass_loading && "cursor-not-allowed"
          }`}
          type="submit"
          disabled={login_pass_loading}
        >
          ورود
          {login_pass_loading && <LinearProgress />}
        </button>
      </form>
      <button
        onClick={forgotPassHandler}
        type="button"
        className="mt-2 block text-sm text-left w-full pl-2 text-gray-600"
      >
        رمز عبود خود را فراموش کرده‌اید؟
      </button>
    </>
  );
};

export default LoginByPass;
