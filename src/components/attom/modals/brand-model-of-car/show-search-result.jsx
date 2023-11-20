import { Checkbox, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_BRAND,
  ADD_MODEL,
  ADD_TYPE,
  REMOVED_MODEL,
  REMOVED_TYPE,
  REMOVE_SHOW_CAR,
  SET_SHOW_CAR,
} from "@/redux/filter/filter-slice";

const ShowSearchResult = ({
  customHandleChange,
  result,
  handleClose,
  indexOfBrand,
  brand,
}) => {
  const { multiple } = useSelector((state) => state.brandModel);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const dataFilter = useSelector((state) => state.filter);

  const handleRadio = (e, category, model, type) => {
    setValue(e.target.value);
    customHandleChange(e, indexOfBrand, category, brand, model, type);
    handleClose();
  };

  const handleCheckBox = (value, carModel) => {
    if (dataFilter.shownCars.includes(value)) {
      dispatch(
        REMOVE_SHOW_CAR(dataFilter.shownCars.filter((item) => item !== value))
      );
    } else {
      dispatch(SET_SHOW_CAR(value));
    }

    dispatch(ADD_BRAND(brand));

    //model
    if (dataFilter.model.includes(carModel)) {
      dispatch(
        REMOVED_MODEL(dataFilter.model.filter((item) => item !== carModel))
      );
    } else {
      dispatch(ADD_MODEL(carModel));
    }

    //type
    if (dataFilter.type.includes(value)) {
      dispatch(REMOVED_TYPE(dataFilter.type.filter((item) => item !== value)));
    } else {
      dispatch(ADD_TYPE(value));
    }
  };

  return multiple
    ? result.map((car) => {
        return (
          <div className="flex items-center" key={car.brand}>
            <Checkbox
              checked={
                car.type
                  ? dataFilter?.shownCars.includes(car.type)
                  : dataFilter?.shownCars.includes(car.model)
              }
              name={car.type ? car.type : car.model}
              onChange={() =>
                handleCheckBox(car.type ? car.type : car.model, car.model)
              }
              value={car.model}
            />

            <h1>{car.type ? car.type : car.model}</h1>
          </div>
        );
      })
    : result?.map((item, index) => {
        return (
          <RadioGroup
            value={value}
            name="controlled-radio-buttons-group"
            sx={{ my: 1 }}
          >
            <FormControlLabel
              key={index}
              value={item.type ? item.type : item.model}
              onChange={(e) =>
                handleRadio(e, item.is_car_made_aboard, item.model, item.type)
              }
              control={<Radio />}
              label={item.type ? item.type : item.model}
              name={"carBrandModel"}
            />
          </RadioGroup>
        );
      });
};
export default ShowSearchResult;
