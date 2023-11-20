import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface PropTypes {
  formik: any;
  name: string;
  label: string;
  placeholder?: any;
}

export const PasswordInput = ({
  formik,
  name,
  label,
  placeholder,
}: PropTypes) => {

  const [showPass, setShowPass] = useState(false);
  const showPassHandler = () => {
    setShowPass(!showPass);
  };

  return (
    <FormControl
      className={`relative h-fit w-full `}
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
        sx={{
          // textAlign: "left",
          fontFamily: "IranSans",
          ".MuiInputBase-root": {
            borderRadius: "8px",
            fontSize: "12px",
            direction: "ltr",
          },
          fontSize: "14px",
          // input: { textAlign: "left" },
          direction: "ltr",
        }}
        inputProps={{
          style: {
            height: "10px",
            textAlign: "left",
            direction: "ltr",
          },
        }}
        name={name}
        type={showPass ? "text" : "password"}
        error={formik?.errors[name] && formik?.touched[name] ? true : false}
        {...formik?.getFieldProps({ name })}
        placeholder={placeholder}
        variant="outlined"
        fullWidth
        label={label}
        InputProps={{
          endAdornment: <></>,
          startAdornment: (
            <button onClick={showPassHandler} type="button">
              {showPass ? (
                <InputAdornment position="end" className="text-sm">
                  <RemoveRedEyeIcon sx={{ fontSize: "16px" }} />
                </InputAdornment>
              ) : (
                <InputAdornment position="end" className="text-sm">
                  <VisibilityOffIcon sx={{ fontSize: "16px" }} />
                </InputAdornment>
              )}
            </button>
          ),
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
};
