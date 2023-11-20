import { NumberSeprator } from "@/utils/number-seprator";
import { useAppSelector } from "src/hooks/redux-hooks";

const Factor = () => {
  const installment = useAppSelector((state) => state.carInstallment);

  const items = [
    {
      title: "پیش پرداخت",
      value: NumberSeprator(installment.loan_advance),
    },
    {
      title: "مبلغ هر قسط (هر 3ماه یکبار)",
      value: NumberSeprator(
        installment.monthly_installment
          ? +installment.monthly_installment * 3
          : installment.monthly_installment
      ),
    },
    {
      title: "مجموع بازپرداخت اقساط",
      value: NumberSeprator(installment.refund_total),
    },
  ];

  return (
    <>
      {/* فاکتور پیش پرداخت */}
      <div className="rounded-xl bg-gray-150 py-4 px-6">
        {/* قسط ماهیانه */}

        {items.map(({ title, value }, index) => {
          return (
            <div
              className={`flex justify-between items-center my-1 py-1 ${
                index == 1 ? "border-t border-t-gray-200 pt-2" : ""
              }`}
              key={title}
            >
              <span className="text-sm font-bold text-gray-900">{title}:</span>
              <div className="flex gap-2 items-center">
                <span className="font-bold items-center text-gray-900">
                  {value == 0 ? "-" : value}
                </span>
                <span className="text-xs text-gray-900 font-bold">تومان</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Factor;
