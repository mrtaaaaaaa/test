import { SelectBox } from "@/attom/form@/components@/select@/select-box";
import SelectYear from "@/attom/form@/components@/select@/select-year";
import DynamicBrandModal from "@/attom/modals/brand-model-of-car/dynamic-brand-modal";
import { useAppSelector } from "@/hooks/redux-hooks";
import { SET_IS_MULTIPLE } from "@/redux/brand-model/brand-model-slice";
import {
  ADD_AREA,
  ADD_BRAND,
  ADD_PAYMENT,
  ADD_YEAR,
  SET_ERROR_AREA,
  SET_ERROR_BRAND,
  SET_ERROR_YEAR,
  vehicleSelector,
} from "@/redux/vehicle-check/vehicle-check-slice";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface PropTypes {
  indexOfBox: number;
  areas: {
    areas: any[];
  };
  models: any[];
}

const CardVehicleCheckPack = ({ indexOfBox, areas, models }: PropTypes) => {
  let indexOfBrand =
    indexOfBox == 0
      ? 1
      : indexOfBox == 1
      ? 2
      : indexOfBox == 2
      ? 3
      : indexOfBox == 3
      ? 4
      : 5;

  const [selectedValue, setSelectedValue] = useState("");

  const stateOfVehicleCheck = useAppSelector(vehicleSelector);

  const dispatch = useDispatch();

  const customHandleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number,
    category: boolean
  ) => {
    let value = e.target.value;

    setSelectedValue(value);

    let array = [];

    array = stateOfVehicleCheck.brand_and_model;
    dispatch(ADD_BRAND({ ...array, [indexOfBrand]: value }));

    dispatch(
      SET_ERROR_BRAND({
        ...stateOfVehicleCheck?.error?.brand,
        [indexOfBrand]: false,
      })
    );
  };

  useEffect(() => {
    models?.map((brand) => {
      let selectedModel = brand?.models?.find(
        (model) => model.alias == selectedValue
      );

      brand?.models?.map((model) => {
        if (model.types) {
          model?.types?.map((type) => {
            if (type?.alias == selectedValue) {
              dispatch(
                ADD_PAYMENT({
                  ...stateOfVehicleCheck.payment,
                  [indexOfBrand]: type?.vc_price,
                })
              );
            }
          });
        }
      });
      if (selectedModel?.vc_price) {
        dispatch(
          ADD_PAYMENT({
            ...stateOfVehicleCheck.payment,
            [indexOfBrand]: selectedModel?.vc_price,
          })
        );
      }
    });
  }, [selectedValue]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let name = e.target.name;
    let value2 = e.target.value;
    let array;

    array = stateOfVehicleCheck.year_of_manufacture;
    dispatch(ADD_YEAR({ ...array, [name]: value2 }));
    dispatch(
      SET_ERROR_YEAR({ ...stateOfVehicleCheck?.error?.year, [name]: false })
    );
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let name = e.target.name;
    let area = e.target.value;
    let array;

    array = stateOfVehicleCheck.vehicle_check_area;

    dispatch(ADD_AREA({ ...array, [name]: area }));
    dispatch(
      SET_ERROR_AREA({ ...stateOfVehicleCheck?.error?.area, [name]: false })
    );
  };

  Object.values(stateOfVehicleCheck?.error?.brand).map(
    (item: any) => item.indexOfBrand
  );

  useEffect(() => {
    dispatch(SET_IS_MULTIPLE(false));
  }, []);

  return (
    <div className="custom-shadow border rounded-lg p-4 border-[#F3F3F3] pb-8">
      <span className="text-blue  font-bold text-lg mb-2">
        درخواست کارشناسی
      </span>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid lg:grid-cols-12 md:grid-cols-3 gap-8 items-center mt-3"
      >
        <div className="lg:col-span-3 relative">
          <DynamicBrandModal
            models={models}
            mainValue={Object.entries(stateOfVehicleCheck.brand_and_model)}
            indexOfBrand={indexOfBrand}
            customHandleChange={customHandleChange}
          />
          {stateOfVehicleCheck?.error?.brand[indexOfBrand] ? (
            <span className="text-red-500 text-xs   ">
              انتخاب برند و مدل خودرو الزامی است.
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="lg:col-span-3 ">
          <SelectYear
            name={
              indexOfBox == 0
                ? 1
                : indexOfBox == 1
                ? 2
                : indexOfBox == 2
                ? 3
                : indexOfBox == 3
                ? 4
                : 5
            }
            handleYearChange={handleYearChange}
            inVehicle={true}
          />

          {stateOfVehicleCheck?.error?.year[indexOfBrand] ? (
            <span className="text-red-500 text-xs   ">
              انتخاب سال ساخت خودرو الزامی است.
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="lg:col-span-3 ">
          <SelectBox
            width={"100%"}
            options={areas?.areas}
            name={
              indexOfBox == 0
                ? 1
                : indexOfBox == 1
                ? 2
                : indexOfBox == 2
                ? 3
                : indexOfBox == 3
                ? 4
                : 5
            }
            label={"محدوده بازدید"}
            handleClick={handleAreaChange}
          />

          {stateOfVehicleCheck?.error?.area[indexOfBrand] ? (
            <span className="text-red-500 text-xs  ">
              انتخاب محدوده بازدید الزامی است.
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="lg:col-span-3 md:col-span-3">
          <div>
            <span>مبلغ کارشناسی خودرو: </span>

            {Object.entries(stateOfVehicleCheck.payment).map((item, index) => {
              if (indexOfBrand == item[0]) {
                return <b key={index}>{item[1]}</b>;
              }
            })}
            <small> تومان </small>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardVehicleCheckPack;
