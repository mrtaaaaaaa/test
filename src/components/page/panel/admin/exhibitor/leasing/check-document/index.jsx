"use client";
import DownloadDocument from "@/attom/exhibitors/download-document/download-document";
import PreviewDetail from "@/attom/exhibitors/preview-detail";
import React, { useEffect, useState } from "react";
import ChangeStatus from "../../components/change-status";
import { GetExhibitorData } from "@/apis/panel/exhibitor";

export default function AdminExhibitorLeasingCheckDocument({
  exhibitor_leasing_id,
}) {
  const [data, setData] = useState({
    applicant_info: [],
    vehicle_info: [],
  });

  function fetchData() {
    GetExhibitorData(exhibitor_leasing_id).then((res) => {
      setData({
        applicant_info: res?.applicant_info,
        vehicle_info: res?.vehicle_info,
      });
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  let neededDocs = [
    {
      name: "تصویر میانگین معدل حساب با مُهر بانک",
      file: data.applicant_info?.average_bank_account_grade_image_id?.replace(
        /,\s*$/,
        ""
      ),
    },
    {
      name: "بارگذاری اشتغال به کار یا جواز کسب",
      file: data.applicant_info?.business_license_image_id?.replace(
        /,\s*$/,
        ""
      ),
    },
    {
      name: "بارگذاری برگه سامانه ثنا",
      file: data.applicant_info?.sana_document_image_id?.replace(/,\s*$/, ""),
    },
    {
      name: "بارگذاری وضعیت تملک (مستاجر و مالک)",
      file: data.applicant_info?.marital_status_image_id?.replace(/,\s*$/, ""),
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-blue font-bold border-b text-lg  mb-4 pb-4 border-gray-150 ">
        مدارک بارگذاری شده
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {neededDocs.map(
          ({ file, name }) =>
            file && (
              <DownloadDocument
                file={{
                  image_id: file,
                  name: name,
                  suffix: "png",
                }}
                title={name}
              />
            )
        )}
      </div>

      <h2 className="text-blue font-bold border-b text-lg  mb-4 pb-4 border-gray-150 mt-8">
        برند و مدل
      </h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
        <PreviewDetail
          label="برند و مدل"
          value={`${data.vehicle_info?.type} ${
            data.vehicle_info?.type
              ? data.vehicle_info?.type
              : data.vehicle_info?.model
          }`}
        />
        <PreviewDetail
          label="سال ساخت"
          value={data.vehicle_info?.year_of_manufacture_display}
        />
      </div>

      {exhibitor_leasing_id && (
        <ChangeStatus
          exhibitor_leasing_id={exhibitor_leasing_id}
          confirmCondition={"در انتظار اعلام حداکثر میزان ارائه تسهیلات"}
          declineCondition={"رد مدارک و اطلاعات متقاضی"}
        />
      )}
    </div>
  );
}
