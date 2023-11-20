import { staticData } from "@/data";
import { ADD_MAX_MILEAGE, ADD_MIN_MILEAGE } from "@/redux/filter/filter-slice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";

const SelectMileage = () => {
  const dispatch = useAppDispatch();
  const dataFilter = useAppSelector((state) => state.filter);
  const [selectedValue, setSelectedValue] = useState(
    dataFilter.min_Mileage == -1 ? 1000 : dataFilter.min_Mileage
  );

  const minMileageChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(ADD_MIN_MILEAGE(e.target.value));
    setSelectedValue(+e.target.value);
  };

  const maxPriceChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(ADD_MAX_MILEAGE(e.target.value));
  };

  const minMileageArray = staticData.mileages.filter((m) => {
    return m.value > selectedValue;
  });

  return (
    <div>
      <div className="sm:grid sm:grid-cols-2 flex sm:flex-row flex-col justify-between gap-4">
        <div className="flex items-center gap-2 relative">
          <label
            className="mb-2 block absolute right-3 -top-2 bg-white pr-2 pl-6 text-gray"
            style={{ fontSize: "12px" }}
          >
            کارکرد
          </label>
          <select
            name="min"
            className="customSelect border border-[#C4C4C4] text-right rounded-lg py-2 px-2 w-full md:truncate h-[43px] text-xs"
            onChange={minMileageChangeHandler}
          >
            {(dataFilter.min_Mileage == -1 || dataFilter.min_Mileage == 0) && (
              <option hidden>حداقل کارکرد</option>
            )}

            {staticData.mileages.map((mileage) => (
              <option
                className="text-gray font-light "
                key={mileage.value}
                value={mileage.value}
                selected={
                  mileage.value == dataFilter.min_Mileage ? true : false
                }
              >
                {mileage.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 relative">
          <label
            className="mb-2 block absolute right-3 -top-2 bg-white pr-2 pl-6 text-gray"
            style={{ fontSize: "12px" }}
          >
            کارکرد
          </label>
          <select
            name="max"
            className="customSelect border border-[#C4C4C4] text-right rounded-lg py-2 px-2 w-full md:truncate h-[43px] text-xs"
            onChange={maxPriceChangeHandler}
          >
            {(dataFilter.max_Mileage == -1 || dataFilter.max_Mileage == 0) &&(
              <option hidden selected>
                حداکثر کارکرد
              </option>
            )}

            {Array.isArray(minMileageArray)
              ? minMileageArray.map((mileage) => (
                  <option
                    className="text-gray font-light"
                    key={mileage.value}
                    value={mileage.value}
                    selected={
                      mileage.value == dataFilter.max_Mileage ? true : false
                    }
                  >
                    {mileage.label}
                  </option>
                ))
              : staticData.mileages.map((mileage) => (
                  <option
                    className="text-gray font-light"
                    key={mileage.value}
                    value={mileage.value}
                    selected={
                      mileage.value == dataFilter.max_Mileage ? true : false
                    }
                  >
                    {mileage.label}
                  </option>
                ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectMileage;
