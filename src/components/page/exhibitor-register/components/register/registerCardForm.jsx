"use client"

import { postExhibitorRequestLoginAPI } from "@/apis/authentication@";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { regexPhoneNumber } from "@/utils/regex";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import RequestRegistrationModal from "./requestRegistrationModal";
import PersonalInfoForm from "../stepper/steps/personalInfoFrom";
import HorizontalLinearStepper from "../stepper/stepper";

export default function RegisterCard() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showStepper, setShowStepper] = useState(false);

  // Formik initialValue
  let initialValues = {
    phone_number: "",
  };



  // Formik validationSchema
  const validationSchema = Yup.object({
    phone_number: Yup.string()
      .matches(regexPhoneNumber, "شماره همراه صحیح نیست")
      .required("شماره همراه الزامی است.")
  });

  const onSubmit = (values) => {
    setLoading(true);

    let formData = new FormData()

    formData.append("phone_number", values.phone_number)

    postExhibitorRequestLoginAPI(formData)
      .then((res) => {
        setLoading(false);
        let response = res.data;

        localStorage.setItem(
          "phone_number",
          JSON.stringify(values.phone_number)
        );
        //تا حالا ثبت نام نکرده
        if (response.verify_code) {
          setOpen(true)
          setShowStepper(false)

        } else {
          setOpen(true)
          setShowStepper(true)
        }
      })
      .catch((err) => {
        setLoading(false);

        toast.error(
          "به علت تعداد ۱۰ تلاش ناموفق، دسترس به مدت ... مسدود می‌شود."
        )

      });
  };


  const handleResendCode = () => {

    let formData = new FormData()

    formData.append("phone_number", values.phone_number)
    postExhibitorRequestLoginAPI(formData)
      .then((res) => { })
      .catch(() => {
        toast.error("ورود موفقیت آمیز نبود.");
      });
  };

  // UseFormik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });




  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div
          className="rounded-xl py-4 bg-white tablet:w-[28rem] md:w-[24rem] w-full custom-shadow h-fit mx-auto mt-4"
          style={{
            boxShadow:
              "0px 0px 1px 0px rgba(37, 109, 133, 0.10), 0px 0px 32px -8px rgba(37, 109, 133, 0.10), 0px 32px 32px -8px rgba(37, 109, 133, 0.50)",
          }}
        >
          <div className="tablet:flex tablet:flex-row flex-col justify-between border-b border-b-gray-150">
            <h3 className="text-blue font-bold  pb-4 pr-6">ثبت‌نام نمایشگاه</h3>
          </div>

          <div className="flex flex-col pt-4 px-4">
            <div className="flex tablet:flex-col flex-col gap-4">
              <div className="flex tablet:flex-col flex-col gap-6">
                <FormInput
                  formik={formik}
                  name="phone_number"
                  label="شماره همراه"
                />


                <button
                  type="submit"
                  className={`rounded-2xl py-3 w-full bg-gradient-to-r from-[#1242E0] from-0% to-[#2A3439] to-100% text-white text-sm ${loading && "cursor-not-allowed"
                    }`}
                  disabled={loading}
                >
                  ثبت درخواست
                  {loading && <LinearProgress />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {open && (

        <RequestRegistrationModal
          setShowStepper={setShowStepper}
          showStepper={showStepper}
          handleResendCode={handleResendCode}
          phone={formik.values.phone_number}
          open={open}
          setOpen={setOpen}
        />
      )}
{/* {showStepper && open && <HorizontalLinearStepper />} */}

    </>
  );
}
