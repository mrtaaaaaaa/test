import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CustomCheckBoxType } from "./type";

export default function CustomCheckBox({
  label,
  onChange,
  check,
}: CustomCheckBoxType) {
  return (
    <FormControlLabel
      control={<Checkbox checked={check} onChange={onChange} />}
      label={label}
      sx={{
        width: "100%",
        fontSize: "12px",
        ".MuiTypography-root": { fontSize: "14px" },
      }}
    />
  );
}
