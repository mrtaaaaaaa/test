
'use client'
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";
import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";
import { useFormik } from "formik";
import { useState } from "react";
import { Puff } from "react-loading-icons";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function SendMessagePage() {
  const [loading, setLoading] = useState(false);

  // Formik InitilaValues
  let initialValues = {
    phoneNumber: "",
    message: "",
  };

  // Validation Schema
  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required("درج شماره تماس الزامی است.")
      .matches(/^[0-9]+$/, "شماره وارد شده صحیح نیست")
      .min(11, "شماره وارد شده صحیح نیست")
      .max(11, "شماره وارد شده صحیح نیست"),
    message: Yup.string().required("متن پیامک الزامی است."),
  });

  // OnSubmit form for sending smsm
  const onSubmit = (values) => {
    setLoading(true);
    let data = {
      destination: values.phoneNumber,
      message: values.message,
    };
    httpService
      .post(`${AUTH_URL}/Sms`, data)
      .then(() => {
        toast.success(
          `پیامک شما برای شماره تماس ${formik.values.phoneNumber} ارسال شد`
        );
        setLoading(false);

        formik.setValues({
          phoneNumber: "",
          message: "",
        });
      })
      .catch(() => {
        setLoading(false);
        toast.error("مشکلی در ارسال پیامک بوجود آمده‌است");

        formik.setValues({
          phoneNumber: "",
          message: "",
        });
      });
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });

  return (
    <>
      <h1 className="font-bold text-lg mb-4">ارسال پیامک</h1>
      <div className="custom-shadow p-4 rounded-md">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-4">
            <FormInput
              formik={formik}
              label="شماره تماس"
              name="phoneNumber"
              placeholder="09190979755"
              type="text"
            />
            <CustomTextarea
              formik={formik}
              label="متن پیام"
              name="message"
              placeholder="متن پیام"
              customClass="lg:col-span-2"
            />
          </div>

          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="mt-8 bg-blue  text-white px-4 py-2 font-bold rounded w-fit disabled:bg-gray-border disabled:text-gray-dark disabled:cursor-not-allowed"
              disabled={loading ? true : false}
            >
              {loading ? (
                <Puff stroke="#FFF" strokeOpacity={0.8} />
              ) : (
                " ارسال پیام"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
