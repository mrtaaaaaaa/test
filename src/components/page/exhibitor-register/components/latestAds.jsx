
import { BsFuelPumpFill, BsGearWide } from "react-icons/bs";
import { IoSpeedometer } from "react-icons/io5";

export default function LatestAds() {
  return (
    <>
      <div className="tablet:mt-24 mt-16 tablet:border border-gray-150 tablet:p-8 rounded-lg">
        <h2 className=" gradient-text font-bold text-center text-2xl mb-8 w-fit mx-auto">
          جدیدترین آگهی‌های نمایشگاه‌های خودرو
        </h2>
        <div className="grid lg:grid-cols-3 tablet:grid-cols-2 grid-cols-1 gap-4 mt-8">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <span className="border-b border-blue-primary rounded-xl text-center px-8 text-blue-primary text-sm font-medium h-fit pb-2 mt-8 flex mx-auto w-fit">
          مشاهده همه آگهی‌ها
        </span>
      </div>
    </>
  );
}

const Card = () => {
  return (
    <div className="border border-gray-150 grid tablet:grid-cols-3 grid-cols-6 justify-end items-center">
      <div className="tablet:col-span-1 col-span-2">
        <img src="" alt="نمایشگاه" />
      </div>
      <div className="tablet:col-span-2 col-span-4">
        {/* اطلاعات کلی خودرو */}
        <div className="p-4">
          {/* نوع قیمت و نام نمایشگاه */}
          <div className="flex justify-between items-center">
            <span className=" bg-[#CEEDD9] text-[#0AA643] px-2 py-1 text-xs h-fit">
              قیمت مناسب
            </span>
            <div className="flex gap-1 items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-[#4E5566]">نمایشگاه پرویز</span>
            </div>
          </div>

          {/* نام خودرو */}
          <span className="font-bold block my-4">رنو پارس</span>
          <span className="block text-blue-secondary text-xs">مدل 1400</span>

          {/*  قیمت */}
          <div className="text-blue flex items-center justify-end gap-1">
            <span className="font-bold text-lg">500.000.000</span>
            <span className="font-light text-sm">تومان</span>
          </div>
        </div>
        {/* اطلاعات جزئی خودرو */}
      </div>
      <div className="tablet:col-span-3 col-span-6 flex justify-center items-center gap-4 text-blue-secondary text-sm border-t border-t-gray-150 p-4">
        <div className="flex items-center gap-1">
          <BsFuelPumpFill />
          <span className="font-light">بنزینی</span>
        </div>
        <div className="flex items-center gap-1">
          <BsGearWide />
          <span className="font-light">دنده‌ای</span>
        </div>
        <div className="flex items-center gap-1">
          <IoSpeedometer />
          <span className="font-light">1000 کیلومتر</span>
        </div>
      </div>
    </div>
  );
};
