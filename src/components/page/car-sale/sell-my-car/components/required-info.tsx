//@ts-nocheck
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ADD_CAR_MODEL,
  SET_IS_MULTIPLE,
} from "@/redux/brand-model/brand-model-slice";
import { InputNumberSeprator } from "@/attom/form@/components@/inputs/input-number-seprator";
import { SelectBox } from "@/attom/form@/components@/select@/select-box";
import SelectYear from "@/attom/form@/components@/select@/select-year";
import DynamicBrandModal from "@/attom/modals/brand-model-of-car/dynamic-brand-modal";
import { Num2persian } from "@/utils/num2persian";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import AccordionCarInfoDetails from "@/attom/form@/components@/accordion@/accordion-car-info-details";
import ColorSelect from "@/attom/form@/components@/select@/color-select";
import { REMOVE_SHOW_CAR } from "@/redux/filter/filter-slice";

interface PropTypes {
  formik: object;
  update?: boolean;
  cities: any;
  models?: { brandModelTypes: any[] };
  colors: any;
}

const RequiredInfo = ({
  formik,
  update = false,
  cities,
  models,
  colors,
}: PropTypes) => {
  const [priceWords, setPriceWords] = useState("");

  const dispatch = useDispatch();

  const customHandleChange = (e, index, category, brandOfCar, model, type) => {
    let formikValue = formik.values;
    formik.setValues({
      ...formikValue,
      brand: brandOfCar,
      model: model,
      type: type,
    });

    dispatch(
      ADD_CAR_MODEL({
        name: "brand",
        value: e.target.value,
      })
    );

    formik.setFieldValue("is_car_made_aboard", category);
  };

  useEffect(() => {
    setPriceWords(Num2persian(formik.values.announced_price || 0));
    dispatch(SET_IS_MULTIPLE(false));
    dispatch(REMOVE_SHOW_CAR(""));
  }, [formik]);

  return (
    <>
      <h2 className="text-blue font-bold text-xl mb-6 pb-6 border-b border-b-gray-150">
        اطلاعات ضروری خودرو
      </h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 items-start">
        <FormInput
          formik={formik}
          label="عنوان آگهی"
          name="name"
          placeholder="هیوندای ولستر مدل 2016"
        />

        {!update && (
          <div>
            <DynamicBrandModal
              models={models?.brandModelTypes}
              customHandleChange={customHandleChange}
              defaultValue={
                formik.values.type
                  ? formik.values.type
                  : formik.values.model
                  ? formik.values.model
                  : "انتخاب کنید."
              }
            />
            {formik.errors.brand &&
              formik.touched.brand &&
              formik.values.brand == "" && (
                <span className="text-red-500 text-xs">
                  {formik.errors.brand}
                </span>
              )}
          </div>
        )}

        <SelectYear defaultValue={"1405"} formik={formik} />

        <InputNumberSeprator
          formik={formik}
          label="کارکرد"
          name="mileage"
          placeholder="280000"
          showEndAdorMent={true}
          showEndAdorMentValue="کیلومتر"
        />

        <ColorSelect colors={colors} formik={formik} name="color" label="رنگ" />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormInput
            formik={formik}
            label="قیمت"
            name="announced_price"
            placeholder="290"
            type="number"
            showEndAdorMent={true}
          />
          <span className="text-xs block mt-1">{priceWords} تومان</span>
        </Box>

        <SelectBox formik={formik} options={cities} name="city" label="استان" />
        <AccordionCarInfoDetails />
      </div>
    </>
  );
};

export default RequiredInfo;
