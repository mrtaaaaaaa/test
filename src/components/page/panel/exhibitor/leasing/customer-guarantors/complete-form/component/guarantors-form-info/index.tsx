import { LinearProgress } from "@mui/material";

import { useFormik } from "formik";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import GuarantorOne from "../../../components/guarantor1";
import GuarantorSecond from "../../../components/guarantor2";

import {
  PostExhibitorLeasingChangeStatus,
  postExhibitorLeasingGuarantors,
} from "@/apis/panel/exhibitor";

import { GuarantorsFormInfoValidationSchema } from "./form/validation-schema";
import { GuarantorsFormInfoInit } from "./form/initial-values";
import ExhibitorStatusAlert from "@/attom/alerts/exhibitor-status-alert";

const GuarantorsFormInfo = ({ state }: any) => {
  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState({
    show: "",
    status: "",
    title: "",
  });

  // Formik onSubmit
  const onSubmit = (values) => {
    setLoading(true);

    const postData = new FormData();

    const valuesObject = Object.entries(values).map(([key, value]) =>
      postData.append([key], value)
    );

    postExhibitorLeasingGuarantors(postData)
      .then((res) => {
        setLoading(false);
        const changeStatusData = new FormData();

        changeStatusData.append(
          "exhibitor_leasing_id",
          state?.exhibitor_leasing_id
        );
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

  // Formik
  const formik = useFormik({
    initialValues: GuarantorsFormInfoInit(state),
    onSubmit,
    validationSchema: GuarantorsFormInfoValidationSchema,
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col">
        {/* اطلاعات ضامن اول */}
        <GuarantorOne formik={formik} />

        {/* اطلاعات ضامن دوم  */}
        <GuarantorSecond formik={formik} />

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
  );
};

export default GuarantorsFormInfo;
