"use client";

import { useEffect, useState } from "react";
import carImage from "@/assets/images/BMWmap.png";
import { icons } from "@/data";

export function SliderUsedCarOrder() {
  const [isClicked, setIsCliked] = useState(0);

  const bannerMenu = [
    {
      title: "دسترسی به آگهی‌های متنوع",
      icon: "",
    },
    {
      title: "خوش قیمت‌ترین خودرو‌ها",
      icon: "",
    },
    {
      title: "دریافت مشاوره تخصصی",
      icon: "",
    },
  ];

  useEffect(() => {
    let intervalId = setInterval(() => {
      setIsCliked(Number(isClicked + 1));
    }, 2000);

    if (isClicked == 3) {
      setIsCliked(0);
    }
    setTimeout(() => {
      clearInterval(intervalId);
    }, 3000);
  }, [isClicked]);

  const imageHandler = (index: number) => {
    const imgName = `car_order_slider_${index + 1}`;
    //@ts-ignore
    return icons[imgName]?.src;
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(270deg, #FAFAFA 0%, rgba(250, 250, 250, 0) 203.13%)",
      }}
      className="grid md:grid-cols-2 grid-cols-1 justify-center gap-8 px-10 xl:py-0 py-8 shadow-xl"
    >
      <div className="flex flex-col justify-center gap-5 xl:pr-32">
        {/* <span className="block">مزایای خرید با متاخودرو؟</span> */}
        <span className=" md:text-2xl text-xl font-bold block leading-relaxed">
          "بهترین تجربه خرید خودرو کارکرده"
        </span>
        <div className="flex flex-col gap-3">
          {bannerMenu.map(({ title }, index) => {
            return (
              <div key={title}>
                <span
                  className={`${
                    isClicked == index &&
                    "border-2 border-[#B1C8FD]  transition-all ease-in-out delay-150  text-lg duration-300  rounded-sm"
                  } 
                  font-bold xl:py-4 py-3 block px-4 md:w-80 whitespace-nowrap  bg-transparent border-1 border-[#B1C8FD]`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white max-w-max">
                      <img src={imageHandler(index)} alt="" />
                    </div>
                    <span>{title}</span>
                  </div>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <img src={carImage.src} className="md:w-5/6 w-2/3 md:mr-auto mx-auto" />
      </div>
    </div>
  );
}
