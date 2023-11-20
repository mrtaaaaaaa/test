//@ts-nocheck
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";

export const InputNumberSeprator = ({
  formik,
  name,
  label,
  placeholder,
  type,
  showEndAdorMent,
  showEndAdorMentValue,
  classes,
  classNames,
  defaultValue,
  hint,
}:any) => {
  const [value, setValue] = useState({
    formattedValue: formik.values[name]
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    value: formik.values[name],
  });

  const changeInputHandler = (e) => {
    const { value } = e.target;

    const sanitizedValue = value.replace(/,/g, "");
    formik.setFieldValue(name, Number(sanitizedValue));

    if (!isNaN(sanitizedValue)) {
      // Format the number with commas
      const formattedValue = Number(sanitizedValue).toLocaleString();
      setValue({ price: sanitizedValue, formattedValue: formattedValue });
    } else {
      return;
    }
  };

  return (
    <FormControl
      className={`relative h-fit ${classNames}`}
      sx={{
        label: {
          color: "#1242E0",
          fontSize: "14px",
          padding: "0 32px 0 0",
          background: "#fff",
          fontFamily: "IranSans",
        },
      }}
    >
      <TextField
        autoComplete="off"
        inputProps={{
          style: {
            height: "10px",
            textAlign: "left",
            direction: "ltr",
          },
        }}
        error={formik?.errors[name] && formik?.touched[name] ? true : false}
        sx={{
          ".MuiInputBase-root": { borderRadius: "3px", fontSize: "12px" },
          fontSize: "14px",
        }}
        className={`${classes}`}
        onChange={changeInputHandler}
        variant="outlined"
        fullWidth
        label={label}
        name={name}
        type={type}
        value={value.formattedValue}
        onBlur={formik.handleBlur}
        defaultValue={defaultValue ? defaultValue : formik?.values[name]}
        placeholder={placeholder}
        InputProps={{
          startAdornment: <></>,
          endAdornment: showEndAdorMent && (
            <InputAdornment position="end">
              <span className="text-xs">{showEndAdorMentValue}</span>
            </InputAdornment>
          ),
        }}
      />

      {!formik?.errors[name] && (
        <FormHelperText className="p-0 absolute -bottom-5">
          {hint &&
            (formik?.values[name] !== null || formik?.values[name] !== 0) && (
              <span>
                {formik?.values[name]
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                میلیون تومان
              </span>
            )}
        </FormHelperText>
      )}

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
};

InputNumberSeprator.defaultProps = {
  type: "text",
  showEndAdorMent: false,
  classes: "bg-white",
  defaultValue: "",
  hint: false,
};
