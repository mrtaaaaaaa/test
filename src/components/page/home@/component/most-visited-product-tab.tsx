"use client";

import { icons } from "@/data";
import Link from "next/link";
import { useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MostVisitedProductTab() {
  const [activeTab, setActiveTab] = useState("mostPopular");
  const changeTabHandler = (e: any) => {
    const { name } = e.target;
    setActiveTab(name);
  };

  return (
    <div className="p-4">
      <div
        className="mt-24 rounded-lg relative p-8"
        style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="flex mb-4">
          {/* Tab */}
          <Tab activeTab={activeTab} changeTabHandler={changeTabHandler} />
          <Link
            href="/"
            className="mr-auto text-sm font-medium bg-[#F5F8FF] px-4 py-1 rounded-md flex items-center gap-1"
          >
            مشاهده همه
            <BsChevronLeft />
          </Link>
        </div>
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  );
}

const Tab = ({
  activeTab,
  changeTabHandler,
}: {
  activeTab: string;
  changeTabHandler: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="flex absolute lg:-top-5 -top-16 items-center lg:right-4 right-0 left-auto">
      <button
        className={`shadow-light px-10 rounded-lg h-fit ${
          activeTab == "mostPopular"
            ? "bg-white text-xl z-10 py-3"
            : "bg-gray-100 -ml-2 z-1 py-2"
        }`}
        name="mostPopular"
        onClick={changeTabHandler}
      >
        پر آگهی‌ترین خودروها
      </button>
      <button
        className={`shadow-light px-10 rounded-lg h-fit ${
          activeTab == "mostVisited"
            ? "bg-white text-xl z-10 py-3"
            : "bg-gray-100 -mr-2 z-1 py-2"
        }`}
        name="mostVisited"
        onClick={changeTabHandler}
      >
        پر بازدیدترین آگهی‌ها
      </button>
    </div>
  );
};

const TabContent = ({ activeTab }: { activeTab: string }) => {
  const ads = [
    {
      title: "تارا",
      src: icons.tara_icon.src,
    },
    {
      title: "هایما S7",
      src: icons.haimaS7_icon.src,
    },
    {
      title: "جک S5",
      src: icons.jacks5silver_icon.src,
    },
    {
      title: "فیدلیتی",
      src: icons.fidelity_icon.src,
    },
    {
      title: "دنا پلاس",
      src: icons.dena_icon.src,
    },
  ];
  return activeTab == "mostPopular" ? (
    <Swiper
      loop={false}
      spaceBetween={5}
      navigation={true}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
      }}
    >
      {ads.map((ad) => {
        return (
          <SwiperSlide>
            <div className="border flex flex-col gap-16 items-center px-4 py-8 justify-between rounded-xl border-[#E8E7E6]">
              <img src={ad.src} alt="image" className="h-32 p-4 w-auto" />
              <span className="px-5 font-bold block border-t border-t-[#E8E7E6] pt-3 text-center w-full">
                {ad.title}
              </span>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  ) : (
    ""
  );
};
