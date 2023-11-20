"use client";
import { useEffect, useState } from "react";
import ChangeStatus from "../../components/change-status";
import { useParams } from "next/navigation";
import { GetExhibitorData } from "@/apis/panel/exhibitor";

const CheckVehiclecheckDocument = () => {
  const [state, setState] = useState({
    applicant_info: [],
    vehicle_info: [],
  });
  const { id } = useParams();

  function fetchData() {
    GetExhibitorData(id).then((res) => {
      setState({
        applicant_info: res?.applicant_info,
        vehicle_info: res?.vehicle_info,
      });
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const showData = [
    {
      title: "برند و مدل",
      value: `${state.vehicle_info.brand} ${state.vehicle_info.model}`,
    },
    {
      title: "سال ساخت",
      value: state.vehicle_info?.year_of_manufacture_display,
    },
    {
      title: "محدوده بازدید",
      value:
        state.vehicle_info.vehicle_check_exhibitor_leasing?.vehicle_check_area,
    },
    {
      title: "آدرس",
      value:
        state?.vehicle_info.vehicle_check_exhibitor_leasing
          ?.vehicle_check_address,
    },
  ];

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col">
      <h1 className="font-bold text-xl mb-4 text-blue border-b border-b-gray-200 pb-4 w-full">
        درخواست کارشناس رسمی قوه‌ قضاییه ثبت شده
      </h1>

      <div className="border border-gray-200 rounded-lg lg:p-8 p-4 grid lg:grid-cols-5 grid-cols-2 gap-4">
        {showData.map(({ title, value }, index) => (
          <div
            key={title}
            className={
              index == 3
                ? "lg:col-span-2 md:col-span-1 col-span-2"
                : index == 0 && "md:col-span-1 col-span-2"
            }
          >
            <span className="block text-xs text-gray-500 w-full">{title}</span>
            <span className="block text-gray-900 font-medium mt-1 text-sm">
              {value ? value : "-"}
            </span>
          </div>
        ))}
      </div>

      <ChangeStatus
        exhibitor_leasing_id={id}
        confirmCondition="در انتظار ثبت تاریخ قرارداد"
      />
    </div>
  );
};

export default CheckVehiclecheckDocument;
