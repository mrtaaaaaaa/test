"use client";

import Logo from "@/assets/images/Logo.svg";
import { NumberSeprator } from "@/utils/number-seprator";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsIcon from "@mui/icons-material/Settings";
import SpeedIcon from "@mui/icons-material/Speed";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LikeComp } from "./card-like";
import Image from "next/image";
import Link from "next/link";
import LikeIconInCards from "./components/like-icon-in-cards";

interface CardProductPropsType {
  data: {
    name: string;
    advertiser_id: string | number;
    announced_price: string | number;
    ad_code: string | number;
    is_published: boolean | null;
    fuel_type: string;
    mileage: string | number;
    year_of_manufacture_display: string | number;
    gear_box_type: string;
    like: number;
  };
  image: string;
}

type userInfo = {
  role: string;
} | null;

const CardProduct = ({ data, image }: CardProductPropsType) => {
  const {
    name,
    advertiser_id,
    announced_price,
    ad_code,
    is_published,
    fuel_type,
    mileage,
    year_of_manufacture_display,
    gear_box_type,
    like,
  } = data;

  let userInfo: userInfo;

  useEffect(() => {
    if (typeof window !== "undefined") {
      userInfo = JSON.parse(window.localStorage.getItem("userInfo") ?? "{}");
    }
  }, []);

  const router = useRouter();

  return (
    <Link
      href={`/products/${ad_code}`}
      // onClick={navigateHandler}
      className="cursor-pointer h-fit block"
      title={name}
    >
      <div className="w-full bg-white rounded border border-gray-150 p-4 relative">
        <div className="absolute left-4 top-4">
          <LikeIconInCards
            productDetail={data}
            advertiser_id={advertiser_id}
            index={advertiser_id}
          />
        </div>

        {image ? (
          <Image
            src={`data:image/png;base64,${image}`}
            alt="product"
            className="w-full h-52 object-cover rounded-t-md"
            width={500}
            height={500}
          />
        ) : (
          <div className="w-full h-52 object-cover rounded flex flex-col items-center justify-center">
            <img src={Logo.src} alt="logo" />
          </div>
        )}

        <div className="details flex flex-col mt-8">
          <div className="grid grid-cols-2 justify-between gap-1 mt-4">
            <div>
              <span className="font-bold block whitespace-nowrap truncate text-gray-800">
                {name}
              </span>
              <span className="text-xs font-light text-blue-text">
                مدل {year_of_manufacture_display}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-b-[#D9D8D7] pb-2 mt-3">
            <div className="flex items-center gap-1">
              {/*@ts-ignore */}
              <LocalGasStationIcon sx={{ color: "#90A3BF" }} size="20" />
              <span className="text-xs text-blue-text">{fuel_type}</span>
            </div>

            <div className="flex items-center gap-1">
              {/*@ts-ignore */}
              <SettingsIcon sx={{ color: "#90A3BF" }} size="20" />
              <span className="text-xs text-blue-text">{gear_box_type}</span>
            </div>

            <div className="flex items-center gap-1">
              {/*@ts-ignore */}
              <SpeedIcon sx={{ color: "#90A3BF" }} size="20" />
              <span className="text-xs text-blue-text">
                {" "}
                {mileage} <span style={{ fontSize: "10px" }}>کیلومتر</span>{" "}
              </span>
            </div>
          </div>

          <span className="text-gray-800 text-left flex flex-wrap justify-end items-center mt-2">
            <b className="font-bold ml-1 whitespace-nowrap truncate">
              {NumberSeprator(Number(announced_price))}
            </b>
            <span className="text-xs whitespace-nowrap font-light">تومان</span>
          </span>
        </div>

        {/*@ts-ignore */}
        {userInfo &&
          userInfo?.role == "OperationsDirector" &&
          (is_published ? (
            <span className="absolute top-[-1rem] right-[-1rem] m-2 mb-2 mr-auto text-xs font-light rounded-full px-3 py-1 w-fit block bg-blue text-white">
              منتشر شده
            </span>
          ) : (
            <span className="absolute top-[-1rem] right-[-1rem] m-2 mb-2 mr-auto text-xs font-light rounded-full px-3 py-1 w-fit block bg-red text-white">
              منتشر نشده
            </span>
          ))}
      </div>
    </Link>
  );
};

export default CardProduct;
