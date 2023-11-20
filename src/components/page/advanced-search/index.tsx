"use client";
import { PostAdSaleSearch } from "@/apis/search";
import DynamicBrandModal from "@/attom/modals/brand-model-of-car/dynamic-brand-modal";
// import CarDamageFilter from "@/molcule/filter/components@/car-damage";
import CarDamageFilter from "@/molcule/filter/components@/car-damage";
import DropDownColor from "@/molcule/filter/components@/drop-down/color";
import DropDownFuelType from "@/molcule/filter/components@/drop-down/fuel-type";
import DropDownGearBox from "@/molcule/filter/components@/drop-down/gear-box";
import SelectMileage from "@/molcule/filter/components@/select/select-mileage";
import SelectPrice from "@/molcule/filter/components@/select/select-price";
import SelectYearFilter from "@/molcule/filter/components@/select/select-year";

import Insurances from "@/molcule/insurance";
import { SET_IS_MULTIPLE } from "@/redux/brand-model/brand-model-slice";
import {
  ADD_MAX_MILEAGE,
  ADD_MIN_MILEAGE,
  ADD_WITH_IMAGE,
  PREVIEW_DATA,
  REMOVE_ALL,
  SET_SHOW_NULL,
  SHOW_NULL_BUTTON,
} from "@/redux/filter/filter-slice";
import { ADD_KEYWORD } from "@/redux/keywords/keywords-slice";
import { LinearProgress, Switch } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";

const MapModal = dynamic(() => import("@/attom/form@/components@/map@/map"), {
  loading: () => <p>در حال بارگزاری نقشه ...</p>,
  ssr: false,
});

