import { staticData } from "@/data";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  ADD_FUEL_TYPES,
  REMOVED_FUEL,
  filterSelector,
} from "@/redux/filter/filter-slice";
import MenuItem from "@mui/material/MenuItem";
import CustomCheckBox from "../../check-box";
import CustomDropDown from "../custom-drop-down";

export default function DropDownFuelType() {
  const { fuel_types } = useAppSelector(filterSelector);
  const dispatch = useAppDispatch();

  const changeHandler = (value: string) => {
    if (fuel_types.includes(value)) {
      dispatch(REMOVED_FUEL(value));
    } else {
      dispatch(ADD_FUEL_TYPES(value));
    }
  };

  return (
    <CustomDropDown label="نوع سوخت" value={fuel_types}>
      {staticData.fuel_types.map(({ label }) => (
        <MenuItem key={label} value={label} sx={{ fontSize: "12px" }}>
          <CustomCheckBox
            check={fuel_types.includes(label) ? true : false}
            label={label}
            onChange={() => changeHandler(label)}
          />
        </MenuItem>
      ))}
    </CustomDropDown>
  );
}
