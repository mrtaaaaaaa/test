"use client";

import { GetExhibitorData } from "@/apis/panel/exhibitor";
import DownloadDocument from "@/attom/exhibitors/download-document/download-document";
import { checkIndexName } from "@/utils/check-index-name";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChangeStatus from "../../components/change-status";

export default function UploadedChecksInfo() {
  const [state, setState] = useState({});
  const { id } = useParams();

  function fetchData() {
    GetExhibitorData(id).then((res) => {
      setState(res);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  let guAmount = state?.installment_info?.checks?.length;

  let checks_detail = [];
  for (let i = 0; i < guAmount; i++) {
    checks_detail.push({
      name: `تصویر چک ${checkIndexName(i)}`,
      image_id: state.installment_info?.checks[i].image_id?.split(",")[0],
    });
  }

  let check_back_details = [];
  for (let i = 0; i < guAmount; i++) {
    state.installment_info?.checks[i].image_back_id
      ? check_back_details.push({
          name: `تصویر پشت چک ${checkIndexName(i)}`,
          image_id:
            state.installment_info?.checks[i].image_back_id?.split(",")[0],
        })
      : "";
  }

  let guarantors_checks_details = [];
  for (let i = 0; i < state?.installment_info?.guarantors_checks?.length; i++) {
    guarantors_checks_details.push({
      name: `تصویر چک ${checkIndexName(i)}`,
      image_id:
        state?.installment_info?.guarantors_checks[i]?.image_id?.split(",")[0],
    });
  }

  let guarantors_checks_back_details = [];
  for (let i = 0; i < state?.installment_info?.guarantors_checks?.length; i++) {
    state?.installment_info?.guarantors_checks[i]?.image_back_id
      ? guarantors_checks_back_details.push({
          name: `تصویر پشت چک ${checkIndexName(i)}`,
          image_id:
            state?.installment_info?.guarantors_checks[i]?.image_back_id?.split(
              ","
            )[0],
        })
      : "";
  }

  return (
    <div>
      <h1 className="font-bold">
        جزئیات پرونده کد :{state?.exhibitor_leasing_code}
      </h1>
      <div className="flex items-center gap-3 border-b border-gray-150 pb-4 mt-4">
        <h2 className="text-blue font-bold text-lg">
          اطلاعات چک‌های بارگذاری شده
        </h2>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4 ">
        {checks_detail.map(({ name, image_id }) => {
          return (
            <DownloadDocument
              key={image_id}
              title={name}
              file={{
                image_id: image_id,
                name: name,
                suffix: "png",
              }}
            />
          );
        })}
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4 ">
        {check_back_details.map(({ name, image_id }) => {
          return (
            <DownloadDocument
              key={image_id}
              title={name}
              file={{
                image_id: image_id,
                name: name,
                suffix: "png",
              }}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-3 border-b border-gray-150 pb-4 mt-4">
        <h2 className="text-blue font-bold text-lg">
          اطلاعات چک‌های ضامن بارگذاری شده
        </h2>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4 ">
        {guarantors_checks_details.map(({ name, image_id }) => {
          return (
            <DownloadDocument
              key={image_id}
              title={name}
              file={{
                image_id: image_id,
                name: name,
                suffix: "png",
              }}
            />
          );
        })}
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4 ">
        {guarantors_checks_back_details.map(({ name, image_id }) => {
          return (
            <DownloadDocument
              key={image_id}
              title={name}
              file={{
                image_id: image_id,
                name: name,
                suffix: "png",
              }}
            />
          );
        })}
      </div>

      <ChangeStatus
        exhibitor_leasing_id={id}
        confirmCondition="در انتظار پرداخت کارمزد"
        declineCondition="رد تصاویر چک"
      />
    </div>
  );
}
