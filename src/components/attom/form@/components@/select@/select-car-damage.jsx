import CustomCheckBox from "@/molcule/filter/components@/check-box";
import { staticData } from "@/data";
import { FormLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";

export default function SelectCarDamage({
  setCarDamageValue,
  carDamageValue,
  formik,
}) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCarDamageValue(value);
    let formikValue = formik.values;
    formik.setValues({
      ...formikValue,
      car_damaged: String(value),
    });
  };

  return (
    <div>
      <FormControl
        sx={{
          ".muirtl-47lyta-MuiFormLabel-root.Mui-focused": {
            color: "#000!important",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1px solid transparent",
          },
          width: "100%",
        }}
      >
        <FormLabel
          className="font-medium"
          sx={{
            ".muirtl-1oxaxtj-MuiFormLabel-root.Mui-focused": {
              color: "#000!important",
            },
            color: "#333333",
            ".muirtl-1ww209g-MuiFormLabel-root.Mui-error": {
              color: "#000!important",
            },
            marginBottom: "8px",
          }}
        >
          وضعیت بدنه
        </FormLabel>

        <Select
          multiple
          value={carDamageValue}
          onChange={handleChange}
          name="car_damaged"
          className="custom-select w-full"
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected?.join(", ")}
        >
          {staticData.car_damaged_type.map(({ label }) => (
            <MenuItem key={label} value={label}>
              <CustomCheckBox
                check={carDamageValue.indexOf(label) > -1}
                label={label}
              />
            </MenuItem>
          ))}
        </Select>

        {formik && formik.errors.car_damaged && formik.touched.car_damaged && (
          <span className="text-red-500 text-xs">
            {formik.errors.car_damaged}
          </span>
        )}
      </FormControl>
    </div>
  );
}
