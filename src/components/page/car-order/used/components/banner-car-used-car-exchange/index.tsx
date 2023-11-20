import dasteDovom from "@/assets/images/dasteDovomImage.png";
import pricing from "@/assets/images/gheimatGozariKhodro.svg";
import exchangeCar from "@/assets/images/moavezeKhodro.svg";
import { img } from "@/data";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

export const BannerCarUsedCarExchange = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 lg:w-3/4 mx-auto md:relative">
      <div className="relative md:z-50">
        <img
          src={img.car_order_used_car_pricing_1_2.src}
          alt="image"
          className="rounded-xl"
        />
        <div className="absolute top-0 bottom-0 m-auto left-0 right-0 flex flex-col items-center justify-center lg:gap-10 gap-5 py-5 px-10">
          <span className=" w-fit pb-3 font-bold text-lg ">
            قیمت‌گذاری خودرو
          </span>
          <p className="text-center ">
            خودروی خودتان را قیمت‌گذاری کنید و با ثبت آگهی و فروش آن، بودجه خرید
            خودرو جدید را بالا ببرید.
          </p>
          <Link
            href="/pricing"
            className="text-white bg-blue rounded-sm w-fit px-4 py-2"
          >
            <div className=" flex gap-2 items-center w-[200px] justify-center">
              قیمت خودرو شما
              <MdKeyboardArrowLeft />
            </div>
          </Link>
        </div>
      </div>
      <div className="md:absolute top-0 right-[400px]  ">
        <div className="py-8 relative">
          <img src={pricing.src} alt="image" />
          <div className="absolute top-0 bottom-0 m-auto left-0 right-0 flex flex-col items-center justify-center py-5 px-10">
            <span className="block font-bold text-lg text-center">
              قیمت‌گذاری خودرو‌های کارکرده
            </span>
            <span className="block text-center mt-5">
              این یک پیشنهاد ویژه برای خرید هوشمندانه از سمت شماست.
            </span>
            <img src={dasteDovom.src} alt="image" className="w-6/7 mt-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
