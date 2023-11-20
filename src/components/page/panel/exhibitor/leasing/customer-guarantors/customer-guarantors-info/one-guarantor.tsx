"use client";

import {
  PostExhibitorLeasingChangeStatus,
  postExhibitorLeasingGuarantors,
} from "@/apis/panel/exhibitor";
import ExhibitorStatusAlert from "@/attom/alerts/exhibitor-status-alert";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import * as Yup from "yup";
import GuarantorOne from "../components/guarantor1";

const OneGuarantorInfo = ({ guarantor, exhibitor_leasing_id }: any) => {
  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState({
    show: false,
    status: false,
    title: "",
  });

  // Formik initialValues
  const initialValues = {
    name1: guarantor?.name,
    family1: guarantor?.family,
    relative1: guarantor?.relative,
    father_name1: guarantor?.father_name,
    birth_certificate_issuing_place1:
      guarantor?.birth_certificate_issuing_place,
    birth_certificate_code1: guarantor?.birth_certificate_code,
    birth_date_year1: guarantor?.birth_date_year,
    birth_date_month1: guarantor?.birth_date_month,
    birth_date_day1: guarantor?.birth_date_day,
    landline_phone_number1: guarantor?.landline_phone_number,
    residence_address1: guarantor?.residence_address,
    postal_code1: guarantor?.postal_code,
    mobile_number1: guarantor?.mobile_number,
    national_code1: guarantor?.national_code,
    job1: guarantor?.job,
    sana_document1: "",
    "national-document1": "",
    birth_certificate1: "",

    name2: "",
    family2: "",
    relative2: "",
    father_name2: "",
    birth_certificate_issuing_place2: "",
    birth_certificate_code2: "",
    birth_date_year2: "",
    birth_date_month2: "",
    birth_date_day2: "",
    landline_phone_number2: "",
    residence_address2: "",
    mobile_number2: "",
    national_code2: "",
    postal_code2: "",
    job2: "",
    sana_document2: "",
    "national-document2": "",
    birth_certificate2: "",

    exhibitor_leasing_id: exhibitor_leasing_id,
  };

  //  Formik onSubmit
  const onSubmit = (values: any) => {
    setLoading(true);

    const postData = new FormData();

    const valuesObject = Object.entries(values).map(([key, value]) =>
      postData.append([key], value)
    );

    postExhibitorLeasingGuarantors(postData)
      .then((res) => {
        setLoading(false);
        const changeStatusData = new FormData();

        changeStatusData.append("exhibitor_leasing_id", exhibitor_leasing_id);
        changeStatusData.append("reason", "");
        changeStatusData.append("condition", "در انتظار بررسی اطلاعات ضامنین");

        PostExhibitorLeasingChangeStatus(changeStatusData)
          .then(() => {
            setShowAlert({
              show: true,
              status: true,
              title: "اطلاعات ضامن‌ها با موفقیت بارگذاری شد.",
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
      .catch((err) => {
        setLoading(false);

        setShowAlert({
          show: true,
          status: false,
          title: "متاسفانه خطایی رخ داده است.",
        });
      });
  };

  // Formik validationSchema
  const validationSchema = Yup.object({
    name1: Yup.string()
      .required("نام ضامن الزامی است.")
      .matches(/^[\u0600-\u06FF\s]+$/, "مقدار وارد شده صحیح نیست."),
    family1: Yup.string()
      .required("نام‌خانوادگی ضامن الزامی است.")
      .matches(/^[\u0600-\u06FF\s]+$/, "مقدار وارد شده صحیح نیست."),
    relative1: Yup.string()
      .required("نسبت ضامن الزامی است.")
      .matches(/^[\u0600-\u06FF\s]+$/, "مقدار وارد شده صحیح نیست."),
    mobile_number1: Yup.string()
      .required("شماره تماس ضامن الزامی است")
      .length(11, "شماره تماس وارد شده صحیح نیست."),
    national_code1: Yup.string().required("کدملی ضامن الزامی است"),
    job1: Yup.string()
      .required("شغل ضامن الزامی است.")
      .matches(/^[\u0600-\u06FF\s]+$/, "مقدار وارد شده صحیح نیست."),
    "national-document1": Yup.string().required(
      "تصویر کارت ملی  ضامن الزامی است."
    ),
    birth_certificate1: Yup.string().required(
      "تصویر شناسنامه ضامن الزامی است."
    ),
    sana_document1: Yup.string().required("تصویر ثنا ضامن الزامی است."),
  });

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-b-gray-150">
        <h2 className="text-blue font-bold text-lg">اطلاعات ضامن</h2>
        {/* {status?.reason && (
          <span className="text-sm text-orange font-medium bg-orange-100 px-6 py-2 rounded-md">
            {state.status.reason}
          </span>
        )} */}
      </div>

      <form onSubmit={formik.handleSubmit}>
        <GuarantorOne formik={formik} />
        <div className="flex flex-col">
          <button
            type="submit"
            className={`bg-blue text-white py-2 px-12 text-sm rounded-lg mx-auto mt-8 ${
              loading && "cursor-not-allowed"
            }`}
            disabled={loading}
          >
            <span className="flex gap-2 items-center justify-center">
              ثبت و ادامه
              <FiArrowLeft />
            </span>

            {loading && <LinearProgress />}
          </button>
        </div>

        {showAlert.show && (
          <ExhibitorStatusAlert
            open={showAlert.show}
            setOpen={setShowAlert}
            status={showAlert.status}
            title={showAlert.title}
          />
        )}
      </form>
    </div>
  );
};

export default OneGuarantorInfo;
