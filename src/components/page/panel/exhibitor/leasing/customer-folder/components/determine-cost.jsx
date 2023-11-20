const DetermineCost = ({ data:payment}) => {
  return (
    <div className="mt-8 flex flex-col">
      <h2 className="text-blue font-bold border-b text-lg  mb-4 pb-4 border-gray-150 ">
        کارمزد قابل پرداخت
      </h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
        <div className="mt-2 border border-[#C4C4C4] relative h-[43px] rounded-lg  flex-col px-2 flex justify-center">
          <label
            className="bg-white px-2 right-2 -top-2 absolute text-blue"
            style={{ fontSize: "11px" }}
          >
            کارمزد
          </label>
          <div className="flex justify-between">
            <span className="text-sm">
              {payment?.pay_amount}
            </span>
            <span className="text-xs">تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetermineCost;
