import { PostFilterSave } from "@/apis/filter-save";
import { PostAdSaleSearch } from "@/apis/search";
import DynamicBrandModal from "@/attom/modals/brand-model-of-car/dynamic-brand-modal";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/redux/auth/auth-Slice";
import { SET_IS_MULTIPLE } from "@/redux/brand-model/brand-model-slice";
import {
  ADD_MODEL,
  PREVIEW_DATA,
  REMOVE_ALL,
  SET_SHOW_NULL,
  SHOW_NULL_BUTTON,
  filterSelector,
} from "@/redux/filter/filter-slice";
import { ADD_KEYWORD } from "@/redux/keywords/keywords-slice";
import { CloseCircle, FilterSearch, Save2 } from "iconsax-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SimpleAccordion from "./components@/accordion";
import CarDamageFilter from "./components@/car-damage";
import DropDownColor from "./components@/drop-down/color";
import DropDownFuelType from "./components@/drop-down/fuel-type";
import DropDownGearBox from "./components@/drop-down/gear-box";
import InsuranceFilter from "./components@/insurance";
import SelectMileage from "./components@/select/select-mileage";
import SelectPrice from "./components@/select/select-price";
import SelectYearFilter from "./components@/select/select-year";
import SwtichImageFilter from "./components@/switch";
import { MainPageFilterPropsType, StatusType } from "./type";
import { ConvertAPIImagesToBase64 } from "@/utils/get-images-base64-api";

