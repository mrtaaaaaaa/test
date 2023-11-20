import { img } from "@/data";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

export default function NormalPurchase() {
  const data = [
    "خریدی مطمئن در بستری امن",
    "صرفه‌جویی در زمان و انرژی",
    "دسترسی به گزینه‌های بهتر",
    "مشاورۀ تخصصی خرید",
  ];

  return (
    <div className="bg-gray-150 p-10 rounded flex flex-col justify-start relative">
      <Link
        href="/car-order/used/products"
        className="bg-white text-blue border border-blue-200 px-24 py-2 rounded font-medium ml-auto flex items-center gap-2"
      >
        خرید عادی
        <FaChevronLeft />
      </Link>
      <ul className="list-disc flex flex-col gap-4 w-fit mt-8 ml-auto mb-8 pr-6">
        {data.map((text) => (
          <li className="text-gray-800 font-medium">{text}</li>
        ))}
      </ul>
      <img
        src={img.car_order_2.src}
        alt="noral"
        className="md:absolute -bottom-2 xl:-left-20 left-0 xl:w-fit w-[22rem]"
      />
    </div>
  );
}
