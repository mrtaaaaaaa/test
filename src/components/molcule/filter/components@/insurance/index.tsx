import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { ADD_INSURANCE, filterSelector } from "@/redux/filter/filter-slice";
import { Switch } from "@mui/material";
import { useState } from "react";

const InsuranceFilter = () => {
  const { insurances } = useAppSelector(filterSelector);

  const insurancesData = [
    { name: "ThirdPartyInsurance", value: "بیمه شخص ثالث " },
  ];

  const [isCheck, setIsCheck] = useState(insurances.BodyInsurance);

  const dispatch = useAppDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
    //  position
  ) => {
    // const updatedCheckedState =
    //   isCheck.length > 0 &&
    //   isCheck?.map((item, index) => (index === position ? !item : item));

    setIsCheck(!isCheck);

    let data = {
      name: e.target.name,
      value: e.target.checked,
    };

    dispatch(ADD_INSURANCE(data));
  };

  return (
    <div>
      <span className="border-b text-lg p-1 border-gray-border font-bold text-gray-700 w-full block">
        بیمه
      </span>
      {insurancesData.map((item, index) => {
        return (
          <div className="bg-gray-100 flex justify-between items-center rounded-md px-2 py-1 my-4">
            <span className="block mr-2">{item.value}</span>
            <Switch
              name={item.name}
              onChange={(e) =>
                handleChange(
                  e
                  //  index
                )
              }
              checked={insurances[item.name]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default InsuranceFilter;
