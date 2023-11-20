import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputBase,
  TextField,
} from "@mui/material";
import styled from "styled-components";

export const CustomInput = styled(InputBase)`
  border: 0px;
  padding: 7px 10px;
  border-radius: 3px;
  background: #f3f3f3;
  transition: 0.3s ease;
  font-size: 14px !important;
  border: 1px solid #fff;
  margin-top: 8px;
  &:focus {
    outline: none;
  }
  &.Mui-focused {
    border: 1px solid #83c1d5;
  }
`;

export const FormInput = ({
  changeHandler,
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
  disabled = false,
}: any) => {
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
          },
        }}
        disabled={disabled}
        error={formik?.errors[name] && formik?.touched[name] ? true : false}
        sx={{
          ".MuiInputBase-root": { borderRadius: "3px", fontSize: "12px" },
          fontSize: "14px",
        }}
        className={`${classes} form-inp`}
        variant="outlined"
        fullWidth
        label={label}
        name={name}
        type={type}
        onChange={formik ? formik.handleChange : changeHandler}
        {...formik?.getFieldProps({ name })}
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
            (formik?.values.price !== null || formik?.values.price !== 0) && (
              <span>
                {formik?.values.price
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

FormInput.defaultProps = {
  type: "text",
  showEndAdorMent: false,
  classes: "bg-white",
  defaultValue: "",
  hint: false,
};
