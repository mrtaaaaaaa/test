import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { CustomDropDownType } from "./type";

export default function CustomDropDown({
  label,
  value,
  children,
}: CustomDropDownType) {
  return (
    <FormControl
      sx={{
        ".muirtl-47lyta-MuiFormLabel-root.Mui-focused": {
          color: "#000!important",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "1px solid transparent",
        },
        width: "100%",
        position: "relative",
      }}
    >
      <span
        className="mb-2 block absolute right-3 -top-2 bg-white pr-2 pl-6 text-gray"
        style={{ fontSize: "12px", zIndex: "1" }}
      >
        {label}
      </span>
      <Select
        multiple
        value={value}
        className="border border-[#C4C4C4] text-right rounded-lg py-2 px-2 md:truncate h-[43px] text-xs w-full"
        sx={{
          all: "unset",
          borderRadius: "8px",
          fontSize: "12px",
          height: "43px",
          alignItems: "center",
        }}
        input={<OutlinedInput label="Tag" sx={{ all: "unset" }} />}
        renderValue={(selected) => selected.join(", ")}
      >
        {children}
      </Select>
    </FormControl>
  );
}
