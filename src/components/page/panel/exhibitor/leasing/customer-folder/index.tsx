"use client";

import { GetExhibitorData } from "@/apis/panel/exhibitor";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AmountOfTransfers from "./components/amount-of-transfers";
import CarInfo from "./components/car-info";
import CarOwnerInfoData from "./components/car-owner-info-data";
import ChecksInFinalPart from "./components/checks-in-final-part";
import FirstValidationForm from "./components/customer-info";
import DetermineCost from "./components/determine-cost";
import DownloadDocument from "@/attom/exhibitors/download-document/download-document";
import { useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/redux/auth/auth-Slice";
import ExhibitorVehicleCheck from "./components/exhibitor-vehicle-check";
import GuarantorsInfo from "./components/guarantors-info";
import UploadedDocs from "./components/uploaded-docs";

export default function CustomerFolder() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<any>({});

  function fetchData() {
    setLoading(true);
    GetExhibitorData(id)
      .then((res) => {
        setLoading(false);
        setState(res);
      })
      .catch(() => {
        <Alert type="error" title="متاسفانه خطایی رخ داده است" />;
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const { userInfo } = useAppSelector(authSelector);

  return (
    <div>
      <h2 className="text-blue font-bold border-b text-lg mb-4 pb-4 border-gray-150 ">
        اطلاعات کلی پرونده
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* اطلاعات کلی پرونده */}
          <FirstValidationForm
            applicant_info={state.applicant_info}
            contaract_date={`${state.contract_date_year}/${state.contract_date_month}/${state.contract_date_day}`}
            repayment_per_month={state?.installment_info?.repayment_per_month}
          />

          {/* مدارک بارگذاری شده */}
          {state?.applicant_info?.average_bank_account_grade_image_id && (
            <UploadedDocs
              applicant_info={state.applicant_info}
              vehicle_info={state.vehicle_info}
            />
          )}

          {/* اطلاعات ضامن‌ها */}
          {state?.applicant_info?.guarantors?.length && (
            <GuarantorsInfo data={state?.applicant_info?.guarantors} />
          )}

          {/* انتخاب برند و مدل */}
          {state.brand && (
            <CarInfo
              data={{
                brand: state?.brand,
                model: state?.model,
                year_of_manufacture_display: state.year_of_manufacture_display,
              }}
            />
          )}

          {/* میزان تسهیلات */}
          {state?.installment_info?.maximum_facility_amount !== 0 && (
            <AmountOfTransfers
              maximum_facility_amount={
                state?.installment_info?.maximum_facility_amount
              }
              vehicle_and_facility={state?.installment_info?.facility_amount}
            />
          )}

          {/* ارزیابی توسط دادگستری */}
          {state.vehicle_and_facility?.brand && (
            <ExhibitorVehicleCheck
              data={state.vehicle_check_exhibitor_leasing}
            />
          )}

          {/* چک‌ها */}
          {state?.installment_info?.checks?.length !== 0 && (
            <ChecksInFinalPart data={state?.installment_info?.checks} />
          )}

          {/* چک‌ها */}
          {state?.installment_info?.guarantors_checks?.length !== 0 && (
            <ChecksInFinalPart
              data={state?.installment_info?.guarantors_checks}
              title="چک‌های ضامن"
            />
          )}

          {/* کارمزد قابل پرداخت */}
          {state?.pay?.pay_amount !== 0 && <DetermineCost data={state.pay} />}

          {/* قرارداد آنلاین */}
          {state?.contract && (
            <div className="mt-8 flex flex-col">
              <h2 className="text-blue font-bold border-b text-lg  mb-4 pb-4 border-gray-150 ">
                قرارداد آنلاین
              </h2>
              <DownloadDocument
                file={{
                  image_id: state?.contract?.replace(/,\s*$/, ""),
                  name: "قرارداد آنلاین",
                  suffix: "png",
                }}
                title="قرارداد آنلاین"
              />
            </div>
          )}

          {state?.vehicle_info?.car_owner_info.name && (
            <CarOwnerInfoData
              car_owner_info={state?.vehicle_info?.car_owner_info}
            />
          )}

          <div className="flex gap-4 mb-5 justify-center mt-16">
            <Link
              href={
                userInfo?.roles[0] == "Exhibitors"
                  ? "/panel/exhibitor/leasing/customers-req"
                  : "/panel/admin/exhibitor/leasing/customers-req"
              }
              className="border border-red-500 px-16 py-2 rounded-lg text-red-500 text-sm"
            >
              بستن پرونده
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
