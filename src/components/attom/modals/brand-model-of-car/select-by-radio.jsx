import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_CATEGORY } from "@/redux/brand-model/brand-model-slice";

const SelectByRadio = ({
  brand,
  children,
  indexOfBrand,
  handleClose,
  customHandleChange,
}) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e, category, model, type) => {
    setValue(e.target.value);
    customHandleChange(e, indexOfBrand, category, brand, model, type);
    handleClose();
    dispatch(ADD_CATEGORY(category));
  };

  return (
    <div className="flex items-center">
      <FormControl>
        <RadioGroup
          value={value}
          name="controlled-radio-buttons-group"
          sx={{ my: 1 }}
        >
          {children.type
            ? children.type?.map((item) => {
                return (
                  <>
                    <FormControlLabel
                      key={item.alias || item}
                      value={item.alias || item}
                      onChange={(e) =>
                        handleChange(
                          e,
                          item.is_car_made_aboard,
                          children.model,
                          item.alias
                        )
                      }
                      control={<Radio />}
                      label={item.alias || item}
                      name={"carBrandModel"}
                    />
                  </>
                );
              })
            : children?.map((item) => {
                return (
                  <>
                    <FormControlLabel
                      key={item.alias || item}
                      value={item.alias || item}
                      onChange={(e) =>
                        handleChange(
                          e,
                          item.is_car_made_aboard,
                          e.target.value,
                          ""
                        )
                      }
                      control={<Radio />}
                      label={item.alias || item}
                      name={"carBrandModel"}
                    />
                  </>
                );
              })}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SelectByRadio;
