import {
  PostExhibitorLeasingChangeStatus,
  PostExhibitorLeasingVehicle,
} from "@/apis/panel/exhibitor";
import SelectYear from "@/attom/form@/components@/select@/select-year";
import DynamicBrandModal from "@/attom/modals/brand-model-of-car/dynamic-brand-modal";
import ExhibitorStatusAlert from "@/attom/alerts/exhibitor-status-alert";
import { SET_IS_MULTIPLE } from "@/redux/brand-model/brand-model-slice";
import { FormHelperText, LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { brandModelInitValue } from "./components/form/initial-value";
import { brandModelValidationSchema } from "./components/form/validation-schema";

const BrandModel = ({ brandModel, exhibitor_leasing_id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: "",
    status: "",
    title: "",
  });

  useEffect(() => {
    dispatch(SET_IS_MULTIPLE(false));
  }, []);

  // brand model handleChange
  const customHandleChange = (e, index, category, brandOfCar, model, type) => {
    let formikValue = formik.values;

    formik.setValues({
      ...formikValue,
      model: model,
      brand: brandOfCar,
      type: type,
    });
  };

  // Formik submit
  const onSubmit = (values: any) => {
    setLoading(true);
    const postData = new FormData();
    const valuesObject = Object.entries(values).map(([key, value]) =>
      postData.append([key], value)
    );

    postData.append("exhibitor_leasing_id", exhibitor_leasing_id);

    PostExhibitorLeasingVehicle(postData)
      .then(() => {
        const changeStatusData = new FormData();

        changeStatusData.append("exhibitor_leasing_id", exhibitor_leasing_id);
        changeStatusData.append("reason", "");
        changeStatusData.append("condition", "در انتظار بررسی مدارک");

        PostExhibitorLeasingChangeStatus(changeStatusData)
          .then(() => {
            setShowAlert({
              show: true,
              status: true,
              title: "اطلاعات با موفقیت بارگذاری شد.",
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
    initialValues: brandModelInitValue,
    onSubmit,
    validationSchema: brandModelValidationSchema,
  });

  return (
    <div>
      <h2 className="font-bold text-xl mb-4 text-blue border-b border-b-gray-200 pb-4 mt-8 w-full">
        انتخاب برند و مدل
      </h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          <div>
            <DynamicBrandModal
              models={brandModel}
              customHandleChange={customHandleChange}
              defaultValue={
                formik.values.type ? formik.values.type : formik.values.model
              }
            />

            {formik.errors.model && (
              <FormHelperText
                className="p-0"
                sx={{ marginLeft: 0, color: "#D90201" }}
              >
                {formik?.errors.model}
              </FormHelperText>
            )}
          </div>

          <SelectYear
            formik={formik}
            name="year_of_manufacture"
            customYears={true}
          />
        </div>
        <button
          type="submit"
          className={`bg-blue text-white w-60 py-2 rounded-md  mt-4 text-center mx-auto ${
            loading && "cursor-not-allowed"
          }`}
          disabled={loading ? true : false}
        >
          ثبت اطلاعات
          {loading && <LinearProgress sx={{ color: "#FFF", width: "100%" }} />}
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
};

export default BrandModel;
