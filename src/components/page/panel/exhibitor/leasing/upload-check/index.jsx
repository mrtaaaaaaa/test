"use client";

import {
  GetExhibitorData,
  PostExhibitorCheckAPI,
  PostExhibitorLeasingChangeStatus,
} from "@/apis/panel/exhibitor";
import ExhibitorStatusAlert from "@/attom/alerts/exhibitor-status-alert";
import { img } from "@/data";
import { Num2persian } from "@/utils/num2persian";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import UploadCheck from "./components/upload-check";
import { convertToPersianDate } from "@/utils/convert-to-persian-date";

export default function CustomerUploadCheck({ reason }) {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: "",
    status: "",
    title: "",
  });

  const [state, setState] = useState({});
  const { id } = useParams();

  function fetchData() {
    GetExhibitorData(id).then((res) => {
      setState(res);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  // checks array
  const checks = state?.installment_info?.check_templates?.map(
    (check, index) => {
      let order = check.order;
      return {
        order: check.order.toString(),
        order_back: (
          state?.installment_info?.check_templates.length + order
        ).toString(),
        check_no: "",
        date_in_number: check.date_in_number,
        date_in_letters: convertToPersianDate(check.date_in_number),
        amount_in_number: check.amount_in_number,
        amount_in_letters: Num2persian(check.amount_in_number),
        bank: "",
        bank_branch: "",
        sayadi_id: "",
      };
    }
  );

  const guarantors_checks_order =
    state?.installment_info?.check_templates?.length * 2;

  const guarantors_checks =
    state?.installment_info?.guarantors_check_templates?.map((check, index) => {
      let order = check.order;
      return {
        order: (guarantors_checks_order + order).toString(),
        order_back: (guarantors_checks_order + order + 1).toString(),
        check_no: "",
        date_in_number: check.date_in_number,
        date_in_letters: convertToPersianDate(check.date_in_number),
        amount_in_number: check.amount_in_number,
        amount_in_letters: Num2persian(check.amount_in_number),
        bank: "",
        bank_branch: "",
        sayadi_id: "",
      };
    });

  // Formik initialValues
  const initialValues = {};

  useEffect(() => {
    formik.setValues({
      checks: checks,
      guarantors_checks: guarantors_checks,
      exhibitor_leasing_id: id,
    });
  }, [state]);

  // Formik onSubmit
  const onSubmit = (values) => {
    // setLoading(true);

    const postData = new FormData();


    const duplicateValues = { ...values };

    duplicateValues.checks.forEach((check, index) => {
      check.order_back = checks[index].order_back;
      if (!Object.hasOwn(duplicateValues, +check.order_back))
        check.order_back = "";
    });
    duplicateValues.guarantors_checks.forEach((check, index) => {
      check.order_back = guarantors_checks[index].order_back;
      if (!Object.hasOwn(duplicateValues, +check.order_back))
        check.order_back = "";
    });

    Object.entries(duplicateValues).map(([key, value]) => {
      postData.append(
        [key],
        key == "checks" || key == "guarantors_checks"
          ? JSON.stringify(value)
          : value
      );
    });

    PostExhibitorCheckAPI(postData)
      .then(() => {
        const changeStatusData = new FormData();

        changeStatusData.append("exhibitor_leasing_id", id);
        changeStatusData.append("reason", "");
        changeStatusData.append("condition", "در حال بررسی تصاویر چک");

        PostExhibitorLeasingChangeStatus(changeStatusData)
          .then(() => {
            setShowAlert({
              show: true,
              status: true,
              title: "تصاویر چک با موفقیت بارگذاری شد.",
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
        setLoading(false);
      });
  };

  // Formik
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col">
      <div className="flex items-center gap-4 border-b border-b-gray-200 pb-4 w-full mb-4">
        <h1 className="font-bold text-xl  text-blue ">‌بارگذاری چک</h1>
        {reason && (
          <span className="text-sm text-orange font-medium bg-orange-100 px-6 py-2 rounded-md">
            {reason}
          </span>
        )}
      </div>
      <span className="font-medium text-gray-">
        با توجه به تاریخ تنظیم قرارداد ({state.contract_date_year}/
        {state.contract_date_month}/{state.contract_date_day})، طبق نمونه،
        اطلاعات چک‌ها را وارد نموده و تصویر چک را بارگذاری کنید.
      </span>
      <img
        src={img.checkTemplate.src}
        alt="checkImage"
        className="w-96 mx-auto mt-5"
      />

      <div className="flex gap-3 items-center mt-6">
        <span className="bg-blue text-white w-9 h-8 rounded-md flex justify-center items-center">
          1
        </span>
        <span className="font-bold whitespace-nowrap"> چک‌های متقاضی</span>
        <div className="h-[1px] bg-blue w-full "></div>
      </div>

      <form onSubmit={formik.handleSubmit} className="flex flex-col">
        {checks?.map((checkTemplate, index) => (
          <UploadCheck
            hasBack={true}
            checkTemplate={checkTemplate}
            index={index}
            formik={formik}
            name="checks"
            check_national_id={
              state?.installment_info.check_templates[index].check_national_id
            }
            pay_to={state?.installment_info.check_templates[index].pay_to}
          />
        ))}

        <div className="flex gap-3 items-center mt-4">
          <span className="bg-blue text-white w-9 h-8 rounded-md flex justify-center items-center">
            2
          </span>
          <span className="font-bold whitespace-nowrap"> چک‌های ضامن</span>
          <div className="h-[1px] bg-blue w-full "></div>
        </div>

        {guarantors_checks?.map((checkTemplate, index) => (
          <UploadCheck
            hasBack={true}
            checkTemplate={checkTemplate}
            index={index}
            formik={formik}
            name="guarantors_checks"
            check_national_id={
              state?.installment_info.guarantors_checks[index].check_national_id
            }
            pay_to={state?.installment_info.guarantors_checks[index].pay_to}
          />
        ))}

        <button
          type="submit"
          className={`bg-blue text-white px-12 py-2 rounded-lg mx-auto text-sm mt-8 ${
            loading && "cursor-not-allowed"
          }`}
          disabled={loading}
        >
          ثبت اطلاعات چک
          {loading && <LinearProgress />}
        </button>
      </form>

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
}
