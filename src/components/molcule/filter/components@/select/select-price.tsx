import { staticData } from "@/data";
import { ADD_MAX_PRICE, ADD_MIN_PRICE } from "@/redux/filter/filter-slice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";

const SelectPrice = () => {
  const dispatch = useAppDispatch();
  const dataFilter = useAppSelector((state) => state.filter);
  const [selectedValue, setSelectedValue] = useState<number>(
    dataFilter.min_price == -1 ? 60 : dataFilter.min_price / 1000000
  );

  const minPriceChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(ADD_MIN_PRICE(String(e.target.value)));
    setSelectedValue(+e.target.value);
  };

  const maxPriceChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(ADD_MAX_PRICE(String(e.target.value)));
  };

  const minPriceArray = staticData.prices.filter((p) => {
    return p.value > selectedValue;
  });

  return (
    <div>
      <div className="flex flex-col justify-between gap-6">
        <div className="flex items-center gap-2 relative">
          <label
            className="mb-2 block absolute right-3 -top-2 bg-white pr-2 pl-6 text-gray"
            style={{ fontSize: "12px" }}
          >
            حداقل قیمت
            <span style={{ fontSize: "9px" }}> (میلیون تومان)</span>
          </label>
          <select
            name="min"
            className="customSelect border border-[#C4C4C4] text-right rounded-lg py-2 px-2 w-full md:truncate h-[43px] text-xs"
            onChange={minPriceChangeHandler}
          >
            {dataFilter.min_price == -1 && <option hidden></option>}
            {staticData.prices.map((price) => (
              <option
                className="text-gray font-light"
                key={price.value}
                value={price.value}
                selected={
                  price.value == dataFilter.min_price / 1000000 ? true : false
                }
              >
                {price.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 relative">
          <label
            className="mb-2 block absolute right-3 -top-2 bg-white pr-2 pl-6 text-gray"
            style={{ fontSize: "12px" }}
          >
            حداکثر قیمت
            <span style={{ fontSize: "9px" }}> (میلیون تومان) </span>
          </label>
          <select
            name="max"
            className="customSelect border border-[#C4C4C4] text-right rounded-lg py-2 px-2 w-full md:truncate h-[43px] text-xs"
            onChange={maxPriceChangeHandler}
          >
            {dataFilter.max_price == -1 && <option hidden selected></option>}

            {Array.isArray(minPriceArray)
              ? minPriceArray.map((price) => (
                  <option
                    className="text-gray font-light"
                    key={price.value}
                    value={price.value}
                    selected={
                      price.value == dataFilter.max_price / 1000000
                        ? true
                        : false
                    }
                  >
                    {price.label}
                  </option>
                ))
              : staticData.prices.map((price) => (
                  <option
                    className="text-gray font-light"
                    key={price.value}
                    value={price.value}
                    selected={
                      price.value == dataFilter.max_price / 1000000
                        ? true
                        : false
                    }
                  >
                    {price.label}
                  </option>
                ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectPrice;
