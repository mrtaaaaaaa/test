import { FormControl, FormHelperText, TextField } from "@mui/material";

export default function CustomTextarea({
  formik,
  name,
  label,
  placeholder,
  // inputValue = formik.values[name],
  row,
  customClass,
}) {
  
  return (
    <FormControl
      className={customClass}
      sx={{
        label: {
          color: "#1242E0",
          fontSize: "14px",
          padding: "0 32px 0 0",
          background: "#fff",
        },
      }}
    >
      {/* <FormLabel className="my-2" htmlFor={name}>{label}</FormLabel > */}
      <TextField
        error={formik?.errors[name] && formik?.touched[name] ? true : false}
        sx={{
          ".MuiInputBase-root": { borderRadius: "3px", fontSize: "12px" },
          fontSize: "14px",
        }}
        fullWidth
        label={label}
        placeholder={placeholder}
        name={name}
        {...formik.getFieldProps({ name })}
        // value={inputValue}
        multiline
        rows={row ? row : "10"}
        // defaultValue={defaultValue ? defaultValue : formik?.values[name]}
        InputProps={{
          startAdornment: <></>,
        }}
      />

      {formik?.errors[name] && formik?.touched[name] && (
        <FormHelperText
          className="p-0"
          sx={{
            marginLeft: 0,
            fontFamily: "IranSans",
            marginRight: 0,
            textAlign: "right",
            color: "#D90201",
          }}
        >
          {formik?.errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
}
