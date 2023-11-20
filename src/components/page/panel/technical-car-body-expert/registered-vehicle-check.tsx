"use client";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import PdfReport from "@/attom/pdf/pdf-report";
import httpService from "@/services/http-service";
import { FRONT2DB } from "@/config/url";
import { useQuery } from "react-query";
import Link from "next/link";

const InspectorVehicleCheck = () => {
  async function fetchData() {
    const { data } = await httpService.get(
      `${FRONT2DB}/VehicleCheck/Get/Inspector`
    );
    return data;
  }
  const { data, isError, isLoading } = useQuery("products", fetchData);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Alert type="error" title="متاسفانه خطایی رخ داده است" />;
  } else {
    const { VehicleChecks } = data;
    return (
      <>
        <h1 className="font-bold text-lg mb-4">درخواست‌های کارشناسی</h1>
        {VehicleChecks ? (
          <div className="tablet:grid lg:grid-cols-5 tablet:grid-cols-4 flex flex-col gap-4">
            <div className="col-span-5 tablet:grid lg:grid-cols-7 tablet:grid-cols-4 hidden bg-[#E4E4E4] items-center rounded-tr-md rounded-tl-md px-6 py-3">
              <div className="lg:block hidden text-sm">#</div>
              <div className="lg:col-span-2 text-sm">
                اطلاعات کارشناسی خودرو
              </div>
              <div className="lg:col-span-2 text-sm">نتیجه کارشناسی</div>
              <div className="text-sm">تاریخ آخرین به‌روز‌رسانی</div>
              <div className="text-sm">وضعیت درخواست</div>
            </div>

            {VehicleChecks.length > 1 ? (
              VehicleChecks.map((reqItem, index) => (
                <TableItem
                  index={index}
                  area={reqItem.vehicle_check_area}
                  inspector={reqItem.inspector}
                  brand_and_model={reqItem.brand_and_model}
                  year_of_manufacture={reqItem.year_of_manufacture}
                  payment_timestamp={reqItem.payment_timestamp}
                  vehicle_check_id={reqItem.vehicle_check_id}
                  result={reqItem.result}
                />
              ))
            ) : (
              <TableItem
                index={1}
                area={VehicleChecks[0].vehicle_check_area}
                inspector={VehicleChecks[0].inspector}
                brand_and_model={VehicleChecks[0].brand_and_model}
                year_of_manufacture={VehicleChecks[0].year_of_manufacture}
                payment_timestamp={VehicleChecks[0].payment_timestamp}
                vehicle_check_id={VehicleChecks[0].vehicle_check_id}
                result={VehicleChecks[0].result}
              />
            )}
          </div>
        ) : (
          <Alert type="error" title="درخواست کارشناسی به شما ارجاع نشده است." />
        )}
      </>
    );
  }
};

export default InspectorVehicleCheck;

const TableItem = ({
  index,
  inspector,
  area,
  result,
  brand_and_model,
  year_of_manufacture,
  payment_timestamp,
  vehicle_check_id,
}) => {
  return (
    <div className="tablet:col-span-5 col-span-1 tablet:grid lg:grid-cols-7 tablet:grid-cols-4 tablet:gap-0 gap-2  flex flex-col items-center rounded-tr-tablet rounded-tl-tablet tablet:px-6 tablet:py-3 p-5 tablet:border-0 border border-gray-300 rounded-lg">
      <div className="font-bold lg:block hidden tablet:w-fit w-full">
        {index} -{" "}
      </div>
      <div className="tablet:block flex flex-col justify-between tablet:w-fit w-full lg:col-span-2">
        <span className="tablet:hidden block font-bold ">
          اطلاعات کارشناسی خودرو
        </span>
        <span className="font-bold">
          {brand_and_model} - {year_of_manufacture}
        </span>
        <div className="block tablet:text-right text-left">
          <span>
            {" "}
            {inspector.first_name} {inspector.last_name}{" "}
          </span>
          -<span> {inspector.user_name} </span>
        </div>
        <span className="block text-sm tablet:text-right text-left">
          محدوده {area}
        </span>
      </div>
      <div className="tablet:block lg:col-span-2 flex justify-between tablet:w-fit w-full">
        <span className="tablet:hidden block font-bold">نتیجه کارشناسی</span>
        <div className="flex flex-col gap-2">
          {result && result.length > 0 && (
            <PdfReport result={{ result, brand_and_model }} />
          )}
          <Link
            // href="/vehicle-check/form"
            href={{
              pathname: "registered-vehicle-check/form",
              query: {
                id: vehicle_check_id,
                model: brand_and_model,
              },
            }}
            // state={{ id: vehicle_check_id, model: brand_and_model }}
            className="bg-white text-blue  border border-blue px-4 py-2 lg:text-sm text-xs rounded-lg font-bold"
          >
            ثبت نتیجه کارشناسی
          </Link>
        </div>
      </div>
      <div className="tablet:block flex justify-between tablet:w-fit w-full">
        <span className="tablet:hidden block font-bold">
          تاریخ آخرین به‌روز‌رسانی
        </span>
        <span className="text-sm">{payment_timestamp}</span>
      </div>
      <div className="flex justify-between tablet:w-fit w-full">
        <span className="tablet:hidden block font-bold">وضعیت درخواست</span>
        {result !== "" && result !== null ? (
          <span className="font-bold text-sm text-green-600">دارای نتیجه</span>
        ) : (
          <span className="font-bold text-sm text-blue ">کارشناسی نشده</span>
        )}
      </div>
    </div>
  );
};
