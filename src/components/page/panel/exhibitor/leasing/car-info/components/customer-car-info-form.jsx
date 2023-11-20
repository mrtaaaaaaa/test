"use client";

import {
  GetExhibitorData,
  PostExhibitorLeasingChangeStatus,
  postExhibitorLeasingVehicleAndFacility,
} from "@/apis/panel/exhibitor";
import { GetColorListAPi } from "@/apis/product-filter/get-color-list";
import ExhibitorStatusAlert from "@/attom/alerts/exhibitor-status-alert";
import PreviewDetail from "@/attom/exhibitors/preview-detail";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { InputNumberSeprator } from "@/attom/form@/components@/inputs/input-number-seprator";
import ColorSelect from "@/attom/form@/components@/select@/color-select";
import SelectYear from "@/attom/form@/components@/select@/select-year";
import DynamicBrandModal from "@/attom/modals/brand-model-of-car/dynamic-brand-modal";
import { FRONT2DB } from "@/config/url";
import { useRequest } from "@/hooks/useRequest";
import { SET_IS_MULTIPLE } from "@/redux/brand-model/brand-model-slice";
import { Num2persian } from "@/utils/num2persian";
import { NumberSeprator } from "@/utils/number-seprator";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import * as Yup from "yup";

const CustomerCarInfoForm = () => {
  // Alert
  const [loading, setLoading] = useState();
  const [staticColors, setStaticColors] = useState([]);
  const [showAlert, setShowAlert] = useState({
    show: "",
    status: "",
    title: "",
  });
  const [state, setState] = useState({});
  const { id } = useParams();

  async function fetchData() {
    GetExhibitorData(id).then((res) => {
      setState(res);
    });
    GetColorListAPi().then((res) => {
      setStaticColors(res.colors);
    });
  }

  useEffect(() => {
    fetchData();
    dispatch(SET_IS_MULTIPLE(false));
  }, []);

  // Formik initialValues
  const initialValues = {
    exhibitor_leasing_id: id,
    brand: "",
    model: state?.vehicle_info?.model,
    type: state?.vehicle_info?.type,
    year_of_manufacture: state?.vehicle_info?.year_of_manufacture_display,
    mileage: "",
    color: "",
    engin_number: "",
    chassis_number: "",
    vehicle_amount_in_number: "",
    prepaid_amount_in_number: "",
  };

  // Formik validationSchema
  const validationSchema = Yup.object({
    color: Yup.string().required("انتخاب رنگ الزامی است."),
    engin_number: Yup.number("مقدار وارد شده صحیح نیست.").required(
      "شماره موتور الزامی است."
    ),
    chassis_number: Yup.number("مقدار وارد شده صحیح نیست.").required(
      "شماره شاسی الزامی است."
    ),
    vehicle_amount_in_number: Yup.number()
      .min(0, "مقدار وارد شده صحیح نیست.")
      .required("قیمت خودرو الزامی است."),
    prepaid_amount_in_number: Yup.number("مقدار وارد شده")
      .max(
        Yup.ref("vehicle_amount_in_number"),
        "میزان پیش پرداخت بیشتر از قیمت خودرو است."
      )
      .test(
        "is-at-least-40-percent",
        "میزان پیش پرداخت کمتر از ۴۰ درصد قیمت خودرو است.",
        function (value) {
          const vehicleAmount = this.resolve(
            Yup.ref("vehicle_amount_in_number")
          );
          const fortyPercentOfVehicleAmount = vehicleAmount * 0.4;
          return value >= fortyPercentOfVehicleAmount;
        }
      )
      .required("میزان پیش پرداخت الزامی است."),
    mileage: Yup.number("")
      .typeError("کارکرد خودرو الزامی است")
      .required("کارکرد خودرو الزامی است"),
  });
  const dispatch = useDispatch();

  // Formik onSubmit
  const onSubmit = (values) => {
    if (
     ( values.vehicle_amount_in_number - values.prepaid_amount_in_number) >
      state?.installment_info?.maximum_facility_amount
    ) {
      toast.error("میزان تسهیلات درخواستی بیشتر از سقف مجاز است.");
    } else {
      setLoading(true);
      const postData = new FormData();
      postData.append(
        "facility_amount",
        values.vehicle_amount_in_number - values.prepaid_amount_in_number
      );
      postData.append(
        "vehicle_amount_in_letters",
        Num2persian(values.vehicle_amount_in_number)
      );
      postData.append(
        "prepaid_amount_in_letters",
        Num2persian(values.prepaid_amount_in_number)
      );

      Object.keys(values).map((item) => {
        return postData.append(item, values[item]);
      });

      postData.append("color", values.color);
      postExhibitorLeasingVehicleAndFacility(postData)
        .then((res) => {
          setLoading(false);
          const changeStatusData = new FormData();

          changeStatusData.append("exhibitor_leasing_id", id);
          changeStatusData.append("reason", "");
          changeStatusData.append(
            "condition",
            values.vehicle_amount_in_number - values.prepaid_amount_in_number >
              300000000
              ? "در انتظار ثبت اطلاعات ضامنین"
              : "در انتظار ثبت درخواست کارشناسی"
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
        })
        .catch((err) => {
          setLoading(false);
          setShowAlert({
            show: true,
            status: false,
            title: "متاسفانه خطایی رخ داده است.",
          });
        });
    }
  };

  // Formik
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const { data: brandModel } = useRequest({
    method: "GP",
    url: `${FRONT2DB}/BrandModelType/Get/All`,
    data: {
      page_number: 1,
      page_size: 200,
    },
  });

  const customHandleChange = (e, index, category, brandOfCar, model, type) => {
    let formikValue = formik.values;
    formik.setValues({
      ...formikValue,
      brand: brandOfCar,
      model: model,
      type: type,
    });
  };

  useEffect(() => {
    formik.setFieldValue(
      "year_of_manufacture",
      state?.vehicle_info?.year_of_manufacture_display
    );
  }, [state?.vehicle_info]);

  const facility_amount = NumberSeprator(
    formik.values.vehicle_amount_in_number -
      formik.values.prepaid_amount_in_number
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-4">
          <DynamicBrandModal
            defaultValue={
              formik.values?.type ||
              formik.values?.model ||
              state?.vehicle_info?.type ||
              state?.vehicle_info?.model
            }
            customHandleChange={customHandleChange}
            models={
              brandModel ? brandModel.brandModelTypes : ["برندی یافت نشد"]
            }
          />
          <SelectYear
            defaultValue={
              formik.values.year_of_manufacture ||
              state?.vehicle_info?.year_of_manufacture_display
            }
            formik={formik}
            name="year_of_manufacture"
          />
          <ColorSelect
            colors={staticColors}
            formik={formik}
            name="color"
            label="رنگ"
          />
          <FormInput
            formik={formik}
            label="کارکرد خودرو (کیلومتر)"
            name="mileage"
            placeholder="480"
            type="number"
            showEndAdorMent={true}
            showEndAdorMentValue="کیلومتر"
          />
          <FormInput
            formik={formik}
            label="شماره موتور*"
            name="engin_number"
            type="number"
          />

          <FormInput
            formik={formik}
            label="شماره شاسی*"
            name="chassis_number"
            type="number"
          />

          <InputNumberSeprator
            formik={formik}
            label="قیمت خودرو"
            name="vehicle_amount_in_number"
            showEndAdorMent={true}
            showEndAdorMentValue="تومان"
          />
        </div>

        {/* Loan amount */}
        <div className="flex flex-col gap-4 my-8">
          <span className="font-bold text-sm block">اعلام میزان تسهیلات</span>
          <p className="text-sm">
            طبق میزان حداکثری اعطای تسهیلات که در مرحله قبل اعلام شده است (
            <span className="font-medium">
              {NumberSeprator(state?.installment_info?.maximum_facility_amount)}
            </span>{" "}
            <samll className="font-light text-xs">تومان</samll>) ، میزان تسهیلات
            درخواستی خود را وارد نمایید.
          </p>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-4">
            <InputNumberSeprator
              formik={formik}
              label="میزان پیش پرداخت"
              name="prepaid_amount_in_number"
              showEndAdorMent={true}
              showEndAdorMentValue="تومان"
            />

            <div>
              <PreviewDetail
                label="میزان تسهیلات درخواستی"
                value={`${facility_amount} تومان`}
              />
              {formik.values.vehicle_amount_in_number -
                formik.values.prepaid_amount_in_number >
              state?.installment_info?.maximum_facility_amount ? (
                <span className="text-xs text-red-500">
                  مقدار وارد شده بیشتر از سقف مجاز است.
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`text-white bg-blue px-12 py-2 rounded-lg mt-4 mx-auto text-center text-sm ${
            loading && "cursor-not-allowed"
          }`}
          disabled={loading}
        >
          ثبت اطلاعات
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
      </div>
    </form>
  );
};

export default CustomerCarInfoForm;
