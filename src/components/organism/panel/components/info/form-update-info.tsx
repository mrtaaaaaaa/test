"use client";

import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { SelectBox } from "@/attom/form@/components@/select@/select-box";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";
import { AUTH_URL } from "@/config/url";
import { authSelector } from "@/redux/auth/auth-Slice";
import {
  SET_MODAL_SITUATION,
  editSliceSelector,
} from "@/redux/edit-personal-info/edit-personal-info-slice";
import httpService from "@/services/http-service";
import { checkExistWindow } from "@/utils/check-exist-window";
import { regexEmail, regexNationalCode } from "@/utils/regex";
import { Box, LinearProgress, Modal } from "@mui/material";
import { useFormik } from "formik";
import moment from "jalali-moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAppSelector } from "src/hooks/redux-hooks";
import * as Yup from "yup";
import { InitialType } from "./form-update-info-type";
import DatePickerInput from "@/attom/form@/components@/date-picker/date-picker-input";

const gender = [
  { value: "مرد", label: "مرد" },
  { value: "زن", label: "زن" },
];

const FormUpdateInfo = () => {
  const dispatch = useDispatch();
  const editInfo = useAppSelector(editSliceSelector);
  const userInfo = useAppSelector(authSelector);

  const [status, setStatus] = useState({ loading: false, error: false });

  let initialValues: InitialType = {
    name: editInfo.data.first_name,
    last_name: editInfo.data.last_name,
    gender: editInfo.data.gender,
    career: editInfo.data.job,

    day_of_birth: +editInfo.data.day_of_birth,
    month_of_birth: +editInfo.data.month_of_birth,
    year_of_birth: +editInfo.data.day_of_birth,
    national_code: editInfo.data.national_code,
    email: editInfo.data.email,
    postal_code: editInfo.data.postal_code,
    address: editInfo.data.address,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("درج نام الزامی است.")
      .matches(/^[\u0600-\u06FF\s]+$/, "مقدار وارد شده صحیح نیست."),
    last_name: Yup.string()
      .required("درج نام‌خانوادگی الزامی است.")
      .matches(/^[\u0600-\u06FF\s]+$/, "مقدار وارد شده صحیح نیست."),
    postal_code: Yup.string().length(10, "کدپستی صحیح نیست. "),
    national_code: Yup.string().matches(regexNationalCode, "کد ملی صحیح نیست."),
    career: Yup.string().matches(
      /^[\u0600-\u06FF\s]+$/,
      "صفحه کلید را به فارسی تغییر دهید."
    ),
    email: Yup.string().matches(regexEmail, "ایمیل صحیح نیست."),
    address: Yup.string().max(1230, "تعداد حروف بیش‌تر از حرف مجاز است."),
  });

  const closeModalHandler = () => dispatch(SET_MODAL_SITUATION(false));

  interface DateTypes {
    day: string | number;
    month: string | number;
    year: string | number;
  }

  function checkAge({ day, month, year }: DateTypes) {
    return (
      moment().diff(
        moment(`${year}/${month}/${day}`, "jYYYY/jM/jD"),
        "years"
      ) >= 18
    );
  }

  const onSubmit = (values: InitialType) => {
    if (
      !checkAge({
        day: editInfo?.data?.day_of_birth,
        month: editInfo?.data?.month_of_birth,
        year: editInfo?.data?.year_of_birth,
      })
    ) {
      toast.error(" حداقل سن مجاز برای ثبت‌نام 18 سال است.");
      return;
    }

    setStatus({ ...status, loading: true });

    let data = {
      user_name:
        userInfo.phone_number ??
        (checkExistWindow() &&
          JSON.parse(window.localStorage.getItem("userInfo") ?? "{}")
            ?.phone_number),
      phone_number:
        userInfo.phone_number ??
        (checkExistWindow() &&
          JSON.parse(window.localStorage.getItem("userInfo") ?? "{}")
            ?.phone_number),
      first_name: values.name,
      last_name: values.last_name,
      gender: values.gender,
      job: values.career,
      year_of_birth: editInfo.data.year_of_birth ?? 0,
      month_of_birth: editInfo.data.month_of_birth ?? 0,
      day_of_birth: editInfo.data.day_of_birth ?? 0,
      email: values.email,
      national_code: String(values.national_code),
      postal_code: values.postal_code,
      address: values.address,
    };

    httpService
      .post(`${AUTH_URL}/Auth/User/Update`, data)
      .then(() => {
        toast.success("ویرایش اطلاعات با موفقیت انجام شد");
        dispatch(SET_MODAL_SITUATION(false));
        let info = JSON.parse(localStorage.getItem("userInfo") ?? "{}");
        let savedData = {
          roles: info.roles,
          phone_number: info.phone_number,
          first_name: data.first_name,
          last_name: data.last_name,
          user_name: `${data.first_name} ${data.last_name}`,
        };
        localStorage.setItem("userInfo", JSON.stringify(savedData));
        setStatus({ ...status, loading: false });
      })
      .catch((err) => {
        setStatus({ loading: false, error: true });
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  

  return (
    <Modal
      open={editInfo.open}
      onClose={closeModalHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "auto",
          bgcolor: "background.paper",
          borderRadius: "10px",
          boxShadow: 24,
          p: 4,
          outline: "none",
          height: { xs: "90%", lg: "40rem" },
          overflowY: "auto",
          width: { xs: "90%", lg: "50rem" },
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            <FormInput
              defaultValue={editInfo.data.first_name}
              formik={formik}
              label=" نام"
              name="name"
              placeholder="امیررضا "
            />

            <FormInput
              defaultValue={editInfo.data.last_name}
              formik={formik}
              label=" نام‌خانوادگی"
              name="last_name"
              placeholder="سیفی "
            />

            <SelectBox
              formik={formik}
              options={gender}
              name="gender"
              label=" جنسیت"
              selectValue="مرد"
            />

            <FormInput
              defaultValue={editInfo.data.job}
              formik={formik}
              label="شغل"
              name="career"
              type="text"
              placeholder="برنامه نویس "
            />

            <FormInput
              formik={formik}
              label="کدپستی"
              name="postal_code"
              placeholder="146082544"
              classes="text-left ltr"
            />

            <FormInput
              defaultValue={editInfo.data.national_code}
              formik={formik}
              label="کدملی"
              name="national_code"
              placeholder="146082544"
              classes="text-left ltr"
            />

            <FormInput
              defaultValue={editInfo.data.email}
              formik={formik}
              type="email"
              label="پست‌ الکترونیکی "
              name="email"
              placeholder="example@gmail.com"
              classes="text-left ltr"
            />

            <DatePickerInput
              label="تاریخ تولد"
              formik={formik}
              name={"day_of_birth"}
              nameObject={{
                day_of_birth: "",
                month_of_birth: "",
                year_of_birth: "",
              }}
              defaultValue={`${editInfo.data.year_of_birth}/${editInfo.data.month_of_birth}/${editInfo.data.day_of_birth}`}
            />

            <CustomTextarea
              customClass="lg:col-span-3 md:col-span-2"
              formik={formik}
              label="آدرس"
              name="address"
              placeholder="آدرس"
              formClass="xl:col-span-3 md:col-span-2"
            />
          </div>

          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-blue rounded-md px-4 py-2 text-white"
              disabled={status.loading == true ? true : false}
            >
              ثبت اطلاعات
              {status.loading && <LinearProgress />}
            </button>

            {status.error && (
              <span className="text-xs block text-center text-red-500">
                متاسفانه خطایی رخ داده است.
              </span>
            )}
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default FormUpdateInfo;
