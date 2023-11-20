"use client";
import { staticData } from "@/data";
import { ADD_CAR_MODEL } from "@/redux/brand-model/brand-model-slice";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";
import { SelectBox } from "./select-box";

const SelectYear = ({
  formik,
  required = false,
  handleYearChange,
  name,
  customYears = false,
  defaultValue,
}) => {
  const { category } = useAppSelector((state) => state.brandModel);
  const [yearMiladi, setYearMiladi] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (category) {
      setYearMiladi(true);
    } else {
      setYearMiladi(false);
    }
  }, [category]);

  const changeYearHandler = (e) => {
    setYearMiladi((prev) => !prev);
    if (formik) {
      let formikValue = formik.values;
      formik.setValues({
        ...formikValue,
        year_of_manufacture: "",
      });
    }
    dispatch(
      ADD_CAR_MODEL({
        name: "brand",
        value: e.target.value,
      })
    );
  };

  return (
    <div className="relative">
      <span
        className={`${
          yearMiladi ? "bg-blue-100 text-blue " : "bg-blue text-blue-100 "
        }px-2 py-1 rounded-full absolute left-2 z-10 cursor-pointer top-2`}
        onClick={changeYearHandler}
        style={{ fontSize: "10px" }}
      >
        {yearMiladi ? "تغییر به شمسی" : " تغییر به میلادی"}
      </span>

      <SelectBox
        selectedValue={defaultValue}
        handleClick={handleYearChange}
        formik={formik}
        options={
          !yearMiladi
            ? customYears
              ? staticData.year_shamsi_values.slice(0, 6)
              : staticData.year_shamsi_values
            : customYears
            ? staticData.year_miladi_values.slice(0, 11)
            : staticData.year_miladi_values
        }
        name={name ? name : "year_of_manufacture"}
        label="سال ساخت"
        width="100%"
        required={required}
      />
    </div>
  );
};

export default SelectYear;
