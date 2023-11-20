import StepModal from "@/attom/stepper@/installment@/step-modal";
import RepaymentPeriod from "@/page/car-installment/components/calculator/repayment-period";
import httpService from "@/services/http-service";

import { AUTH_URL } from "@/config/url";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router";
import { useRouter } from "next/navigation";
import { SET_DATA } from "@/redux/edit-personal-info/edit-personal-info-slice";
import { NumberSeprator } from "@/utils/number-seprator";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState } from "@/redux/store";
// import { NumberSeprator } from "utils";

const InstallmentCalculation = () => {
  // Use Selector
  const installment: any = useAppSelector(
    (state: RootState) => state.carInstallment
  );
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const router = useRouter();
  // const location = useLocation();

  const nextFormHandler = () => {
    if (!userInfo.phone_number) {
     
      router.push("/auth/check");
    } else {
      httpService
        .get(`${AUTH_URL}/Auth/User/${userInfo.phone_number}`)
        .then((res) => {
          dispatch(SET_DATA(res.data.users));
          setOpen(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const items = [
    {
      title: "قیمت نقدی خودرو",

      value: NumberSeprator(installment.loan_amount),
    },
    {
      title: "مبلغ پیش پرداخت",
      value: NumberSeprator(installment.loan_advance),
    },
    {
      title: "سود تسهیلات",
      value: NumberSeprator(installment.facility_interest),
    },
    {
      title: "کل بازپرداخت",
      value: NumberSeprator(installment.refund_total),
    },
    {
      title: `تعداد ${installment.number_of_installment - 1} فقره چک`,
      value: NumberSeprator(installment.check_installments_monthly),
    },
    {
      title: "مبلغ قسط آخر",
      value: NumberSeprator(installment.last_check),
    },
  ];

  return (
    <div className="rounded-xl p-4 bg-white tablet:w-full lg:max-w-[27rem] md:max-w-[24rem] w-full  h-full flex flex-col">
      {/* فرم */}
      <div className="flex flex-col gap-2 py-4 mb-4">
        {/* مدت  باز‌پرداخت */}
        <RepaymentPeriod />
      </div>

      <div className="border p-3 rounded-lg border-blue flex flex-col">
        {items.map(({ title, value }, index) => {
          return (
            <div
              className={`flex justify-between items-center my-1 py-1 ${
                ++index < items.length && "border-b border-b-gray-150"
              }`}
              key={title}
            >
              <span className="text-sm font-medium text-blue">{title}:</span>
              <div className="flex gap-2 items-center">
                <span className="font-bold items-center text-blue">
                  {value == 0 ? "-" : value}
                </span>
                <span className="text-xs text-blue">تومان</span>
              </div>
            </div>
          );
        })}
        <button
          className="md:w-72 w-auto px-3 bg-blue text-white rounded-lg mt-5 py-3 mx-auto md:text-base text-sm"
          onClick={nextFormHandler}
        >
          ثبت درخواست خرید اقساطی
        </button>
      </div>
      {/*@ts-ignore */}
      <StepModal inDetailPage={true} open={open} setOpen={setOpen} />
    </div>
  );
};

export default InstallmentCalculation;
