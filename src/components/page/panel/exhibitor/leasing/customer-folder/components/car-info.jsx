import PreviewDetail from "@/attom/exhibitors/preview-detail";
import React from "react";

export default function CarInfo({ data }) {
  let carDetail = [
    {
      name: "برند و مدل",
      value: data?.brand + "-" + data?.model,
    },
    {
      name: "سال ساخت",
      value: data?.year_of_manufacture_display,
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-blue font-bold border-b text-lg mb-4 pb-4 border-gray-150 ">
        انتخاب برند و مدل
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {carDetail.map(({ name, value }, index) => {
          return <PreviewDetail label={name} value={value} />;
        })}
      </div>
    </div>
  );
}
