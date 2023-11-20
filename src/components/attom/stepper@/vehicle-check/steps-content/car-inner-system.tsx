import {
  ADD_DESCRIPTION_INNER_SYSTEM,
  ADD_SCORE_INNER_SYSTEM,
  REMOVE_SCORE_INNER_SYSTEM,
} from "@/redux/vehicle-check/result/car-inner-system/car-inner-system";
import { useFormik } from "formik";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import * as Yup from "yup";

import { CarInnerSystemTypes } from "src/data/static-data/car-expert/car-inner-system-types";
import CustomRadioButton from "@/attom/form@/components@/radio-button/radio-button";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { RootState } from "@/redux/store";

interface CarInnerSystemType {
  props: {
    handleNext: () => void;
    handleBack: () => void;
  };
  values: {
    description: string | null;
  };

  validationObject: {
    [name: string]: any;
  };
  initialValues: {
    [init: string]: any;
    description: string | null;
  };
  handleClickParameter: {
    e: any;
    type: {
      en: string;
      score: string | number;
    };
  };
}
const CarInnerSystem = ({
  handleNext,
  handleBack,
}: CarInnerSystemType["props"]) => {
  // Get carInner System data fro default value
  const carInnerSystemData = useAppSelector(
    (state: RootState) => state.carInnerSystem
  );

  // Formik initial value
  const initialValues: CarInnerSystemType["initialValues"] = {
    description: "",
  };
  const innerType = CarInnerSystemTypes.map((type) => type);
  innerType.forEach((element) => {
    initialValues[element.name] = carInnerSystemData[element.en].status
      ? carInnerSystemData[element.en].status
      : "";
  });

  // UseDispatch
  const dispatch = useAppDispatch();

  // Formik onSubmit button
  const onSubmit = (values: { description: string | null }) => {
    dispatch(ADD_DESCRIPTION_INNER_SYSTEM(values.description));
    handleNext();
  };

  // ValidationSchema
  const validationObject: CarInnerSystemType["validationObject"] = {};
  innerType.forEach((element) => {
    validationObject[element.name] = Yup.boolean().required();
  });
  const validationSchema = Yup.object(validationObject);

  // UseFormik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // handle Click for yes answer
  const handleClick = (
    e: CarInnerSystemType["handleClickParameter"]["e"],
    type: CarInnerSystemType["handleClickParameter"]["type"]
  ) => {
    dispatch(
      ADD_SCORE_INNER_SYSTEM({
        name: type.en,
        score: type.score,
      })
    );
  };

  // handle Click for no answer
  const handleRemoveClick = (
    e: CarInnerSystemType["handleClickParameter"]["e"],
    type: CarInnerSystemType["handleClickParameter"]["type"]
  ) => {
    dispatch(
      REMOVE_SCORE_INNER_SYSTEM({
        name: type.en,
        score: type.score,
      })
    );
  };

  return (
    <div className="lg:w-3/4 mx-auto">
      <h2 className="text-xl text-blue  border-b-2 text-center p-5 font-bold m-auto mt-10 ">
        سیستم برقی و داخلی
      </h2>

      <div className="mt-10 flex flex-col gap-3 ">
        <div className="md:grid hidden grid-cols-6 header-title bg-blue  py-3 px-5 rounded-md text-white sticky xl:top-32 md:top-20 z-10">
          <span className="block text-sm font-medium col-span-4">عنوان</span>
          <span className="block text-sm font-medium mr-2">بله</span>
          <span className="block text-sm font-medium mr-2">خیر</span>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {CarInnerSystemTypes.map((type, index) => (
            <CustomRadioButton
              key={index}
              formik={formik}
              name={type.name}
              index={index}
              label={type.name}
              handleClick={(e: any) => handleClick(e, type)}
              handleRemoveClick={(e: any) => handleRemoveClick(e, type)}
              defaultvalue={
                carInnerSystemData[type.en].status !== ""
                  ? carInnerSystemData[type.en].status
                  : ""
              }
            />
          ))}

          {/*@ts-ignore */}
          <CustomTextarea
            formik={formik}
            name="description"
            label="توضیحات تکمیلی کارشناسی سیستم برقی و داخلی "
            // formClass="w-full"
          />

          <div className="flex md:justify-end justify-between gap-5 items-center">
            <button
              type="button"
              className=" text-center sm:px-8 px-4 flex whitespace-nowrap gap-2 items-center rounded-md w-fit mt-6 py-2 border"
              onClick={handleBack}
            >
              مرحله قبل
            </button>
            <button
              type="submit"
              className="bg-blue  text-white text-center sm:px-16 px-4 flex whitespace-nowrap gap-2 items-center rounded-md w-fit mt-6 py-2"
            >
              مرحله بعد
              {/*@ts-ignore */}
              <ArrowBackIosIcon fontSize="13px" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CarInnerSystem;
