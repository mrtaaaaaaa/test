"use client";
import SelectYear from "@/attom/form@/components@/select@/select-year";
import DynamicBrandModal from "@/attom/modals/brand-model-of-car/dynamic-brand-modal";
import {
  ADD_CATEGORY,
  SET_IS_MULTIPLE,
} from "@/redux/brand-model/brand-model-slice";
import { REMOVE_SHOW_CAR } from "@/redux/filter/filter-slice";
import {
  ADD_CAR_MODEL_INFO,
  ADD_ERROR_FOR_BRANDMODEL,
  ADD_MADE_ABROAD,
  ADD_YEAR_OF_MANUFACTURE,
  REMOVE_PRICING_DATA,
  pricingSelector,
} from "@/redux/pricing/pricing-slice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";

const PricingCard = ({ brandModel }: any) => {
  const { year_of_manufacture, model, type, brand_model_error } =
    useAppSelector(pricingSelector);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const yearChangeHandler = (e) => {
    dispatch(ADD_YEAR_OF_MANUFACTURE(e.target.value));
  };

  const nextStepHandler = () => {
    if (model === "" || brand_model_error) {
      dispatch(ADD_ERROR_FOR_BRANDMODEL(true));
    }
    if (year_of_manufacture === "" || year_of_manufacture === "error") {
      dispatch(ADD_YEAR_OF_MANUFACTURE("error"));
    } else if (model !== "" && year_of_manufacture !== "") {
      router.push("/pricing/steps");
    }
  };

  useEffect(() => {
    dispatch(SET_IS_MULTIPLE(false));
    dispatch(REMOVE_PRICING_DATA());
    dispatch(REMOVE_SHOW_CAR(""));
  }, []);

  const customHandleChange = (
    e,
    indexOfBrand,
    category,
    brand,
    model,
    type
  ) => {
    dispatch(ADD_ERROR_FOR_BRANDMODEL(false));
    dispatch(
      ADD_CAR_MODEL_INFO({
        type,
        brand,
        model,
      })
    );
    dispatch(ADD_MADE_ABROAD(category !== undefined ? category : false));
    dispatch(ADD_CATEGORY(category !== undefined ? category : false));
  };

  return (
    <div className="rounded-xl py-6 bg-white tablet:w-[30rem] md:w-[24rem] w-full mx-auto shadow-xl">
      <div className=" flex-col justify-between border-b border-b-gray-150 pb-4">
        <h1 className="text-blue font-bold tablet:text-xl text-xl  text-center">
          ارزش خودرو من چقدر است؟
        </h1>
        <span className="text-blue text-xs block mt-4 text-center">
          شما می‌توانید با وارد کردن اطلاعات، خودرو خود را در کمترین زمان ممکن
          قیمت‌گذاری کنید.
        </span>
      </div>

      <div className="flex flex-col pt-4 px-6">
        <div className="flex tablet:flex-col flex-col gap-6">
          <div className="w-full relative">
            <DynamicBrandModal
              models={brandModel}
              customHandleChange={customHandleChange}
              defaultValue={type != "" ? type : model}
            />
            {brand_model_error && (
              <span className="absolute mt-2 text-red-500 text-xs -bottom-5">
                انتخاب برند و مدل الزامی است.
              </span>
            )}
          </div>

          <div className="mt-3">
            <SelectYear
              defaultValue="انتخاب کنید"
              handleYearChange={yearChangeHandler}
            />
            {year_of_manufacture === "error" && (
              <span className=" text-red-500 text-xs -bottom-5">
                انتخاب سال ساخت الزامی است.
              </span>
            )}
          </div>
        </div>
        <button
          onClick={nextStepHandler}
          className="text-center rounded-md mt-6 px-5 py-3 w-10/12 mx-auto bg-blue text-white font-normal"
        >
          مرحله بعد
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
