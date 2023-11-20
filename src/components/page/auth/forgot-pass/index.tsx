"use client";
import { PasswordInput } from "@/attom/form@/components@/inputs/password-input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import OTPCode from "@/page/auth/components/otp-code";
import { forgotPass } from "@/redux/auth/auth-actions";
import { forgotPassSelector } from "@/redux/auth/forgot-pass/forgot-pass-slice";
import { checkExistWindow } from "@/utils/check-exist-window";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RegexValidation from "../components/regex-validation";

const ForgotPassPage = () => {
  const [otp, setOtp] = useState();
  const router = useRouter();
  const initialValues = {
    password: "",
  };
  let phone_number =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("phone_number") ?? "");

  const { forgot_pass_success, forgot_pass_loading, forgot_pass_error } =
    useAppSelector(forgotPassSelector);
  const dispatch = useAppDispatch();

  const editPhoneNumber = () => {
    router.push("/auth/check");
  };

  const onSubmit = (values: any) => {
    dispatch(
      forgotPass({
        phone_number: phone_number,
        password: values.password,
        verify_code: otp,
      })
    );
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  useEffect(() => {
    if (forgot_pass_success) {
      router.push("/");
    }
  }, [forgot_pass_success]);

  return (
    <>
      <div className="border-b-gray border-b pb-2 w-fit px-8 mx-auto">
        <h2 className="font-bold text-xl block text-center">تغییر رمز عبور</h2>
        <span className="text-gray-400 text-sm mt-4 ltr block text-center">
          {phone_number}
        </span>
      </div>
      <button
        onClick={editPhoneNumber}
        className="underline text-blue text-xs text-center mt-2 mx-auto block"
      >
        اصلاح شماره همراه
      </button>
      <form onSubmit={formik.handleSubmit}>
        {/* وارد کردن کد پیامک شده */}
        <OTPCode setOtp={setOtp} />

        <PasswordInput
          formik={formik}
          label="رمز عبور را تعیین کنید"
          name="password"
        />

        <RegexValidation formik={formik} />

        <button
          type="submit"
          className="bg-blue text-white rounded-lg w-full py-3 px-4 mt-4"
          disabled={forgot_pass_loading}
        >
          ورود
          {forgot_pass_loading && <LinearProgress />}
        </button>

        {forgot_pass_error && (
          <span className="text-xs text-red-500 block text-center mt-2">
            متاسفانه خطایی رخ داده است.
          </span>
        )}
      </form>
    </>
  );
};

export default ForgotPassPage;
