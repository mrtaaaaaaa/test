"use client";
import { useParams } from "next/navigation";
import CardSelectGuarantor from "../components/card-select-guarantor";
import { useEffect, useState } from "react";
import { GetExhibitorData } from "@/apis/panel/exhibitor";
import Alert from "@/attom/alerts/alert";

export default function CustomerGuarantorsSelection({ reason }: any) {
  const { id } = useParams();
  const [state, setState] = useState<any>({});

  function fetchData() {
    GetExhibitorData(id)
      .then((res) => {
        setState(res);
      })
      .catch(() => {
        <Alert type="error" title="متاسفانه خطایی رخ داده است" />;
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="border border-gray-200 rounded-lg p-4">
     <div className="flex gap-4 items-center border-b border-b-gray-200 pb-4 w-full mb-4">
        <h2 className="font-bold text-xl  text-blue">انتخاب ضامن</h2>
        {reason && (
          <span className="text-sm text-orange font-medium bg-orange-100 px-6 py-2 rounded-md">
            {reason}
          </span>
        )}
      </div>
      <span className="text-sm">
        یکی از ضامن‌های معرفی‌شده را جهت ضمانت تسهیلات انتخاب کنید.
      </span>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 mt-8">
        {state?.applicant_info?.guarantors.map((guarantor, index) => (
          <CardSelectGuarantor
            guarantor={guarantor}
            title={index == 0 ? "اول" : "دوم"}
          />
        ))}
      </div>
    </div>
  );
}
