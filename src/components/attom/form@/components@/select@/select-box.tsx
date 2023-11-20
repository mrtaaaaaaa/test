import { FormControl, FormHelperText, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export const SelectBox = ({
  formik,
  options,
  name,
  label,
  // inputValue = formik?.values[name],
  selectedValue,
  handleClick,
  width,
}: any) => {
  return (
    <FormControl
      sx={{
        label: {
          color: "#1242E0",
          fontSize: "14px",
          padding: "0 32px 0 0",
          background: "#fff",
        },
        width: width,
      }}
    >
      {/* <InputLabel position="top">{label}</InputLabel> */}

      <TextField
        onChange={handleClick}
        name={name}
        sx={{
          ".MuiInputBase-root": {
            borderRadius: "3px",
            fontSize: "12px",
            height: "43px",
          },
          fontSize: "14px",
          input: {
            height: "10px",
          },
          background: "#FFF",
          borderRadius: "3px",
        }}
        error={formik?.errors[name] && formik?.touched[name] ? true : false}
        displayempty
        {...formik?.getFieldProps({ name })}
        // value={inputValue}
        label={label}
        defaultValue={selectedValue}
        InputProps={{
          startAdornment: <></>,
        }}
        select
      >
        <MenuItem
          selected
          disabled
          value="انتخاب کنید"
          sx={{ fontSize: "12px" }}
        >
          {selectedValue ? selectedValue : "انتخاب کنید"}
        </MenuItem>

        {options?.map((option) =>
          option?.areas ? (
            option?.areas?.map((area, index) => {
              return (
                <MenuItem
                  key={index}
                  value={area}
                  data-score={option.score ? option.score : ""}
                  onClick={handleClick}
                  sx={{ fontSize: "12px" }}
                >
                  {area}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem
              key={option.value}
              value={option.value}
              data-score={option.score ? option.score : ""}
              onClick={handleClick}
              sx={{ fontSize: "12px" }}
            >
              {option.label ? option.label : option.value}
            </MenuItem>
          )
        )}
      </TextField>
      {formik?.errors[name] && formik?.touched[name] && (
        <FormHelperText
          className="p-0"
          sx={{ marginLeft: 0, color: "#D90201" }}
        >
          {formik?.errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};
