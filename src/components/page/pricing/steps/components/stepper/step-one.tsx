import {
  ADD_CAR_MODEL_INFO,
  ADD_ERROR_FOR_BRANDMODEL,
  // ADD_COLOR,
  ADD_MADE_ABROAD,
  ADD_MILEAGE,
  ADD_YEAR_OF_MANUFACTURE,
  SET_TAB,
} from "@/redux/pricing/pricing-slice";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { SelectBox } from "@/attom/form@/components@/select@/select-box";
import SelectYear from "@/attom/form@/components@/select@/select-year";
import DynamicBrandModal from "@/attom/modals/brand-model-of-car/dynamic-brand-modal";
import { staticData } from "@/data";
import { ADD_CATEGORY } from "@/redux/brand-model/brand-model-slice";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";

const StepOne = ({ brandModel }: any) => {
  const dispatch = useAppDispatch();
  const {
    year_of_manufacture,
    model,
    mileage,
    is_car_made_aboard, 
    brand_model_error,
  } = useAppSelector((state) => state.pricing);

  const yearChangeHandler = (e) => {
    dispatch(ADD_YEAR_OF_MANUFACTURE(e.target.value));
  };

  const mileageChangeHandler = (e) => {
    dispatch(ADD_MILEAGE(+e.target.value));
  };

  const madeAbroadHandler = (e) => {
    dispatch(ADD_MADE_ABROAD(e.target.value));
  };

  const nextStepHandler = () => {
    if (model === "") {
      dispatch(ADD_ERROR_FOR_BRANDMODEL(true));
    }
    if (year_of_manufacture === "" || year_of_manufacture === "error") {
      dispatch(ADD_YEAR_OF_MANUFACTURE("error"));
    }
    if (mileage === "" || mileage === "error" || mileage < 0) {
      dispatch(ADD_MILEAGE("error"));
    } else if (
      model !== "" &&
      model !== "error" &&
      year_of_manufacture !== "" &&
      year_of_manufacture !== "error" &&
      mileage !== "" &&
      mileage !== "error"
    ) {
      dispatch(SET_TAB(2));
    }
  };
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
    dispatch(ADD_MADE_ABROAD(category));
    dispatch(ADD_CATEGORY(category));
  };

  

  return (
    <div className="rounded-xl p-4 bg-white tablet:w-[27rem] md:w-[24rem] w-full h-full flex flex-col tablet:flex-col gap-8 mx-auto">
      <div className="w-full relative">
        <DynamicBrandModal
          models={brandModel}
          customHandleChange={customHandleChange}
          defaultValue={model}
        />
        {brand_model_error && (
          <span className="absolute text-red-500 text-xs -bottom-4">
            لطفا برند و مدل مورد نظر خود را انتخاب کنید
          </span>
        )}
      </div>

      <div>
        <SelectYear
          handleYearChange={yearChangeHandler}
          defaultValue={year_of_manufacture}
        />
        {year_of_manufacture === "error" && (
          <span className=" text-red-500 text-xs -bottom-5 block">
            انتخاب سال ساخت الزامی است.
          </span>
        )}
      </div>

      <div>
        <FormInput
          changeHandler={mileageChangeHandler}
          label="کارکرد"
          name="mileAge"
          defaultValue={mileage}
          placeholder="280000"
          showEndAdorMentValue="کیلومتر"
          showEndAdorMent={true}
          classNames="w-full"
        />

        {mileage === "error" && (
          <span className=" text-red-500 text-xs block">
            لطفا کارکرد خودرو را انتخاب نمایید
          </span>
        )}
      </div>

      <SelectBox
        selectedValue={is_car_made_aboard}
        handleClick={madeAbroadHandler}
        label={"نوع تولید"}
        options={staticData.car_madeaboard_types_pricing}
        
      />

      <button
        className="bg-blue w-full py-3 px-6 rounded-lg text-white mt-6"
        onClick={nextStepHandler}
      >
        مرحله بعد
      </button>
    </div>
  );
};

export default StepOne;
