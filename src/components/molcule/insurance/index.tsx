import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { ADD_INSURANCE, filterSelector } from "@/redux/filter/filter-slice";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import React, { useState } from "react";
import { InsuranceType } from "./type";

const Insurances = () => {
  const dispatch = useAppDispatch();
  const dataFilter = useAppSelector(filterSelector);

  const [checked, setChecked] = useState<InsuranceType>({
    ThirdPartyInsurance: dataFilter.insurances.ThirdPartyInsurance,
  });

  const insurances = [{ name: "ThirdPartyInsurance", value: "بیمه شخص ثالث " }];

  const changeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    let data = {
      name: e.target.name,
      value: e.target.checked,
    };
    dispatch(ADD_INSURANCE(data));
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };
  return (
    <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
      {insurances.map((insure) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={checked[insure.name]}
              name={insure.name}
              onChange={changeCheckBox}
            />
          }
          label={insure.value}
        />
      ))}
    </FormGroup>
  );
};

export default Insurances;
