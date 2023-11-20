"use client";
import { img } from "@/data";
import { useEffect } from "react";
import { useState } from "react";

const SliderCarSale = () => {
  const [titleClick, setTitleClick] = useState<boolean>(false);

  const handleTitleClick = () => {
    setTitleClick((prv) => !prv);
  };

  useEffect(() => {
    const timeout = setTimeout(() => setTitleClick((prv) => !prv), 5000);
    return () => clearTimeout(timeout);
  }, [titleClick]);

  return (
    <>
      <div className="my-8">
        <span className="text-center font-bold xl:text-2xl text-xl block ">
          با اُتو فروش خودرو آسان‌تر از چیزی است که فکر می‌کنید!
        </span>

        <div className="py-3 w-3/4 m-auto md:-mt-4 -mt-10 bg-blue-100 "></div>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 w-11/12 mx-auto justify-center items-center">
        <div className="bg-blue rounded-xl px-10 py-8 md:h-[18rem] h-auto flex flex-col justify-between">
          <div>
            <span
              className={`text-white font-bold cursor-pointer text-lg block mb-2 
                        ${
                          titleClick == false &&
                          " border-white pb-2 w-fit border-b-2"
                        }`}
              onClick={handleTitleClick}
            >
              تجربه دلنشین فروش خودرو
            </span>
            <p
              className={`transition-all duration-200 text-white font-light
                         ${
                           titleClick == false
                             ? "opacity-1 mt-3 mb-4 visible"
                             : "opacity-0 md:-mt-3 -mt-16 invisible"
                         }`}
            >
              برای فروش خودرو، فقط کافیست آگهی فروش خود را در متاخودرو ثبت کنید.
            </p>

            <span
              className={`text-white font-bold cursor-pointer text-lg block mb-2  ${
                titleClick ? "mt-5 border-white pb-2 w-fit border-b-2 " : "mt-6"
              }`}
              onClick={handleTitleClick}
            >
              دریافت هدیه کارشناسی خودرو
            </span>
            <p
              className={`transition-all duration-200 text-white font-light ${
                titleClick
                  ? "opacity-1 mt-3 visible"
                  : "opacity-0 md:-mt-3 -mt-16 invisible"
              }`}
            >
              در زمان فروش خودرو خود، کارشناسی تخصصی خودرو از متاخودرو هدیه
              بگیرید.
            </p>
          </div>

          <div className="flex items-center justify-center bg-green-500 space-x-8 gap-2 mt-4">
            <div
              className={`transition-all cursor-pointer w-2 h-2 ${
                titleClick ? "bg-white" : "border border-white"
              } rounded-full`}
              onClick={handleTitleClick}
            ></div>
            <div
              className={`transition-all cursor-pointer w-2 h-2 ${
                titleClick == false ? "bg-white" : "border border-white"
              } rounded-full`}
              onClick={handleTitleClick}
            ></div>
          </div>
        </div>

        <div className="bg-blue-300 lg:rounded-tl-xl rounded-bl-xl lg:rounded-br-0 h-fit relative pt-5 lg:w-fit md:w-3/4 w-11/12 mx-auto">
          <img
            loading="lazy"
            src={img.bmw_car.src}
            className=" w-3/4  mx-auto"
          />
        </div>
      </div>
    </>
  );
};

export default SliderCarSale;
