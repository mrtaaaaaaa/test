import { PostAdSaleSearch } from "@/apis/search";
import CustomSelectBox from "@/attom/form@/components@/select@/custom-select-box";
import { staticData } from "@/data";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  ADD_SORT,
  PREVIEW_DATA,
  SHOW_NULL_BUTTON,
  filterSelector,
} from "@/redux/filter/filter-slice";
import { Close } from "@mui/icons-material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { SelectSortByPropsType } from "./type";
import { ConvertAPIImagesToBase64 } from "@/utils/get-images-base64-api";

const SelectSortBy = ({ newCar = false }: SelectSortByPropsType) => {
  
  const dispatch = useAppDispatch();
  const dataFilter = useAppSelector(filterSelector);
  const [value, setValue] = useState<string>("");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setValue(event.target.value);
    let sortItem = event.target.value.split(",");
    dispatch(
      ADD_SORT({
        sort: sortItem[0],
        ascending: sortItem[1],
      })
    );

    const data = {
      brands: dataFilter?.brand?.join(",") ?? -1,
      models: dataFilter?.model?.join(",") ?? -1,
      types: dataFilter?.type?.join(",") ?? -1,
      car_damaged: dataFilter.carDamage.join(" - "),
      min_price: +dataFilter.min_price ? +dataFilter.min_price : -1,
      max_price: +dataFilter.max_price ? +dataFilter.max_price : -1,
      min_Mileage: +dataFilter.min_Mileage ? +dataFilter.min_Mileage : -1,
      max_Mileage: +dataFilter.max_Mileage ? +dataFilter.max_Mileage : -1,
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
      sort: sortItem[0],
      ascending: sortItem[1] == "true" ? true : false,
    };

    const tempSearch = await PostAdSaleSearch(data);
    await ConvertAPIImagesToBase64(tempSearch);
    dispatch(PREVIEW_DATA(tempSearch));
    dispatch(SHOW_NULL_BUTTON(true));

  };

  const changeSortHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let sortItem = e.target.value.split(",");
    dispatch(
      ADD_SORT({
        sort: sortItem[0],
        ascending: sortItem[1],
      })
    );

    const data = {
      brands: dataFilter?.model?.join(",") ?? -1,
      models: dataFilter?.model?.join(",") ?? -1,
      car_damaged: dataFilter.carDamage.join(" - "),
      min_price: +dataFilter.min_price ? +dataFilter.min_price : -1,
      max_price: +dataFilter.max_price ? +dataFilter.max_price : -1,
      min_Mileage: newCar
        ? 0
        : +dataFilter.min_Mileage
        ? +dataFilter.min_Mileage
        : -1,
      max_Mileage: newCar
        ? 0
        : +dataFilter.max_Mileage
        ? +dataFilter.max_Mileage
        : -1,
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
      lat: dataFilter.mapData.latitude,
      long: dataFilter.mapData.longitude,
      distance: dataFilter.distance,
      engine_volume: -1,
      engine_power: -1,
      engine_torque: -1,
      sort: sortItem[0],
      ascending: sortItem[1] == "true" ? true : false,
    };
  
    const tempSearch = await PostAdSaleSearch(data);
    await ConvertAPIImagesToBase64(tempSearch);
    dispatch(PREVIEW_DATA(tempSearch));
    dispatch(SHOW_NULL_BUTTON(true));
  };

  const showMenuHandler = () => {
    setShowMenu((prv) => !prv);
  };

  const closeMenuHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowMenu(false);
  };

  return (
    <div
      className="lg:mt-8 lg:col-span-3 tablet:col-span-3 md:col-span-2 md:bg-gray-150 md:border-0 border border-gray-200 rounded-lg leading-relaxed px-2 py-1 md:rounded-2xl flex items-center text-sm md:static md:z-0 z-10 fixed top-[8.5rem] right-28 md:cursor-auto cursor-pointer lg:z-auto zIndex-100"
      onClick={showMenuHandler}
    >
      <div className="flex items-center">
        <SyncAltIcon
          sx={{
            color: "#1242E0",
            transform: "rotate(90deg)",
            marginLeft: "2px",
            fontSize: {
              xs: "14px",
              md: "16px",
            },
          }}
        />

        <span className="md:block md:font-bold hidden font-medium ml-4">
          مرتب‌سازی براساس:
        </span>
        <span className="md:font-bold md:hidden block font-medium text-blue">
          به ترتیب...
        </span>
      </div>

      <CustomSelectBox
        normalData={true}
        data={staticData.filter_sort_items}
        title="قیمت/ کارکرد"
        customStyle={" rounded-lg bg-white mt-0 w-fit md:block hidden"}
        sort={true}
        onChange={changeSortHandler}
      />

      <div
        className={`md:hidden ${
          showMenu
            ? "fixed bottom-8 bg-white w-full right-0 block p-7 rounded-tr-2xl rounded-tl-2xl"
            : "hidden"
        }`}
        style={{
          boxShadow: "rgb(0 0 0 / 28%) 0px -20px 70px 20px",
        }}
      >
        <FormControl sx={{ width: "100%" }}>
          <div className="mb-3 flex justify-between items-center">
            <div>
              <SyncAltIcon
                sx={{
                  color: "#1242E0",
                  transform: "rotate(90deg)",
                  marginLeft: "2px",
                  fontSize: "16px",
                }}
              />
              <span className="text-lg font-bold">مرتب‌سازی براساس</span>
            </div>

            <button onClick={closeMenuHandler} className="cursor-pointer">
              <Close sx={{ color: "#727272" }} />
            </button>
          </div>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            {staticData.filter_sort_items.map((item) => (
              <FormControlLabel
                value={item.value}
                control={<Radio />}
                label={item.name}
                sx={{
                  borderBottom: "1px solid #F2F2F2",
                  width: "100%",
                  padding: "5px 0",
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default SelectSortBy;
