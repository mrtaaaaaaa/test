"use client";
import { img } from "@/data";

export const WhyVehicleCheckWithUs = () => {
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

export const VehicleCheckSteps = () => {
  const vehicleCheckStepsItems = [
    {
      title: "خرید پکیج کارشناسی خودرو",
      desc: " کارشناسان متاخودرو، با حضور در قرار بازدید، مسائل فنی و حقوقی معامله‌ را تضمین می‌کنند.",
    },
    {
      title: "ثبت درخواست کارشناسی خودرو",
      desc: " کارشناسان متاخودرو، با حضور در قرار بازدید، مسائل فنی و حقوقی معامله‌ را تضمین می‌کنند.",
    },
    {
      title: "هماهنگی قرار کارشناسی",
      desc: " کارشناسان متاخودرو، با حضور در قرار بازدید، مسائل فنی و حقوقی معامله‌ را تضمین می‌کنند.",
    },
    {
      title: "حضور تیم کارشناسی متاخودرو",
      desc: " کارشناسان متاخودرو، با حضور در قرار بازدید، مسائل فنی و حقوقی معامله‌ را تضمین می‌کنند.",
    },

    {
      title: "ارزیابی تخصصی خودرو",
      desc: " کارشناسان متاخودرو، با حضور در قرار بازدید، مسائل فنی و حقوقی معامله‌ را تضمین می‌کنند.",
    },
  ];
  return (
    <div className="flex flex-col gap-6  justify-center">
      <div className="text-center xl:text-2xl text-xl md:flex hidden justify-center items-center font-bold">
        <span className="">مراحل درخواست </span>
        <span className="text-blue ">کارشناسی خودرو</span>
      </div>
      <img
        className="w-11/12 mx-auto md:block hidden"
        src={img.vahicle_check_steps.src}
      />
      <div className="mx-auto md:hidden flex">
        <img className="" src={img.vahicle_check_steps_mobile.src} />
        <div className="flex flex-col justify-between mt-3">
          <span className="text-lg font-bold">
            مراحل درخواست <span className="text-blue">کارشناسی خودرو</span>
          </span>
          {vehicleCheckStepsItems.map(({ title, desc }) => (
            <div>
              <span className="text-blue font-medium text-sm">{title}</span>
              <p className="font-normal text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
