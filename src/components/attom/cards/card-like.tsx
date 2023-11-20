import Logo from "@/assets/images/Logo.svg";
import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";
import { checkExistWindow } from "@/utils/check-exist-window";
import { NumberSeprator } from "@/utils/number-seprator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Puff } from "react-loading-icons";
import LikeIconInCards from "./components/like-icon-in-cards";

interface PropTypes {
  index: string | number;
  item: any;
}

export default function CardLiked({ item, index }: PropTypes) {
  const [data, setData] = useState<any[] | string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useRouter();

  useEffect(() => {
    var config = {
      responseType: "blob",
    };

    let arrayImage = null;

    if (item.image_guids?.length > 0) {
      arrayImage = item.image_guids?.split(",");
    }

    if (arrayImage?.length > 0 && typeof window !== "undefined") {
      httpService
        .get(`${FRONT2DB}/Images/Id/${arrayImage[0]}`, config)
        .then((res) => {
          setData([
            ...data,
            ...(checkExistWindow()
              ? [window.URL.createObjectURL(res.data)]
              : []),
          ]);
          setLoading(false);
        });
    }

    if (arrayImage == null) {
      setLoading(false);
    }
  }, []);

  const navigateHandler = () => {
    navigate.push(`/products/${item.ad_code}`);
  };

  return (
    <div
      className="border border-blue rounded bg-[#F4F7F9] grid md:grid-cols-3 grid-cols-1 gap-4 items-center cursor-pointer"
      onClick={navigateHandler}
    >
      {loading && (
        <div className="w-full h-full object-cover flex flex-col items-center justify-center text-blue ">
          <Puff stroke="#1242E0" strokeOpacity={0.125} speed={0.75} />
        </div>
      )}

      {!loading && data && (
        <img
          src={String(data)}
          alt="product"
          className=" w-full h-full object-cover"
        />
      )}

      {item?.image_guids?.length == 0 && (
        <div className="w-full h-full object-cover flex flex-col items-center justify-center bg-white p-8">
          <img src={Logo.src} alt="logo" className="w-full" />
        </div>
      )}

      <div className="flex md:col-span-2 flex-col gap-2 py-2 px-2 w-full">
        <span className="block font-medium">
          {item?.brand} - {item?.model}{" "}
        </span>
        <div>
          <span className="text-gray-400 font-light text-sm block">
            مدل {item?.year_of_manufacture}
          </span>
          <span className="text-gray-400 font-light text-sm block mb-2">
            {" "}
            {item?.mileage} کیلومتر
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-1 text-blue items-center">
            <span className="font-bold">
              {NumberSeprator(item?.announced_price)}
            </span>
            <span className="text-sm">تومان</span>
          </div>
        </div>
        <LikeIconInCards
          productDetail={item}
          advertiser_id={item.advertiser_id}
          index={item.advertiser_id}
        />
      </div>
    </div>
  );
}
