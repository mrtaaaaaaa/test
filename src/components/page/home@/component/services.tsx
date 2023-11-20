import { icons } from "@/data";
import Link from "next/link";

const Services = () => {
  let serviceItems = [
    {
      title: "خرید اقساطی",
      icon: icons.leasing_icon.src,
      path: "/car-installment",
    },
    {
      title: "خرید خودرو",
      icon: icons.buycar_icon.src,
      path: "/car-order/list/products",
    },
    {
      title: "فروش خودرو",
      icon: icons.carsale_icon.src,
      path: "/car-sale",
    },
    {
      title: "قیمت‌گذاری خودرو",
      icon: icons.pricing_icon.src,
      path: "/pricing",
    },
    {
      title: "کارشناسی خودرو",
      icon: icons.vehiclecheck_icon.src,
      path: "/vehicle-check",
    },
  ];

  return (
    <div className="mt-20 p-4">
      <div className="border border-blue-50 w-2/3 mx-auto"></div>
      <h2 className="text-center mt-[-1.7rem] mx-auto flex items-center gap-2 px-8 py-3 text-xl w-fit font-bold bg-light-blue border-blue-50 border-2 rounded-full">
        <img src={icons.services_icon.src} className="h-6" />
        خدمات ما
      </h2>
      <div className="grid lg:grid-cols-5 tablet:grid-cols-4 grid-cols-2 items-center xl:gap-12 lg:gap-8 md:gap-4 gap-6 mt-8">
        {serviceItems.map(({ title, icon, path }) => {
          return (
            <Link href={path}>
              <div className="flex flex-col justify-center md:p-8 p-4 border-2 border-gray-250 rounded-3xl col-span-1 items-center gap-4 text-center">
                <img src={icon} className="md:h-28 h-20" />
                <span className="font-medium lg:text-lg text-base">{title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Services;
