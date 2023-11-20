import React from "react";
import { useSelector } from "react-redux";
import { Location } from "iconsax-react";
import dynamic from "next/dynamic";
const MapModal = dynamic(() => import("@/attom/form@/components@/map@/map"), {
  loading: () => <p>در حال بارگزاری نقشه ...</p>,
  ssr: false,
});

export default function LocationSquad({ formik, name }) {
  const { address } = useSelector((state) => state.mapAddress);

  return (
    <>
      <h2 className="font-bold text-xl mt-8 mb-4 text-blue border-b border-b-gray-200 pb-4 w-full">
        موقعیت مکانی
      </h2>
      <div className="flex md:flex-row flex-col">
        <MapModal
          classes="md:w-[25rem] w-full"
          formik={formik}
          hasDistance={false}
          name={{
            lat: name.lat,
            long: name.long,
          }}
        />
        <div className="flex flex-col gap-4 px-5 w-full">
          <span className="bg-[#F4F7F9] font-bold text-blue  flex gap-2 rounded-md w-full  p-2 my-2 ">
            <Location size="20" />
            {address}
          </span>
          <span className="text-gray-400 text-sm">
            برای ثبت نمایشگاه باید موقعیت مکانی را ثبت نمایید.{" "}
          </span>
        </div>
      </div>
    </>
  );
}
