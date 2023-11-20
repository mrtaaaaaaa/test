import { FormControl, FormHelperText, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";


const ColorSelect = ({
  formik,
  name,
  label,
  inputValue = formik?.values[name],
  selectedValue = "",
  selectValue,
  handleClick,
  colors
}) => {
  return (
    <FormControl
      sx={{
        label: {
          color: "#1242E0",
          fontSize: "14px",
          padding: "0 32px 0 0",
          background: "#fff",
        },
      }}
    >
      <TextField
        name={name}
        sx={{
          ".MuiInputBase-root": {
            borderRadius: "3px",
            fontSize: "12px",
            height: "43px",
          },
          fontSize: "12px",
          input: {
            height: "10px",
          },
          background: "#FFF",
          borderRadius: "8px",
        }}
        error={formik?.errors[name] && formik?.touched[name] ? true : false}
        displayempty
        {...formik?.getFieldProps({ name })}
        value={inputValue}
        label={label}
        defaultValue={selectedValue}
        InputProps={{
          startAdornment: <></>,
        }}
        select // tell TextField to render select
      >
        <MenuItem value="" sx={{ display: "none", fontSize: "12px" }}>
          {selectValue}
        </MenuItem>

        {colors?.map((option) => (
          <MenuItem
            key={option.value}
            value={option.label}
            onClick={handleClick}
            sx={{ fontSize: "12px" }}
          >
            <span
              className="w-4 h-4 rounded-full ml-2"
              style={{ background: option.value }}
            ></span>{" "}
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      {formik?.errors[name] && formik?.touched[name] && (
        <FormHelperText sx={{ marginLeft: 0, color: "#D90201" }}>
          {formik?.errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};
export default ColorSelect;
