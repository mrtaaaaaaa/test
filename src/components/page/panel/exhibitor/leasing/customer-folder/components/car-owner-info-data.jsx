import PreviewDetail from "@/attom/exhibitors/preview-detail";
import React from "react";

export default function CarOwnerInfoData({ car_owner_info }) {
  const CarOwnerInfoData = [
    {
      title: "نام ",
      value: car_owner_info.name,
    },
    {
      title: "نام خانوادگی ",
      value: car_owner_info.family,
    },
    {
      title: "نام پدر ",
      value: car_owner_info.father_name,
    },
    {
      title: "تاریخ تولد",
      value: `${car_owner_info.birth_date_year}/${car_owner_info.birth_date_month}/${car_owner_info.birth_date_day} `,
    },
    {
      title: "کد ملی",
      value: car_owner_info.national_code,
    },
    {
      title: "شماره شبا",
      value: car_owner_info.seller_account,
    },
    {
      title: "نام بانک",
      value: car_owner_info.bank_name,
    },
    {
      title: "نام شعبه",
      value: car_owner_info.bank_branch,
    },
  ];

  return (
    <div className="mt-8 flex flex-col">
      <h2 className="text-blue font-bold border-b text-lg  mb-4 pb-4 border-gray-150 ">
        اطلاعات فروشنده
      </h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {CarOwnerInfoData.map(({ title, value }) => (
          <PreviewDetail label={title} value={value} />
        ))}
      </div>
    </div>
  );
}
