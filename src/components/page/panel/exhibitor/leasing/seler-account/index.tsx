"use client";

import {
  PostExhibitorLeasingChangeStatus,
  postExhibitorLeasingSellerAccount,
} from "@/apis/panel/exhibitor";
import DatePickerInput from "@/attom/form@/components@/date-picker/date-picker-input";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import ExhibitorStatusAlert from "@/attom/alerts/exhibitor-status-alert";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import {
  regexNationalCode,
  regexNumber,
  regexPersianCharacter,
  regexPhoneNumber,
} from "@/utils/regex";
import * as Yup from "yup";

const SellerAccountNumber = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: "",
    status: "",
    title: "",
  });
  // Formik initialValues
  const initialValues = {
    exhibitor_leasing_id: id,
    car_owner_info_name: "",
    car_owner_info_family: "",
    car_owner_info_national_code: "",
    car_owner_info_father_name: "",
    car_owner_info_birth_date_year: "",
    car_owner_info_birth_date_month: "",
    car_owner_info_birth_date_day: "",
    car_owner_info_mobile_number: "",
    car_owner_info_seller_account: "",
    car_owner_info_bank_name: "",
    car_owner_info_bank_branch: "",
  };

  const validationSchema = Yup.object({
    car_owner_info_name: Yup.string()
      .required("نام الزامی است.")
      .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),
    car_owner_info_family: Yup.string()
      .required("نام خانوادگی الزامی است.")
      .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),
    car_owner_info_father_name: Yup.string()
      .required("نام پدر الزامی است.")
      .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),
    car_owner_info_national_code: Yup.string()
      .required("کد ملی الزامی است.")
      .matches(regexNationalCode, "کدملی وارد شده صحیح نیست."),
    car_owner_info_birth_date_year: Yup.string().required(
      "تاریخ تولد الزامی است."
    ),
    car_owner_info_mobile_number: Yup.string()
      .required("تلفن همراه الزامی است.")
      .matches(regexPhoneNumber, "تلفن همراه وارد شده صحیح نیست."),
    car_owner_info_seller_account: Yup.string().matches(regexNumber, "مقدار وارد شده صحیح نیست").required(
      "شماره شبا الزامی است."
    ),
    car_owner_info_bank_name: Yup.string().matches(regexPersianCharacter, 'مقدار وارد شده صحیح نیست.').required("نام بانک الزامی است."),
    car_owner_info_bank_branch: Yup.string().matches(regexPersianCharacter, 'مقدار وارد شده صحیح نیست.').required("نام شعبه الزامی است."),
  });

  // Formik onSubmit
  const onSubmit = (values) => {
    setLoading(true);

    const postData = new FormData();

    const valuesObject = Object.entries(values).map(([key, value]) =>
      postData.append([key], value)
    );

    postExhibitorLeasingSellerAccount(postData)
      .then((res) => {
        const changeStatusData = new FormData();

        changeStatusData.append("exhibitor_leasing_id", id);
        changeStatusData.append("reason", "");
        changeStatusData.append("condition", "در انتظار ارسال قرارداد");

        PostExhibitorLeasingChangeStatus(changeStatusData)
          .then(() => {
            setShowAlert({
              show: true,
              status: true,
              title: "ثبت اطلاعات با موفقیت انجام شد",
            });
            setLoading(false);
          })
          .catch(() => {
            setShowAlert({
              show: true,
              status: false,
              title: "متاسفانه خطایی رخ داده است.",
            });
            setLoading(false);
          });
      })
      .catch(() => {
        setShowAlert({
          show: true,
          status: false,
          title: "متاسفانه خطایی رخ داده است.",
        });
      });
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="border border-gray-200 rounded-lg p-4 ">
      <h1 className="font-bold text-xl mb-4 text-blue border-b border-b-gray-200 pb-4 w-full">
        اطلاعات فروشنده
      </h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col">
        <div className="mt-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          <FormInput formik={formik} label="نام" name="car_owner_info_name" />
          <FormInput
            formik={formik}
            label="نام‌خانوادگی"
            name="car_owner_info_family"
          />
          <FormInput
            formik={formik}
            label="نام پدر"
            name="car_owner_info_father_name"
          />
          <FormInput
            formik={formik}
            label="کد ملی"
            name="car_owner_info_national_code"
          />

          <DatePickerInput
            formik={formik}
            label={"تاریخ تولد"}
            nameObject={{
              car_owner_info_birth_date_year: "",
              car_owner_info_birth_date_month: "",
              car_owner_info_birth_date_day: "",
            }}
            name="car_owner_info_birth_date_year"
          />
          <FormInput
            formik={formik}
            label="تلفن همراه"
            name="car_owner_info_mobile_number"
          />

          <div className="lg:col-span-2">
            <div className="flex items-center gap-1 mb-4">
              <RiErrorWarningFill color="#EB6E02" />
              <span className="text-sm">
                شماره حساب فروشنده خودرو را جهت واریز وجه وارد نمایید.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FormInput
                formik={formik}
                label="شماره شبا"
                name="car_owner_info_seller_account"
                type="number"
                classNames="w-full"
              />
              <span className="text-gray block">IR</span>
            </div>
          </div>
        </div>
        <div className="mt-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          <FormInput
            formik={formik}
            label="نام بانک"
            name="car_owner_info_bank_name"
          />
          <FormInput
            formik={formik}
            label="نام شعبه"
            name="car_owner_info_bank_branch"
          />
        </div>

        <button
          className={`bg-blue text-white px-16 py-2 rounded-lg mr-auto text-sm mt-4 ${
            loading && "cursor-not-allowed"
          }`}
          type="submit"
        >
          ثبت اطلاعات
          {loading && <LinearProgress />}
        </button>
      </form>
      .
      {showAlert.show && (
        <ExhibitorStatusAlert
          open={showAlert.show}
          setOpen={setShowAlert}
          status={showAlert.status}
          title={showAlert.title}
        />
      )}
    </div>
  );
};

export default SellerAccountNumber;
