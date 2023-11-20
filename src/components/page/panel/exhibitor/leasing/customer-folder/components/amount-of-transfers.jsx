import { NumberSeprator } from "@/utils/number-seprator";
import React from "react";

export default function AmountOfTransfers({
  vehicle_and_facility,
  maximum_facility_amount,
}) {
  return (
    <div className="mt-8">
      <h2 className="text-blue font-bold border-b text-lg mb-4 pb-4 border-gray-150 ">
        میزان تسهیلات
      </h2>
      <div className="grid md:grid-cols-2 gap-4 mt-3">
        <div className="rounded-md p-4 bg-[#E7F3EC] text-[#007129]">
          <span className="text-gray-700 block text-xs mb-2">
            حداکثر میزان تسهیلات مجاز
          </span>
          <span className="font-bold">
            {NumberSeprator(maximum_facility_amount)} تومان
          </span>
        </div>
        <div className="text-orange rounded-md p-4 bg-[#FFF3E7]">
          <span className="text-gray-700 block text-xs mb-2">
            میزان تسهیلات درخواستی
          </span>
          <span className="font-bold">
            {NumberSeprator(vehicle_and_facility)} تومان
          </span>
        </div>
      </div>
    </div>
  );
}