const AdvancedSearch = ({ colors, models }: any) => {
  // get dataFilter
  const dataFilter = useAppSelector((state) => state.filter);
  const [status, setStatus] = useState({ loading: false, error: false });

  // use states
  const [checkMileage, setCheckMileage] = useState(
   (dataFilter.min_Mileage !== 0 && dataFilter.max_Mileage !== 0) ? false : true
  );

  // Dispatch
  const dispatch = useAppDispatch();
  // Navigate
  const router = useRouter();

  // SwitchMileage
  const handleSwitchMileage = () => {
    dispatch(ADD_MIN_MILEAGE(dataFilter.min_Mileage == -1 ? 0 : -1));
    dispatch(ADD_MAX_MILEAGE(dataFilter.min_Mileage == -1 ? 0 : -1));
    // dispatch(SET_SHOW_NULL(false));
    setCheckMileage(!checkMileage);
  };

  // SwitchIamge
  const handleSwitchImage = () => {
    dispatch(ADD_WITH_IMAGE(!dataFilter.with_image));
  };

  // handle Search Click
  const handleFilterClick = () => {
    setStatus({ loading: true, error: false });
    const data = {
      brands: dataFilter?.brand?.join(",") ?? -1,
      models: dataFilter?.model?.join(",") ?? -1,
      types: dataFilter?.type?.join(",") ?? -1,
      min_price: +dataFilter.min_price ? +dataFilter.min_price : -1,
      max_price: +dataFilter.max_price ? +dataFilter.max_price : -1,
      min_Mileage: checkMileage
        ? 0
        : +dataFilter.min_Mileage
        ? +dataFilter.min_Mileage
        : -1,
      max_Mileage: checkMileage
        ? 0
        : +dataFilter.max_Mileage
        ? +dataFilter.max_Mileage
        : -1,
      colors: dataFilter?.colors?.join(",")
        ? dataFilter?.colors?.join(",")
        : "",
      body_insurance: dataFilter.insurances.BodyInsurance,
      third_party_insurance: dataFilter.insurances.ThirdPartyInsurance,
      car_accident_insurance: dataFilter.insurances.CarAccidentInsurance,
      international_car_insurance:
        dataFilter.insurances.InternationalCarInsurance,
      with_image: dataFilter.with_image,
      gear_box_types: dataFilter?.gear_box_types?.join(",") ?? "",
      fuel_types: dataFilter?.fuel_types?.join(",") ?? "",
      min_year_of_manufacture: +dataFilter.min_year_of_manufacture
        ? +dataFilter.min_year_of_manufacture
        : -1,
      max_year_of_manufacture: +dataFilter.max_year_of_manufacture
        ? +dataFilter.max_year_of_manufacture
        : -1,
      car_damaged: dataFilter.carDamage.join(" - "),
      distance: dataFilter.distance,
      long: dataFilter.mapData.longitude,
      lat: dataFilter.mapData.latitude,
      keywords: "",
      engine_volume: -1,
      engine_power: -1,
      engine_torque: -1,
      sort: dataFilter.sort,
      ascending: dataFilter.ascending,
    };

    PostAdSaleSearch(data)
      .then((res) => {
        dispatch(SHOW_NULL_BUTTON(true));
        if (res == null) {
          dispatch(SET_SHOW_NULL(true));
          router.push("/car-order/list/products");
        } else {
          dispatch(PREVIEW_DATA(res));
          dispatch(SET_SHOW_NULL(false));
          router.push("/car-order/list/products");
        }

        setStatus({ ...status, loading: false });
      })
      .catch(() => setStatus({ loading: false, error: true }));
  };

  const deleteFiltersHandler = () => {
    dispatch(REMOVE_ALL(""));
    dispatch(ADD_KEYWORD(""));
    dispatch(SET_SHOW_NULL(false));
  };

  useEffect(() => {
    dispatch(SET_IS_MULTIPLE(true));
  }, []);

  return (
    <>
      <div className="lg:grid xl:grid-cols-7 lg:grid-cols-5 flex flex-col-reverse gap-5 mb-20">
        <div className="flex flex-col items-end xl:col-span-7 lg:col-span-5 xl:mt-10">
          <Link
            href="/"
            className="text-blue  cursor-pointer items-center mb-1 flex gap-2 justify-end"
          >
            بازگشت
            <AiOutlineArrowLeft />
          </Link>
          <div className="border border-blue rounded-md  p-5 flex flex-col w-full text-right">
            <div className="flex justify-between items-center gap-2">
              <span className="font-bold text-lg w-fit whitespace-nowrap py-2">
                جستجوی پیشرفته
              </span>

              {dataFilter.showNullButton ? (
                <button
                  className="bg-white underline text-sm text-red-500 rounded-full py-1 px-4 mb-3"
                  onClick={deleteFiltersHandler}
                >
                  حذف فیلترها
                </button>
              ) : (
                ""
              )}
            </div>

            {/* Base Info */}
            <div className="mt-5">
              <span className="border-b border-blue block pb-2 text-blue  text-lg">
                اطلاعات پایه
              </span>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-5 w-full items-center">
                <DynamicBrandModal
                  models={models}
                  defaultValue={dataFilter.shownCars}
                />

                <SelectPrice />

                <SelectMileage />

                <SelectYearFilter />

                <DropDownFuelType />
                <DropDownGearBox />
                <DropDownColor colors={colors} />

                <div>
                  <span className="block mb-2">وضعیت بدنه</span>
                  <CarDamageFilter />
                </div>

                <div>
                  <div className="flex justify-between items-center p-1 rounded h-fit">
                    <span className="font-bold">فقط آگهی‌های خودرو صفر</span>
                    <Switch
                      onChange={handleSwitchMileage}
                      checked={(dataFilter.min_Mileage !== 0 && dataFilter.max_Mileage !== 0) ? false : true}
                    />
                  </div>

                  <div className="flex justify-between items-center p-1 -mt-4 rounded h-fit">
                    <span className="font-bold">فقط عکس‌دار</span>
                    <Switch
                      onChange={handleSwitchImage}
                      checked={dataFilter.with_image}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance Info */}
            <div className="mt-5">
              <span className="border-b border-blue block pb-2 text-blue  text-lg mb-5">
                اطلاعات بیمه
              </span>
              <Insurances />
            </div>

            <div className="mt-5">
              <span className="border-b border-blue block pb-2 text-blue  text-lg mb-5">
                {" "}
                جستجو براساس موقعیت مکانی
              </span>
              <div className="lg:w-2/6 md:w-1/2 w-full xl:h-full lg:h-[15rem] h-[18rem]">
                <MapModal inSearch={true} />
              </div>
            </div>

            <button
              onClick={handleFilterClick}
              className={`bg-blue text-white py-2 px-8 rounded-md mx-auto mt-16 ${
                status.loading && "cursor-not-allowed"
              }`}
              disabled={status.loading ? true : false}
            >
              <span className="flex gap-2 items-center">
                جستجو
                <RiSearch2Line />
              </span>
              {status.loading && <LinearProgress />}
            </button>
            {status.error && (
              <span className="text-red-500 text-sm text-center block mt-4">
                متاسفانه خطایی رخ داده است.
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AdvancedSearch;
