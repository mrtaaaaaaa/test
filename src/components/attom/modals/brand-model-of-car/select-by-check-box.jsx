import {
  ADD_BRAND,
  ADD_MODEL,
  ADD_TYPE,
  REMOVED_BRAND,
  REMOVED_MODEL,
  REMOVED_TYPE,
  REMOVE_SHOW_CAR,
  SET_SHOW_CAR,
} from "@/redux/filter/filter-slice";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const SelectByCheckbox = ({ children, brand }) => {
  const dispatch = useDispatch();
  const dataFilter = useSelector((state) => state.filter);

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

    if (children.type) {
      //type
      if (dataFilter.type.includes(value)) {
        dispatch(
          REMOVED_TYPE(dataFilter.type.filter((item) => item !== value))
        );
      } else {
        dispatch(ADD_TYPE(value));
      }
    }
  };

  return (
    <>
      {children.type
        ? children.type?.map((item) => {
            return (
              <div key={item.id} className="flex items-center">
                <Checkbox
                  checked={dataFilter?.shownCars?.includes(item.alias)}
                  name={item.alias}
                  onChange={() => handleCheckBox(item.alias, children.model)}
                  value={item.alias}
                />
                <h1>{item.alias}</h1>
              </div>
            );
          })
        : children.map((car) => {
            return (
              <div key={car.id} className="flex items-center ">
                <Checkbox
                  checked={dataFilter.shownCars.includes(car.alias)}
                  name={car.alias}
                  onChange={() => handleCheckBox(car.alias, car.alias)}
                  value={car.alias}
                />
                <h1>{car.alias}</h1>
              </div>
            );
          })}
    </>
  );
};

export default SelectByCheckbox;
