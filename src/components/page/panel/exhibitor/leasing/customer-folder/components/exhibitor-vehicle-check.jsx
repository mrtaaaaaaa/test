import PreviewDetail from "@/attom/exhibitors/preview-detail";
import React from "react";

import { RiErrorWarningFill } from "react-icons/ri";

export default function ExhibitorVehicleCheck({
  data: vehicle_check_exhibitor_leasing,
}) {
  let vehicleCheckInfo = [
    {
      name: "برند و مدل",
      value:
        vehicle_check_exhibitor_leasing?.brand +
          " " +
          vehicle_check_exhibitor_leasing?.model +
          " " +
          vehicle_check_exhibitor_leasing?.type &&
        vehicle_check_exhibitor_leasing?.type,
    },
    {
      name: "سال ساخت",
      value: vehicle_check_exhibitor_leasing?.year_of_manufacture_display,
    },
    {
      name: " محدوده بازدید",
      value: vehicle_check_exhibitor_leasing?.vehicle_check_area,
    },
  ];

  return (
    <div className="mt-8 flex flex-col">
      <h2 className="text-blue font-bold border-b text-lg mb-4 pb-4 border-gray-150 ">
        ارزیابی توسط کارشناس رسمی قوه قضاییه
      </h2>

      <div className="flex items-center gap-1">
        <RiErrorWarningFill color="#EB6E02" />
        <span className="text-sm">
          نتیجه ارزیابی دادگستری در تاریخ
          {/* 1402/05/12 */}
          بارگذاری شده است.
        </span>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {vehicleCheckInfo.map(({ name, value }, index) => {
          return <PreviewDetail label={name} value={value} />;
        })}

        <div className="md:col-span-2 gap-2 mt-2 border border-[#C4C4C4] relative h-[10rem] rounded-lg flex flex-col justify-center px-2">
          <label
            className="bg-white px-2 right-2 -top-2 absolute text-blue"
            style={{ fontSize: "11px" }}
          >
            آدرس
          </label>
          <span className="text-sm">
            {vehicle_check_exhibitor_leasing?.vehicle_check_address}
          </span>
        </div>
      </div>
    </div>
  );
}
