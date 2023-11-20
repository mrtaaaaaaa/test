import { postAuthExhibitorRegisterAPI } from "@/apis/authentication@";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { PasswordInput } from "@/attom/form@/components@/inputs/password-input";
import { useAppDispatch } from "@/hooks/redux-hooks";
import RegexValidation from "@/page/auth/components/regex-validation";
import { RegisterFormInitValues } from "@/page/auth/register/components/register-form/initial-values";
import { RegisterFormValidationSchema } from "@/page/auth/register/components/register-form/validation-schema";
import { checkExistWindow } from "@/utils/check-exist-window";
import { Form, useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";

interface PropTypes {
  setShowStepper: any;
  otp: number;
}

export default function UserpersonalInfoPass({
  otp,
  setShowStepper,
}: PropTypes) {
  const phone_number =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("phone_number") ?? "");

  const onSubmit = (values: any) => {
    let formData = new FormData();
    formData.append("verify_code", otp);
    formData.append("phone_number", phone_number);
    Object.entries(values).map(([key, value]) => formData.append([key], value));
    setShowStepper(true);
    postAuthExhibitorRegisterAPI(formData)
      .then((res) => {
        if (res.status == 200) {
          toast.success("ثبت نام شما با موفقیت انجام شد.");

          checkExistWindow() &&
            localStorage.setItem("userInfo", JSON.stringify(res.data));
          checkExistWindow() &&
            localStorage.setItem(
              "userToken",
              JSON.stringify(res.data.Authorization)
            );
          setShowStepper(true);
        }
      })
      .catch(() => {
        toast.error("ثبت نام با خطا مواجه شد.");
      });
  };

  const formik = useFormik({
    initialValues: RegisterFormInitValues,
    validationSchema: RegisterFormValidationSchema,
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });
  return (
    <form className="flex flex-col items-center" onSubmit={formik.handleSubmit}>
      <div>
        <PasswordInput formik={formik} label="رمز عبور" name="password" />
        <RegexValidation formik={formik} />
      </div>

      <div className="flex items-center gap-8 mt-8">
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
      </div>
      <button
        type="submit"
        className="bg-blue rounded-md mt-5 w-60 px-8 py-2 text-white"
      >
        مرحله بعد
      </button>
    </form>
  );
}
