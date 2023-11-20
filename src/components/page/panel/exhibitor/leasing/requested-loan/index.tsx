"use client";

import { GetExhibitorData } from "@/apis/panel/exhibitor";
import { NumberSeprator } from "@/utils/number-seprator";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";

const RequestedLoan = () => {
  const [data, setData] = useState({});

  const params = useParams();

  function fetchData() {
    GetExhibitorData(params.id).then((res) => {
      setData(res);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col">
      <h1 className="font-bold text-xl mb-4 text-blue border-b border-b-gray-200 pb-4 w-full">
        اعلام حداکثر میزان درخواست تسهیلات
      </h1>
      <div className="flex items-center gap-1">
        <RiErrorWarningFill color="#EB6E02" />
        <span className="text-sm">
          متقاضی تا این سقف می‌تواند میزان تسهیلات درخواستی خود را ثبت کند.
        </span>
      </div>

      <div className="grid grid-cols-2 mt-4">
        <div className="flex flex-col border-l border-l-gray-200 p-4">
          <span className="block text-gray-600 text-xs">
            نام و نام‌خانوادگی:
          </span>
          <div className="flex gap-2 items-center">
            <span className="font-bold">{data?.applicant_info?.name}</span>
            <span className="font-bold">{data?.applicant_info?.family}</span>
          </div>
        </div>
        <div className="flex flex-col p-4">
          <span className="block text-gray-600 text-xs">شماره پرونده:</span>
          <span className="font-bold">{data?.exhibitor_leasing_code}</span>
        </div>
      </div>
      <div className=" bg-green-100 p-4">
        <span className="text-gray-600 block text-xs">میزان تسهیلات</span>
        <span className="text-green font-bold lg:text-xl text-lg mt-2 block">
          {NumberSeprator(data?.installment_info?.maximum_facility_amount)}{" "}
          <span className="text-sm"> تومان</span>
        </span>
      </div>

      <Link
        href={`/panel/exhibitor/leasing/car-info/${data?.exhibitor_leasing_id}`}
        className="bg-blue text-white px-16 py-2 rounded-lg mx-auto text-sm mt-4"
      >
        مرحله بعد
      </Link>
    </div>
  );
};

export default RequestedLoan;