const MainPageFilter = ({
  models,
  classes,
  setShowFilter,
  showFilter,
  showMileAge = true,
  colors,
}: MainPageFilterPropsType) => {
  const dataFilter = useAppSelector(filterSelector);
  const [status, setStatus] = useState<StatusType>({
    loading: null,
    error: false,
  });

  const { userInfo } = useAppSelector(authSelector);

  const dispatch = useAppDispatch();

  const handleFilterClick = async () => {
    setStatus({ ...status, loading: true });
    const data = {
      brands: dataFilter?.brand?.join(",") ?? -1,
      models: dataFilter?.model?.join(",") ?? -1,
      types: dataFilter?.type?.join(",") ?? -1,
      car_damaged: dataFilter.carDamage.join(" - "),
      min_price: +dataFilter.min_price ? +dataFilter.min_price : -1,
      max_price: +dataFilter.max_price ? +dataFilter.max_price : -1,
      min_Mileage: showMileAge
        ? +dataFilter.min_Mileage
          ? +dataFilter.min_Mileage
          : -1
        : 0,
      max_Mileage: showMileAge
        ? +dataFilter.max_Mileage
          ? +dataFilter.max_Mileage
          : -1
        : 0,
      colors: dataFilter?.colors?.join(",")
        ? dataFilter?.colors?.join(",")
        : "",
      with_image: dataFilter.with_image,
      gear_box_types: dataFilter?.gear_box_types?.join(",") ?? "",
      fuel_types: dataFilter?.fuel_types?.join(",") ?? "",
      min_year_of_manufacture: +dataFilter.min_year_of_manufacture
        ? +dataFilter.min_year_of_manufacture
        : -1,
      max_year_of_manufacture: +dataFilter.max_year_of_manufacture
        ? +dataFilter.max_year_of_manufacture
        : -1,
      keywords: "",
      body_insurance: dataFilter.insurances.BodyInsurance,
      third_party_insurance: dataFilter.insurances.ThirdPartyInsurance,
      car_accident_insurance: dataFilter.insurances.CarAccidentInsurance,
      international_car_insurance:
        dataFilter.insurances.InternationalCarInsurance,
      lat: -1,
      long: -1,
      distance: -1,
      engine_volume: -1,
      engine_power: -1,
      engine_torque: -1,
      sort: dataFilter.sort,
      ascending: dataFilter.ascending,
    };

    try {
      const tempSearch = await PostAdSaleSearch(data);
      await ConvertAPIImagesToBase64(tempSearch);

      dispatch(PREVIEW_DATA(tempSearch));
      dispatch(SET_SHOW_NULL(false));
      dispatch(SHOW_NULL_BUTTON(true));

      if (tempSearch == null) {
        dispatch(SET_SHOW_NULL(true));
      }
      setStatus({ loading: false, error: false });
    } catch(err: any) {
      setStatus({ loading: false, error: true });
    }

  };

  const deleteFiltersHandler = () => {
    dispatch(REMOVE_ALL(""));
    dispatch(ADD_KEYWORD(""));
    dispatch(SET_SHOW_NULL(false));
  };

  const saveSearchHandler = () => {
    if (userInfo.phone_number) {
      const postData = {
        brands: dataFilter.brand[0],
        models: dataFilter.model[0],
        min_price: dataFilter.min_price,
        max_price: dataFilter.max_price,
        city: "",
        notification_type: "SMS",
        user_name: userInfo.phone_number,
      };
      PostFilterSave(postData)
        .then(() => {
          toast.success("جستجو با موفقیت ذخیره شد");
        })
        .catch(() => {
          toast.error("مشکلی در ذخیره جستجو پیش آمده‌است");
        });
    } else {
      toast.info("لطفا ابتدا وارد سایت شوید ");
    }
  };

  useEffect(() => {
    dispatch(SET_IS_MULTIPLE(true));
  }, []);

  const brandModelHandler = (e: any) => {
    dispatch(ADD_MODEL(e.target.value));
  };

  return (
    <div
      className={`filter-sidebar  custom-scrollbar lg:flex lg:sticky lg:top-40 fixed bg-white lg:right-auto py-5 px-6 lg:w-full md:w-1/2 tablet:w-1/2 sx:w-full w-screen lg:max-h-[80vh] h-screen transition-all ${classes} flex-col overflow-y-scroll justify-between bg-white p-4 rounded-lg custom-shadow`}
    >
      <div className="flex lg:justify-start justify-between items-center mb-4">
        <div className="flex text-blue items-center gap-1">
          <FilterSearch size="20" color="#1242E0" />
          <span className="font-bold text-lg">فیلتر‌‌ها</span>
        </div>
        {showFilter && (
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="lg:hidden mr-auto"
          >
            <CloseCircle color="#ef4444" size="20" />
          </button>
        )}
      </div>

      <div className="flex justify-between items-center">
        {dataFilter.showNullButton ? (
          <div className="flex justify-between w-full pb-2 mb-4 border-b border-b-gray-250">
            {dataFilter.showNull == true && (
              <button
                className="bg-white text-xs text-blue border border-blue rounded-lg py-2 px-3 font-medium flex items-center gap-1"
                onClick={saveSearchHandler}
              >
                <Save2 size="16" color="#1242E0" />
                ذخیره جستجوی اخیر
              </button>
            )}

            <button
              className="bg-white text-xs text-red-500 py-2 px-3 font-medium mr-auto"
              onClick={deleteFiltersHandler}
            >
              حذف فیلترها
            </button>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="flex flex-col gap-5">
        <DynamicBrandModal
          models={models}
          customHandleChange={brandModelHandler}
          defaultValue={dataFilter.shownCars}
        />

        <SelectPrice />

        {showMileAge && (
          <SimpleAccordion title="کارکرد">
            <SelectMileage />
          </SimpleAccordion>
        )}
        <DropDownColor colors={colors} />

        <CarDamageFilter />

        <SwtichImageFilter />

        <DropDownGearBox />

        <DropDownFuelType />

        <SimpleAccordion title="سال ساخت">
          <SelectYearFilter />
        </SimpleAccordion>

        <InsuranceFilter />

        <button
          className={`bg-blue text-white rounded-md mt-5 p-3 w-full ${
            status.loading && "cursor-not-allowed"
          }`}
          onClick={handleFilterClick}
          disabled={status.loading == true ? true : false}
        >
          اعمال فیلتر
          {/* {status.loading && <LinearProgress />} */}
        </button>
        {status.error && (
          <span className="text-xs block text-center text-red-500">
            متاسفانه خطایی رخ داده است.
          </span>
        )}
      </div>
    </div>
  );
};
export default MainPageFilter;
