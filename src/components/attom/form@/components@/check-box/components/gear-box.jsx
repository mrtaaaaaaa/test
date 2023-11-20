import React from "react";
import CustomCheckBox from "@/molcule/filter/components@/check-box";
import { useDispatch, useSelector } from "react-redux";
import { ADD_GEAR_BOX_TYPES, REMOVED_GEAR } from "@/redux/filter/filter-slice";

export default function GearBox() {
  const items = ["اتوماتیک", "دستی"];
  const dataFilter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    if (dataFilter.gear_box_types.includes(value)) {
      dispatch(REMOVED_GEAR(value));
    } else {
      dispatch(ADD_GEAR_BOX_TYPES(value));
    }
  };

  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <CustomCheckBox
          check={dataFilter.gear_box_types.includes(item) ? true : false}
          label={item}
          onChange={() => changeHandler(item)}
        />
      ))}
    </div>
  );
}
