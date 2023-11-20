"use client";
import {
  postAuthChangePassword,
  postAuthRequestChangePassword,
} from "@/apis/authentication@";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { PasswordInput } from "@/attom/form@/components@/inputs/password-input";
import { useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/redux/auth/auth-Slice";
import { checkExistWindow } from "@/utils/check-exist-window";
import { parseJwt } from "@/utils/jwt";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function ChangePassword() {
  const { userInfo } = useAppSelector(authSelector);
  const userToken =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("userToken") ?? "{}");
  const { roles } = userToken
    ? parseJwt(
        checkExistWindow() &&
          JSON.parse(window.localStorage.getItem("userToken") ?? "{}")
      )
    : { roles: [] };

  const [showPassInput, setShowPassInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // InitialValues in formik
  let initialValues = {
    verification_code: "",
    password: "",
  };

  // Request sending sms
  const requestSetPassHandleClick = () => {
    setLoading(true);
    const postData = {
      phone_number: userInfo.phone_number,
    };

    postAuthRequestChangePassword(postData)
      .then(() => {
        setShowPassInput(true);
        setLoading(false);
      })
      .catch(() => {
        toast.error("متاسفانه خطایی رخ داده است.");
        setLoading(false);
      });
  };

  // Click handler for changing password
  const onSubmit = (values: any) => {
    const postData = {
      phone_number: userInfo.phone_number,
      verify_code: Number(values.verification_code),
      password: values.password,
    };

    postAuthChangePassword(postData)
      .then(() => {
        toast.success("درخواست تغییر گذرواژه با موفقیت انجام شد");
        setShowPassInput(false);
        router.push(`/panel/${roles?.[0]}/info`);
      })
      .catch(() => {
        toast.error("متاسفانه خطایی رخ داده است");
        initialValues = {
          verification_code: "",
          password: "",
        };
      });
  };

  // ValidationSchema
  const validationSchema = Yup.object({
    verification_code: Yup.number().required("وارد کردن کد الزامی است"),
    password: Yup.string()
      .required("ورود گذرواژه الزامی است.")
      .min(8, "حداقل ۸ کاراکتر")
      .matches(/[a-z]/, "حروف کوچک انگلیسی")
      .matches(/[A-Z]/, "حروف بزرگ انگلیسی")
      .matches(/[0-9]/, "شامل عدد")
      .matches(/[^\w]/, "نشانه!@#$"),
  });

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <h1 className="font-bold text-xl mb-4 text-blue">تغییر گذرواژه</h1>
      {showPassInput ? (
        <form onSubmit={formik.handleSubmit}>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
            <FormInput
              formik={formik}
              label="کد ارسال شده"
              name="verification_code"
              type="number"
            />
            <PasswordInput
              formik={formik}
              name="password"
              label="گذرواژه جدید"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue text-white px-4 py-2 rounded-md"
          >
            ثبت
          </button>
        </form>
      ) : (
        <div className="flex flex-wrap gap-2 items-end">
          <div className="flex flex-col relative md:w-1/4 w-full">
            <label
              className="mb-2 block absolute right-3 -top-2 bg-white pr-2 pl-6 text-blue"
              style={{ fontSize: "12px" }}
            >
              شماره تماس
            </label>
            <input
              type="text"
              className="border bg-white border-[#C4C4C4] text-right rounded-lg py-2 px-2 w-full md:truncate h-[43px] text-xs"
              disabled
              value={userInfo.phone_number}
            />
          </div>
          <button
            onClick={requestSetPassHandleClick}
            className={`bg-blue text-sm text-white px-4 py-3 rounded-md h-full ${
              loading && "cursor-not-allowed"
            }`}
            disabled={loading}
          >
            درخواست تغییر گذرواژه
            {loading && <LinearProgress sx={{ color: "#fff" }} />}
          </button>
        </div>
      )}
    </>
  );
}
