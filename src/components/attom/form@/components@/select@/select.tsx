import { MenuItem, Select } from "@mui/material";

const CustomSelect = ({
  options,
  label,
  defaultValue,
  value,
  handleChange,
  error,
}) => {
  return (
    <div className="relative">
      <span className="block font-medium">{label}</span>
      <Select
        value={value}
        onChange={handleChange}
        fullWidth
        displayEmpty
        className="bg-gray-150 h-auto max-h-32 overflow-y-auto text-yellow-300 my-2 custom-select rounded px-2 w-full md:truncate text-sm"
        sx={{
          fontSize: "14px",

          "& .muirtl-1d3z3hw-MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
      >
        <MenuItem value="" sx={{ display: "none" }}>
          <>{defaultValue}</>
        </MenuItem>
        {options?.map(({ value, label }) => (
          <MenuItem value={value} sx={{ fontSize: "14px", textAlign: "left" }}>
            {label}
          </MenuItem>
        ))}
      </Select>

      {error && (
        <span className="absolute text-red-500 text-xs -bottom-3 block">
          {error}
        </span>
      )}
    </div>
  );
};

export default CustomSelect;
