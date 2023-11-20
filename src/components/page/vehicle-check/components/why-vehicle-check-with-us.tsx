"use client";

import { img } from "@/data";

export default function WhyVehicleCheckWithUs ()  {
  const tipBoxes = [
    {
      title: "آرامش خاطر",
      img: img.peace_of_mind.src,
      desc: "با استفاده از کارشناسی متاخودرو، نسبت به سلامت فنی و بدنه خودرو اطمینان حاصل خواهید کرد",
    },
    {
      title: "بهترین قیمت",
      img: img.trade.src,
      desc: "متاخودرو سعی می‌کند ارزش‌گذاری واقعی و منصفانه از قیمت خودرو به شما ارائه دهد",
    },
    {
      title: "ضمانت‌نامه",
      img: img.for_you.src,
      desc: "متاخودرو نتیجه بررسی فنی و بدنه خودرو را پس از کارشناسی به دو صورت آنلاین و نسخه چاپی به شما ارائه می‌دهد",
    },
  ];

  return (
    <div className="">
      <div className="flex flex-wrap gap-1 font-bold justify-center md:text-2xl text-xl mb-8">
        <span>چرا</span>
        <span className="text-blue whitespace-nowrap">کارشناسی خودرو</span>
        <span className="font-bold whitespace-nowrap">با متاخودرو؟</span>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
        {tipBoxes.map(({ title, desc, img }) => {
          return (
            <div>
              <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg ">
                <img src={img} />
                <span className="font-bold block text-lg">{title}</span>
                <p className="text-center text-sm">{desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
