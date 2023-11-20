import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useState } from "react";

export default function SelectCustom({ options, formik, name, label }) {
  const [selectValue, setSelectValue] = useState(
    formik?.values[name] ? formik?.values[name] : ""
  );

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectValue(value);

    if (formik) {
      formik.setFieldValue(name, value);
    }
  };

  return (
    <FormControl
      className={`relative h-fit`}
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
      <label
        style={{
          fontSize: "11px",
          zIndex: "2",
          paddingRight: "8px",
          paddingLeft: "16px",
          top: "-10px",
        }}
        className=" bg-white w-fit -mb-2 mr-2 text-blue rounded-lg absolute"
      >
        {label}
      </label>

      <Select
        sx={{
          ".MuiInputBase-root": {
            borderRadius: "3px",
            fontSize: "13px",
            height: "43px",
          },
          fontSize: "12px",
          input: {
            height: "10px",
          },
          background: "#FFF",
          borderRadius: "4px",
        }}
        displayempty
        name={name}
        error={
          formik && formik?.errors[name] && formik?.touched[name] ? true : false
        }
        onBlur={formik ? formik.handleBlur : ""}
        value={selectValue}
        onChange={handleChange}
        input={<OutlinedInput />}
      >
        <MenuItem disabled value="" sx={{ fontSize: "12px" }}>
          <span className="text-gray-400">انتخاب کنید</span>
        </MenuItem>
        {options?.map(({ label, value }) => (
          <MenuItem key={label} value={value} sx={{ fontSize: "12px" }}>
            {label}
          </MenuItem>
        ))}
      </Select>

      {formik && formik?.errors[name] && formik?.touched[name] && (
        <FormHelperText
          className="p-0"
          sx={{ marginLeft: 0, color: "#D90201" }}
        >
          {formik?.errors[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
}
