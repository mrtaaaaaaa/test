"use client";

import { GetExhibitorData } from "@/apis/panel/exhibitor";
import ChangeStatus from "../../components/change-status";
import DownloadDocument from "@/attom/exhibitors/download-document/download-document";
import PreviewDetail from "@/attom/exhibitors/preview-detail";
import { checkIndexName } from "@/utils/check-index-name";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ConfirmGuarantorsDocs() {
  const [state, setState] = useState<any>({});
  const { id } = useParams();

  function fetchData() {
    GetExhibitorData(id).then((res) => {
      setState(res);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  let guarantorsData = [];

  const guarantorsInfo = (index) => {
    return [
      {
        name: `نام ضامن ${checkIndexName(index)}`,
        value:
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]?.name +
            " " +
            state?.applicant_info?.guarantors[0]?.family,
      },
      {
        name: `کد ملی ضامن ${checkIndexName(index)}`,
        value:
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]?.national_code,
      },
      {
        name: `موبایل ضامن ${checkIndexName(index)}`,
        value:
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]?.mobile_number,
      },
      {
        name: `نسبت ضامن ${checkIndexName(index)}`,
        value:
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]?.relative,
      },
      {
        name: `نام پدر ضامن ${checkIndexName(index)}`,
        value:
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]?.father_name,
      },
      {
        name: `شغل ضامن ${checkIndexName(index)}`,
        value:
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]?.job,
      },
      {
        name: `شماره شناسنامه ضامن ${checkIndexName(index)}`,
        value:
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]?.birth_certificate_code,
      },
      {
        name: `محل صدور شناسنامه ضامن ${checkIndexName(index)}`,
        value:
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]
            ?.birth_certificate_issuing_place,
      },
      {
        name: `تاریخ تولد ضامن ${checkIndexName(index)}`,
        value: `${
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]?.birth_date_year +
            "/" +
            state?.applicant_info?.guarantors[index]?.birth_date_month +
            "/" +
            state?.applicant_info?.guarantors[index]?.birth_date_day
        }`,
      },
      {
        name: `تلفن ثابت ضامن ${checkIndexName(index)}`,
        value:
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]?.landline_phone_number,
      },
      {
        name: `آدرس ضامن ${checkIndexName(index)}`,
        value:
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]?.residence_address,
      },
      {
        name: `کد پستی ضامن ${checkIndexName(index)}`,
        value:
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]?.postal_code,
      },

      {
        name: `تصویر کارت ملی ${checkIndexName(index)}`,
        value:
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]?.national_image_id,
      },
      {
        name: `تصویر شناسنامه ${checkIndexName(index)}`,
        value:
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]?.birth_certificate_image_id,
      },
      {
        name: `تصویر سامانه ثنا ${checkIndexName(index)}`,
        value:
          state?.applicant_info?.guarantors &&
          state?.applicant_info?.guarantors[index]?.sana_document_image_id,
      },
    ];
  };

  for (
    let index = 0;
    index < state?.applicant_info?.guarantors?.length;
    index++
  ) {
    guarantorsData.push(guarantorsInfo(index));
  }

  return (
    <div>
      <h1 className="font-bold">
        جزئیات پرونده کد :{state?.exhibitor_leasing_code}
      </h1>
      <div className="flex items-center gap-3">
        <h2 className="text-blue font-bold my-4 text-lg">اطلاعات ضامن‌ها</h2>
        {state?.status?.reason && (
          <span className="text-sm text-orange font-medium bg-orange-100 px-6 py-2 rounded-md">
            {state.status.reason}
          </span>
        )}
      </div>
      {guarantorsData.map((item, index) => {
        return (
          <div className="border-t border-gray-150 pt-4 mt-4">
            <h3 className="font-bold text-md mb-4">
              ضامن {checkIndexName(index)}
            </h3>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 ">
              {item.map((guarantor, index) =>
                !guarantor.name.includes("تصویر") ? (
                  <PreviewDetail
                    label={guarantor.name}
                    value={guarantor.value}
                  />
                ) : guarantor.value ? (
                  <DownloadDocument
                    title={guarantor?.name}
                    file={{
                      image_id: guarantor.value.replace(/,\s*$/, ""),
                      name: guarantor?.name,
                      suffix: "png",
                    }}
                  />
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
        );
      })}
      <div className="mb-5">
        <ChangeStatus
          exhibitor_leasing_id={id}
          confirmCondition="در انتظار ثبت درخواست کارشناسی"
          declineCondition="رد اطلاعات ضامنین"
        />
      </div>
    </div>
  );
}
