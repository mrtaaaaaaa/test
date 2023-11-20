import { useEffect, useState } from "react";

const ProductDetailsItem = ({ state }) => {
  const [titleValue, setTitleValue] = useState([]);

  const titles = [
    {
      title: "برند و مدل",
      value: state?.type
        ? ` ${state?.brand} - ${state?.model} - ${state?.type}`
        : state?.brand
        ? ` ${state?.brand} - ${state?.model}`
        : "-",
    },
    { title: "رنگ بدنه", value: state?.color ? state?.color : "-" },
    {
      title: "سال ساخت",
      value: state?.year_of_manufacture_display
        ? state?.year_of_manufacture_display
        : "-",
    },
    { title: "کارکرد", value: state?.mileage ? state?.mileage : "-" },
    { title: "نوع سوخت", value: state?.fuel_type ? state?.fuel_type : "-" },
    {
      title: "گیربکس",
      value: state?.gear_box_type ? state?.gear_box_type : "-",
    },
    { title: "استان", value: state?.city ? state?.city : "-" },
    {
      title: "وضعیت شاسی",
      value: state?.car_chassis_damaged ? state?.car_chassis_damaged : "-",
    },
    {
      title: "معاینه فنی",
      value: state?.technical_diagnosis_type ? "دارد" : "ندارد",
    },
    { title: "نوع آگهی دهنده", value: state?.advertiser_type },
    // { title: "وضعیت بدنه", value: state?.car_damaged },
    {
      title: "بیمه شخص ثالث",
      value: state?.insurances?.length
        ? state?.insurances?.map(({ provider }, index) => {
            return `${provider} ${
              ++index !== state.insurances.length ? "-" : ""
            } `;
          })
        : "ندارد",
    },
    {
      title: "مدت زمان اعتبار بیمه",
      value: state?.insurances?.length
        ? state?.insurances?.map(({ expireDate }, index) => {
            return `${expireDate} ${
              ++index !== state.insurances.length ? "-" : ""
            } `;
          })
        : "ندارد",
    },
  ];

  useEffect(() => {
    setTitleValue(titles);
  }, [state]);

  return (
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-3 grid-cols-2 justify-between gap-6  lg:mt-5 md:mt-3 mt-2">
      {titleValue.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col gap-2  rounded-md py-2 px-3 ${
            item.title == "بیمه" && "lg:col-span-2 md:col-span-3 col-span-2"
          }`}
        >
          <span className="text-gray-700">{item.title}</span>
          <span className={`font-bold ${item.title == "بیمه" && "text-sm"}`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProductDetailsItem;
