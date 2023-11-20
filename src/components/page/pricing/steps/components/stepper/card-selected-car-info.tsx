import { ADD_CATEGORY } from "@/redux/brand-model/brand-model-slice";
import { REMOVE_PRICING_DATA, SET_TAB, pricingSelector } from "@/redux/pricing/pricing-slice";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";

const CardSelectedCarInfo = () => {
  const { model, year_of_manufacture, is_car_made_aboard, mileage } =
    useAppSelector(pricingSelector);

  const dispatch = useAppDispatch();
  const changeCarHandler = () => {
    dispatch(SET_TAB(1));

    dispatch(REMOVE_PRICING_DATA());
    dispatch(ADD_CATEGORY(""));
  };

  const items = [
    {
      title: "برند و مدل",
      value: model,
    },
    {
      title: "سال ساخت",
      value: year_of_manufacture,
    },
    {
      title: "نوع خودرو",
      value: is_car_made_aboard ? "خارجی" : "داخلی",
    },
    {
      title: "کارکرد",
      value: mileage,
    },
  ];

  return (
    <div className="bg-blue py-12 px-6 flex flex-col gap-6 items-center justify-center text-white">
      {items.map(({ title, value }) => (
        <div>
          <span className="text-sm font-medium">{title}: </span>
          <span className="font-bold text-lg">{value}</span>
        </div>
      ))}
      <button
        className="border border-white font-light py-3 px-6 lg:w-full w-fit text-center rounded-lg"
        onClick={changeCarHandler}
      >
        قیمت‌گذاری خودرو جدید
      </button>
    </div>
  );
};

export default CardSelectedCarInfo;
