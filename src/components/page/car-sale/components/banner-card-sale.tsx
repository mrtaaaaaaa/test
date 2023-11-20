"use client";
import { img } from "@/data";
import { checkExistWindow } from "@/utils/check-exist-window";
import Link from "next/link";

const BannerCardSale = () => {
  const auth = checkExistWindow() && window.localStorage.getItem("userInfo");
  return (
    <div className="mt-20">
      <span className="text-center text-blue font-bold xl:text-2xl text-xl block mb-4">
        معرفی خودرو شما به طیف وسیعی از خریداران با ثبت آگهی فروش خودرو
      </span>

      <div
        style={{ backgroundImage: `url(${img.demoadsale_bg_banner.src})` }}
        className="h-80 bg-no-repeat md:bg-contain bg-cover md:bg-center bg-left rounded-lg flex flex-col justify-center items-center gap-4 mt-0"
      >
        <span className="text-blue font-bold lg:text-2xl text-xl text-center block">
          با متاخودرو ، رایگان ثبت آگهی کن!
        </span>
        <Link
          href={auth ? "/car-sale/sell-my-car" : "auth/check"}
          className="bg-blue rounded-md py-3 px-8 text-white"
        >
          ثبت آگهی
        </Link>
      </div>
    </div>
  );
};

export default BannerCardSale;
