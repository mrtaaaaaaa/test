"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GetExhibitorData } from "@/apis/panel/exhibitor";
import Alert from "@/attom/alerts/alert";
import GuarantorsFormInfo from "./component/guarantors-form-info";

const MoreGuarantors = () => {
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
    <div className="border border-gray-200 rounded-lg p-4 ">
      <div className="flex gap-2 items-center border-b border-b-gray-200 pb-4 mb-4 w-full">
        <h1 className="font-bold text-xl  text-blue ">اطلاعات ضامن‌ها</h1>
        {/* {state.status.reason && (
          <span className="text-sm text-orange font-medium bg-orange-100 px-6 py-2 rounded-md">
            {state.status.reason}
          </span>
        )} */}
      </div>
      <GuarantorsFormInfo state={state}/>
    </div>
  );
};

export default MoreGuarantors;
