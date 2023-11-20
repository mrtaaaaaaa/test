import {
  ADD_CAR_DETAILS_INFO,
  pricingSelector,
} from "@/redux/pricing/pricing-slice";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";

const CustomSwitch = ({ label, name }) => {
  const pricingData = useAppSelector(pricingSelector);

  const dispatch = useAppDispatch();

  function handleClick(e) {
    if (e.target.value === pricingData[name]) {
      dispatch(
        ADD_CAR_DETAILS_INFO({
          name: name,
          state: "none",
        })
      );
    } else {
      dispatch(
        ADD_CAR_DETAILS_INFO({
          name: name,
          state: e.target.value,
        })
      );
    }
  }

  return (
    <div className="grid grid-cols-2 lg:gap-6 md:gap-4 gap-2 items-center lg:px-4 px-0">
      <span>{label}</span>
      <div className="flex justify-end">
        <FormControl
          component="fieldset"
          sx={{
            fontSize: { xs: "12px", md: "14px" },
            div: {
              flexWrap: "nowrap",
            },
          }}
        >
          <RadioGroup
            name="gender1"
            value={pricingData[name]}
            sx={{ flexDirection: "row" }}
            className="flex gap-2 bg-gray-250 rounded-lg p-1 w-fit"
          >
            <FormControlLabel
              value="colored"
              control={<Radio onClick={handleClick} sx={{ display: "none" }} />}
              label="رنگ‌شده"
              sx={{
                all: "unset",
                display: "block",
                padding: "4px 8px",
                background:
                  pricingData[name] === "colored" ? "#1242E0" : "#FFF",
                color: pricingData[name] === "colored" ? "#FFF" : "#818181",
                borderRadius: "6px",
                cursor: "pointer",
                boxShadow:
                  "0px 6px 6px -6px rgba(0, 0, 0, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4)",
                span: { fontSize: "12px" },
                fontSize: { xs: "12px", md: "14px" },
                transition: ".3s all ease-out",
              }}
            />
            <FormControlLabel
              value="replaced"
              control={<Radio onClick={handleClick} sx={{ display: "none" }} />}
              label="تعویض‌شده"
              sx={{
                all: "unset",
                display: "block",
                padding: "4px 8px",
                background:
                  pricingData[name] === "replaced" ? "#1242E0" : "#FFF",
                color: pricingData[name] === "replaced" ? "#FFF" : "#818181",
                borderRadius: "6px",
                cursor: "pointer",
                boxShadow:
                  "0px 6px 6px -6px rgba(0, 0, 0, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4)",
                span: { fontSize: "12px" },
                fontSize: "12px",
                transition: ".3s all ease-out",
              }}
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default CustomSwitch;
