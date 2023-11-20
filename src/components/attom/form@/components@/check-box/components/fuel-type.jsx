import { ADD_FUEL_TYPES, REMOVED_FUEL } from "@/redux/filter/filter-slice";
import { useDispatch, useSelector } from "react-redux";
import CustomCheckBox from "@/molcule/filter/components@/check-box";

export default function FuelTypes() {
  const items = [
    "بنزینی",
    "دوگانه‌سوز (CNG)",
    "دوگانه‌سوز (LPG)",
    "هیبرید",
    "دیزلی",
  ];
  const dataFilter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    if (dataFilter.fuel_types.includes(value)) {
      dispatch(REMOVED_FUEL(value));
    } else {
      dispatch(ADD_FUEL_TYPES(value));
    }
  };

  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <CustomCheckBox
          check={dataFilter.fuel_types.includes(item) ? true : false}
          label={item}
          onChange={() => changeHandler(item)}
        />
      ))}
    </div>
  );
}
