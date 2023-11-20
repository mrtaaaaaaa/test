import { checkExistWindow } from "@/utils/check-exist-window";
import Factor from "./factor";
import RepaymentPeriod from "./repayment-period";
import RequestedAmount from "./requested-amount";

const CardInstallment = () => {
  const handleClick = () => {
    if (checkExistWindow()) {
      window.open("tel:02188108260");
    }
  };

  return (
    <div className="tablet:w-[23rem] md:w-[22rem] w-full flex flex-col rounded-2xl pt-4 bg-white p-6">
      <div className="tablet:flex tablet:flex-row flex-col justify-between border-b border-b-gray-200 pb-2">
        <span className=" text-lg pb-3 px-2 font-bold">
          قیمت خودرو مورد نظرت چقدره؟
        </span>
      </div>

      {/* مبلغ درخواستی  */}
      <RequestedAmount />

      <div className="flex flex-col gap-2 py-4">
        {/* مدت  باز‌پرداخت */}
        <RepaymentPeriod />
      </div>

      {/* فاکتور پیش پرداخت */}
      <Factor />

      <button
        className="bg-blue text-white w-full py-2 rounded-xl flex gap-2 items-center justify-center mt-4 text-lg"
        onClick={handleClick}
      >
        با ما تماس بگیرید - 02188108260
      </button>
    </div>
  );
};

export default CardInstallment;
