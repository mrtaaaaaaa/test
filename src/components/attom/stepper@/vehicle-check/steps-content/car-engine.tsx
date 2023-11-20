import * as React from "react";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import {
  ADD_DESCRIPTION_CAR_ENGINE,
  ADD_SCORE_CAR_ENGINE,
  REMOVE_SCORE_CAR_ENGINE,
} from "@/redux/vehicle-check/result/car-engine/car-engine-slice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { CarEngineTypes } from "src/data/static-data/car-expert/car-engine-types";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";
import CustomRadioButton from "@/attom/form@/components@/radio-button/radio-button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { RootState } from "@/redux/store";

interface CarEngineType {
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
}

const CarEngine = ({ handleNext, handleBack }: CarEngineType["props"]) => {
  // Get carEngine System data for default value
  const carEngineData = useAppSelector((state: RootState) => state.carEngine);

  // Formik initialvalue
  const initialValues: CarEngineType["initialValues"] = {
    description: carEngineData.description ? carEngineData.description : "",
  };
  const innerType = CarEngineTypes.map((type) => type);
  innerType.forEach((element) => {
    initialValues[element.name] = carEngineData[element.en].status
      ? carEngineData[element.en].status
      : "";
  });

  // useDispatch
  const dispatch = useAppDispatch();

  // Formik onSubmit button
  const onSubmit = (values: { description: any }): void => {
    dispatch(ADD_DESCRIPTION_CAR_ENGINE(values.description));
    handleNext();
  };

  // ValidationSchema
  const validationObject: CarEngineType["validationObject"] = {};
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
  const handleClick = (type: { en: string; score: string | number }) => {
    dispatch(
      ADD_SCORE_CAR_ENGINE({
        name: type.en,
        score: type.score,
      })
    );
  };

  // handle Click for no answer
  const handleRemoveClick = (type: { en: string; score: string | number }) => {
    dispatch(
      REMOVE_SCORE_CAR_ENGINE({
        name: type.en,
        score: type.score,
      })
    );
  };

  return (
    <div className="lg:w-3/4 mx-auto">
      <h2 className="text-xl text-blue  border-b-2 text-center p-5 font-bold m-auto mt-10 ">
        موتور{" "}
      </h2>

      <div className="mt-10 flex flex-col gap-3 ">
        <div className="md:grid hidden grid-cols-6 header-title bg-blue  py-3 px-5 rounded-md text-white sticky xl:top-32 md:top-20 z-10">
          <span className="block text-sm font-medium col-span-4">عنوان</span>
          <span className="block text-sm font-medium mr-2">بله</span>
          <span className="block text-sm font-medium mr-2">خیر</span>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {CarEngineTypes.map((type, index) => (
            <CustomRadioButton
              key={index}
              formik={formik}
              name={type.name}
              index={index}
              label={type.name}
              handleClick={() => handleClick(type)}
              handleRemoveClick={() => handleRemoveClick(type)}
              defaultvalue={
                carEngineData[type.en].status !== ""
                  ? carEngineData[type.en].status
                  : ""
              }
            />
          ))}
          {/*@ts-ignore */}
          <CustomTextarea
            formik={formik}
            name="description"
            label="توضیحات تکمیلی موتور "
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
export default CarEngine;
