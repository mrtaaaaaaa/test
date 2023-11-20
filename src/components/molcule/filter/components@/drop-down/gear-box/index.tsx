import { staticData } from "@/data";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  ADD_GEAR_BOX_TYPES,
  REMOVED_GEAR,
  filterSelector,
} from "@/redux/filter/filter-slice";
import MenuItem from "@mui/material/MenuItem";
import CustomCheckBox from "../../check-box";
import CustomDropDown from "../custom-drop-down";

export default function DropDownGearBox() {
  const { gear_box_types } = useAppSelector(filterSelector);

  const dispatch = useAppDispatch();

  const changeHandler = (value: string) => {
    if (gear_box_types.includes(value)) {
      dispatch(REMOVED_GEAR(value));
    } else {
      dispatch(ADD_GEAR_BOX_TYPES(value));
    }
  };

  return (
    <CustomDropDown label="گیربکس" value={gear_box_types}>
      {staticData.gearbox_type.map(({ label }) => (
        <MenuItem key={label} value={label} sx={{ fontSize: "12px" }}>
          <CustomCheckBox
            check={gear_box_types.includes(label) ? true : false}
            label={label}
            onChange={() => changeHandler(label)}
          />
        </MenuItem>
      ))}
    </CustomDropDown>
  );
}
