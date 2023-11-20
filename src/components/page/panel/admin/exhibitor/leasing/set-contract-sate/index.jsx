"use client";

import { PostExhibitorLeasingContract } from "@/apis/panel/admin";
import {
  GetExhibitorData,
  PostExhibitorLeasingChangeStatus,
} from "@/apis/panel/exhibitor";
import DatePickerInput from "@/attom/form@/components@/date-picker/date-picker-input";
import ExhibitorStatusAlert from "@/attom/alerts/exhibitor-status-alert";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import * as Yup from "yup";

export default function SetContractDate() {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: "",
    status: "",
    title: "",
  });

  const { id } = useParams();

  function fetchData() {
    GetExhibitorData(id).then((res) => {
      setData({
        applicant_info: res?.applicant_info,
        vehicle_info: res?.vehicle_info,
      });
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  let initialValues = {
    contract_date_year: "",
    contract_date_month: "",
    contract_date_day: "",
    exhibitor_leasing_id: state?.exhibitor_leasing_id,
  };
  
  const onSubmit = (values) => {
    let formData = new FormData();
    formData.append("contract_date_year", String(values.contract_date_year));
    formData.append("contract_date_month", String(values.contract_date_month));
    formData.append("contract_date_day", String(values.contract_date_day));
    formData.append("exhibitor_leasing_id", id);

    PostExhibitorLeasingContract(formData)
      .then((res) => {
        const changeStatusData = new FormData();

        changeStatusData.append("exhibitor_leasing_id", id);
        changeStatusData.append("reason", "");
        changeStatusData.append("condition", "در انتظار بارگذاری تصاویر چک");

        PostExhibitorLeasingChangeStatus(changeStatusData)
          .then(() => {
            setShowAlert({
              show: true,
              status: true,
              title: "تاریخ عقد قرارداد با موفقیت ثبت شد.",
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
      .catch(() => {});
  };

  const validationSchema = Yup.object({
    contract_date_year: Yup.string().required(
      "انتخاب تاریخ قرارداد الزامی است."
    ),
  });
  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });

  return (
    <div className="border rounded-lg">
      <h1 className="text-blue font-bold text-lg pt-5 px-5">
        تاریخ تنظیم قرارداد
      </h1>
      <div className="border-b m-5"></div>
      <form
        onSubmit={formik.handleSubmit}
        className="  flex flex-col gap-10 px-10 "
      >
        <span>تاریخ تنظیم قرارداد را وارد نمایید.</span>
        <DatePickerInput
          label="تاریخ تنظیم قرارداد"
          formik={formik}
          name={"contract_date_year"}
          nameObject={{
            contract_date_day: "",
            contract_date_month: "",
            contract_date_year: "",
          }}
        />

        <button
          className={`bg-blue text-white px-5 py-2 mb-4 w-[15rem] mx-auto rounded-lg  ${
            loading && "cursor-not-allowed"
          }`}
          type="submit"
          disabled={loading}
        >
          تایید
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
