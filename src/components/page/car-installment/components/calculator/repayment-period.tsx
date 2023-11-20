import {
  ADD_MONTH,
  CALCULATE_CHECK,
} from "@/redux/car-installment/car-installment/car-Installment-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "src/hooks/redux-hooks";

const RepaymentPeriod = () => {
  // Use Selector
  const { installments_duration, loan_amount } = useAppSelector(
    (state) => state.carInstallment
  );

  //   Use Dispacth
  const dispatch = useDispatch();

  // Month Array
  const monthArray = [
    {
      month: 6,
      number_of_installment: 2,
      marketing_percentage: 0.08,
      facility_interest_percentage: 0.09852300242,
    },
    {
      month: 9,
      number_of_installment: 3,
      marketing_percentage: 0.1,
      facility_interest_percentage: 0.1327271058,
    },
    {
      month: 12,
      number_of_installment: 4,
      marketing_percentage: 0.12,
      facility_interest_percentage: 0.1676109617,
    },
    {
      month: 18,
      number_of_installment: 6,
      marketing_percentage: 0.17,
      facility_interest_percentage: 0.2394098733,
    },
  ];

  // Click Handler
  const clickMonthHandler = (item) => {
    dispatch(ADD_MONTH(item));
    dispatch(CALCULATE_CHECK(loan_amount));
  };

  return (
    <>
      {/* مدت  باز‌پرداخت */}
      <div>
        <label className="font-medium">مدت باز‌پرداخت</label>
        <div className="flex justify-between items-center rounded-lg mt-2 py-1 px-2 text-gray">
          {monthArray.map((item, index) => (
            <>
              <button
                className={`text-center ${
                  installments_duration == item.month
                    ? "text-blue bg-blue-100 font-bold"
                    : "text-gray bg-white"
                } w-full py-2 rounded-md`}
                onClick={() => clickMonthHandler(item)}
              >
                {item.month} ماهه
              </button>

              {index !== 3 && (
                <span className="bg-gray-200 block h-[1.5rem] w-[4px] mx-2"></span>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default RepaymentPeriod;
