import { img } from "@/data";
import VipBuyModal from "./components/modal";

export default function VipPurchase({brandModel}: any) {
  const data = [
    "خریدی مطمئن در بستری امن",
    "صرفه‌جویی در زمان و انرژی",
    "دسترسی به گزینه‌های بهتر",
    "مشاورۀ تخصصی خرید",
  ];

  return (
    <div className="bg-gray-150 p-10 rounded flex flex-col justify-end relative">
      <VipBuyModal brandModel={brandModel}/>
      <ul className="list-disc flex flex-col gap-4 w-fit mt-8 mr-auto mb-8 pl-4">
        {data.map((text) => (
          <li className="text-gray-800 font-medium">{text}</li>
        ))}
      </ul>
      <img
        src={img.car_order_1.src}
        alt="noral"
        className="md:absolute -bottom-2 xl:-right-20 right-0 xl:w-fit w-[22rem]"
      />
    </div>
  );
}
