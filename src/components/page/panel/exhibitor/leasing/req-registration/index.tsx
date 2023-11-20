"use client";
import { PostExhibitorLeasing } from "@/apis/panel/exhibitor";
import ExhibitorStatusAlert from "@/attom/alerts/exhibitor-status-alert";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import CustomerInfo from "./components/customer";
import { reqRegistrationInitValue } from "./components/form/initial-value";
import { reqRegistrationValidationSchema } from "./components/form/validation-schema";
import GuarantorsInfo from "./components/guarantors";
import { useRouter } from "next/navigation";

const ReqRegistraionForm = () => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    status: false,
    title: "",
  });
  const [imgsSrc, setImgsSrc] = useState([]);

  const router = useRouter();

  // Submit form Handler
  const onSubmit = (values: any) => {
    // setLoading(true);
    const postData = new FormData();

    const valuObject = Object.entries(values).map(([key, value]) =>
      postData.append(
        [key],
        [key] == "guarantors" ? JSON.stringify(value) : value
      )
    );

    postData.append("repayment_per_month", values.repayment_period);

    PostExhibitorLeasing(postData)
      .then((data) => {
        setShowAlert({
          show: true,
          status: true,
          title: "اطلاعات کاربری با موفقیت بارگذاری شد",
        });
        setLoading(false);
        router.push("/panel/exhibitor/leasing/customers-req");
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

  // Formik
  const formik = useFormik({
    initialValues: reqRegistrationInitValue,
    onSubmit,
    validationSchema: reqRegistrationValidationSchema,
  });

  

  return (
    <form className="mt-4 flex flex-col" onSubmit={formik.handleSubmit}>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        <CustomerInfo
          formik={formik}
          imgsSrc={imgsSrc}
          setImgsSrc={setImgsSrc}
        />
        <GuarantorsInfo formik={formik} />
      </div>

      <button
        type="submit"
        className={`px-10 py-2 text-white bg-blue rounded-lg w-fit text-sm border border-blue outline-none mt-4 mx-auto ${
          loading && "cursor-not-allowed"
        }`}
        onClick={formik.handleSubmit}
        disabled={loading}
      >
        ادامه و ثبت سفارش
        {loading && <LinearProgress />}
      </button>

      {showAlert.show && (
        <ExhibitorStatusAlert
          open={showAlert.show}
          setOpen={setShowAlert}
          status={showAlert.status}
          title={showAlert.title}
        />
      )}
    </form>
  );
};

export default ReqRegistraionForm;
