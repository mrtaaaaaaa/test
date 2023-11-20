"use client";

import { postAuthRequestLoginAPI } from "@/apis/authentication@";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { icons } from "@/data";
import { regexPhoneNumber } from "@/utils/regex";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { FormValuesType, StatusStateType } from "./type";
import getSecondsAndMinutes from "@/utils/get-seconds-and-minutes";

export default function CheckUserIsLogin() {
  const [status, setStatus] = useState<StatusStateType>({
    loading: false,
    error: {
      message: "",
    },
  });

  const router = useRouter();

  let initialValues: FormValuesType = {
    phone_number: "",
  };

  const validationSchema = Yup.object().shape({
    phone_number: Yup.string()
      .matches(regexPhoneNumber, "شماره تماس صحیح نیست")
      .required("شماره تماس الزامی است"),
  });

  const onSubmit = (values: any) => {
    setStatus({
      loading: true,
      error: {
        message: "",
      },
    });

    postAuthRequestLoginAPI(values.phone_number)
      .then((res) => {
        let response = res.data;

        localStorage.setItem(
          "phone_number",
          JSON.stringify(values.phone_number)
        );

        setStatus({
          loading: false,
          error: {
            message: "",
          },
        });

        if (response.users) {
          router.push("/auth/login-pass");
        } else {
          router.push("/auth/register");
        }
      })
      .catch((err) => {
        setStatus({
          loading: false,
          error: {
            message: err.response.data.error
              ? "به علت تعداد ۱۰ تلاش ناموفق، دسترس به مدت ... مسدود می‌شود."
              : "متاسفانه خطایی رخ داده است",
          },
        });
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });

  return (
    <>
      <h2 className="font-bold text-xl block text-center mb-5">
        ورود | ثبت‌نام
      </h2>
      <form className="w-full" onSubmit={formik.handleSubmit}>
        <FormInput
          formik={formik}
          label="شماره موبایل خود را وارد کنید"
          name="phone_number"
          type="text"
          classNames="w-full ltr text-left bg-white"
          classes="bg-white rtl"
        />

        <button
          className={`bg-blue text-white py-2 rounded-md w-full font-light text-lg mt-5 disabled:bg-[#B8C7F5] disabled:cursor-not-allowed ${
            status.loading && " cursor-not-allowed"
          }`}
          type="submit"
          disabled={!(String(formik.values.phone_number).length == 11)}
        >
          مرحله بعد
          {status.loading && <LinearProgress />}
        </button>
        <span className="mt-5 block text-center text-xs font-light">
          ورود شما به معنای پذیرش{" "}
          <span className="font-bold text-blue border-b border-blue">
            شرایط اُتو
          </span>{" "}
          است
        </span>

        {status.error.message && (
          <span className="mt-2 block text-center text-sm font-medium text-red-500">
            {status.error.message}
          </span>
        )}
      </form>
    </>
  );
}
