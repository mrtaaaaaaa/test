import {
  ADD_AMOUNT,
  CALCULATE_CHECK,
} from "@/redux/car-installment/car-installment/car-Installment-slice";
import { Num2persian } from "@/utils/num2persian";
import { InputAdornment, InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch } from "src/hooks/redux-hooks";

const RequestedAmount = () => {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState({
    displayValue: "",
    actualNumberValue: "",
  });
  const [priceWords, setPriceWords] = useState("");

  // Change amount handler
  const handleChange = (e) => {
    const { value } = e.target;

    const strNumber = value
      .replace(/[^0-9]/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setAmount({
      displayValue: strNumber,
      actualNumberValue: Number(strNumber.replace(/,/g, "")),
    });

    dispatch(ADD_AMOUNT(Number(strNumber.replace(/,/g, ""))));
    dispatch(CALCULATE_CHECK(Number(strNumber.replace(/,/g, ""))));
  };

  useEffect(() => {
    setPriceWords(Num2persian(amount.actualNumberValue));
  }, [amount.actualNumberValue]);

  return (
    <>
      {/* مبلغ درخواستی  */}
      <div className="mt-3">
       

        <InputBase
          type="text"
          sx={{
            textAlign: "center",
            fontSize: "14px",
            input: { textAlign: "center" },
            padding: "6px 8px",
            fontFamily: "IranSans-Bold",
            border: "1px solid #BFBFBF",
            "&:focus-within": { border: "1px solid #BFBFBF", color: "#121127" },
            borderRadius: "10px",
          }}
          className="bg-white mt-2 rounded  w-full outline-none"
          style={{ textAlign: "center", direction: "rtl" }}
          value={amount.displayValue}
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <span className="text-xs">تومان</span>
            </InputAdornment>
          }
        />

        <span className="text-sm block mt-1 text-center text-gray-300">
          {priceWords} تومان
        </span>
      </div>
    </>
  );
};

export default RequestedAmount;
