"use client";

import { PostMaxFacility } from "@/apis/panel/admin";
import { PostExhibitorLeasingChangeStatus } from "@/apis/panel/exhibitor";
import ExhibitorStatusAlert from "@/attom/alerts/exhibitor-status-alert";
import { InputNumberSeprator } from "@/attom/form@/components@/inputs/input-number-seprator";
import { LinearProgress } from "@mui/material";

import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import * as Yup from "yup";

export default function MaximumLoanPay() {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: "",
    status: "",
    title: "",
  });
  const params = useParams();

  // Formik initial values
  const initialValues = {
    maximum_facility_amount: "",
    exhibitor_leasing_id: params.id,
  };

  // Formik onSubmit
  const onSubmit = (values) => {
    setLoading(true);
    const postData = new FormData();
    const valuesObject = Object.entries(values).map(([key, value]) =>
      postData.append([key], value)
    );

    PostMaxFacility(postData)
      .then((res) => {
        if (res.status == 200) {
          const changeStatusData = new FormData();

          changeStatusData.append("exhibitor_leasing_id", params?.id);
          changeStatusData.append("reason", "");
          changeStatusData.append(
            "condition",
            "در انتظار ثبت اطلاعات خودرو و میزان تسهیلات درخواستی"
          );

          PostExhibitorLeasingChangeStatus(changeStatusData)
            .then(() => {
              setShowAlert({
                show: true,
                status: true,
                title: "اطلاعات با موفقیت ثبت شد",
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
        } else {
          setShowAlert({
            show: true,
            status: false,
            title: "متاسفانه خطایی رخ داده است.",
          });
        }
      })
      .catch((error) => {
        setShowAlert({
          show: true,
          status: false,
          title: "متاسفانه خطایی رخ داده است.",
        });
        setLoading(false);
      });
  };

  // Formik validationSchema
  const validationSchema = Yup.object({
    maximum_facility_amount: Yup.number()
      .max(1000000000, "حداکثر تسهیلات یک میلیارد تومان است.")
      .required("میزان حداکثری تسهیلات الزامی است."),
  });

  // Formik config
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col">
      <h1 className="font-bold text-xl mb-4 text-blue border-b border-b-gray-200 pb-4 w-full">
        اعلام حداکثر میزان تسهیلات
      </h1>
      <div className="flex items-center gap-1">
        <RiErrorWarningFill color="#EB6E02" />
        <span className="text-sm">
          در این بخش با توجه به اطلاعات و مدارک بارگذاری شده میزان حداکثری
          تسهیلاتی که متقاضی میتواند بگیرد را وارد کنید{" "}
        </span>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col justify-between mt-6 gap-4">
          <InputNumberSeprator
            formik={formik}
            label="میزان حداکثری تسهیلات"
            name="maximum_facility_amount"
            placeholder="280000"
            showEndAdorMent={true}
            showEndAdorMentValue="تومان"
            classNames="lg:w-1/2 w-full"
          />
          <button
            className={`bg-blue rounded-lg text-white px-16 py-2 w-fit mr-auto text-sm ${
              loading && "cursor-not-allowed"
            }`}
            type="sibmit"
            disabled={loading}
          >
            ثبت اطلاعات
            {loading && <LinearProgress />}
          </button>
        </div>
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
