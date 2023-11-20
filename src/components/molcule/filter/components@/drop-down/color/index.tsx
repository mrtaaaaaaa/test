import CustomCheckBox from "@/molcule/filter/components@/check-box";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  ADD_COLORS,
  REMOVE_COLOR,
  filterSelector,
} from "@/redux/filter/filter-slice";
import MenuItem from "@mui/material/MenuItem";
// import CustomDropDown from "../custom-drop-down";
import { DropDownColorType } from "./type";
import CustomDropDown from "../custom-drop-down";

export default function DropDownColor({ colors }: DropDownColorType) {
  const dataFilter = useAppSelector(filterSelector);
  const dispatch = useAppDispatch();

  const changeHandler = (value: string) => {
    if (dataFilter.colors.includes(value)) {
      dispatch(REMOVE_COLOR(value));
    } else {
      dispatch(ADD_COLORS(value));
    }
  };

  return (
    <CustomDropDown label="رنگ بدنه" value={dataFilter.colors}>
      {colors?.map(({ label, value }) => (
        <MenuItem key={label} value={label} sx={{ fontSize: "12px" }}>
          <span
            className="w-4 h-4 rounded-full ml-2"
            style={{ background: value }}
          ></span>
          <CustomCheckBox
            check={dataFilter.colors.includes(label) ? true : false}
            label={label}
            onChange={() => changeHandler(label)}
          />
        </MenuItem>
      ))}
    </CustomDropDown>
  );
}
