import { staticData } from "@/data";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { ADD_CARDAMAGE, filterSelector } from "@/redux/filter/filter-slice";
import { useEffect, useState } from "react";
const { default: ReactSelect } = require("react-select");

const CarDamageFilter = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState([]);

  const dataFilter = useAppSelector(filterSelector);

  const handleSelectChange = (value: any) => {
    setValue(value);
    dispatch(ADD_CARDAMAGE(value));
  };

  useEffect(() => {
    if (dataFilter.carDamage.length === 0) {
      setValue([]);
    }
  }, [dataFilter.carDamage]);

  return (
    <ReactSelect
      isMulti
      onChange={handleSelectChange}
      options={staticData.car_damaged_type.map((es) => {
        es.label = es.label;
        es.value = es.value;
        return es;
      })}
      value={value}
      placeholder="وضعیت بدنه را انتخاب کنید"
      isSearchable
    />
  );
};
export default CarDamageFilter;
