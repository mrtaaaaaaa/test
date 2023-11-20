import { staticData } from "@/data";
import {
  ADD_MAX_YEAR_MANUFACTURE,
  ADD_MIN_YEAR_MANUFACTURE,
  filterSelector,
} from "@/redux/filter/filter-slice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SelectYearFilter() {
  const dataFilter = useSelector(filterSelector);
  const [yearChange, setYearChange] = useState(true);
  const [minYear, setMinYear] = useState(0);

  const dispatch = useDispatch();

  const handleYearType = () => {
    setYearChange(!yearChange);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.target.value;
    let name = e.target.name;

    switch (name) {
      case "minOfManufacture": {
        dispatch(ADD_MIN_YEAR_MANUFACTURE(value)), setMinYear(+value);
      }
      case "maxOfManufacture": {
        dispatch(ADD_MAX_YEAR_MANUFACTURE(value));
      }
    }
  };

  let minYearOfMaufacture: any[] = [];

  // useEffect(() => {
  if (yearChange) {
    minYearOfMaufacture = staticData.year_shamsi_values.filter((year) => {
      return year.value > minYear;
    });
  } else if (!yearChange) {
    minYearOfMaufacture = staticData.year_miladi_values.filter((year) => {
      return year.value > minYear;
    });
  }
  // }, []);

  return (
    <div>
      <div className="flex items-center gap-2 relative">
        <div className="w-full grid md:grid-cols-2 grid-cols-1 justify-between gap-3">
          <div className="flex gap-2  items-center relative">
            <label
              className="mb-2 block absolute right-6 -top-2 bg-white pr-2 pl-6 text-blue"
              style={{ fontSize: "12px" }}
            >
              سال ساخت
            </label>
            <span>از</span>
            <select
              className="customSelect border border-[#C4C4C4] text-right rounded-lg py-2 px-2 w-full md:truncate h-[43px] text-xs"
              onChange={handleChange}
              defaultValue={
                dataFilter?.min_year_of_manufacture !== -1
                  ? dataFilter.min_year_of_manufacture
                  : yearChange
                  ? "1350"
                  : "1995"
              }
              name="minOfManufacture"
            >
              {yearChange
                ? staticData.year_shamsi_values.map(({ label, value }) => (
                    <option value={value}>{label}</option>
                  ))
                : staticData.year_miladi_values.map(({ label, value }) => (
                    <option value={value}>{label}</option>
                  ))}
            </select>
          </div>
          <div className="flex gap-2  items-center relative">
            <label
              className="mb-2 block absolute right-6 -top-2 bg-white pr-2 pl-6 text-blue"
              style={{ fontSize: "12px" }}
            >
              سال ساخت
            </label>

            <span>تا</span>
            <select
              className="customSelect border border-[#C4C4C4] text-right rounded-lg py-2 px-2 w-full md:truncate h-[43px] text-xs"
              onChange={handleChange}
              name="maxOfManufacture"
            >
              {minYearOfMaufacture?.map(({ value, label }) => (
                <option value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <span
          className={`${
            yearChange ? "bg-blue text-blue-100 " : "bg-blue-100 text-blue "
          }rounded-full  left-0 z-10 cursor-pointer top-0 text-center`}
          onClick={handleYearType}
          style={{ fontSize: "10px", padding: "3px 8px" }}
        >
          {yearChange ? " تغییر به میلادی" : "تغییر به شمسی"}
        </span>
      </div>
    </div>
  );
}
