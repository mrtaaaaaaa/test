import { img } from "@/data";
import Link from "next/link";

export default function CarOrderInfo() {
  return (
    <div className="flex flex-col gap-20 mb-24">
      <div className="md:grid grid-cols-2 flex flex-col-reverse items-end gap-0">
        <div className="md:bg-gray-lightest bg-white pt-16 pb-40 relative rounded-tr-lg rounded-tl-lg rounded-br-lg md:rounded-bl-none rounded-bl-lg md:w-full w-11/12 lg:mt-0 -mt-4 md:mx-0 mx-auto">
          <span className="text-blue  block text-center border-b-blue border-b pb-3 font-bold text-2xl w-fit mx-auto">
            خوش قیمت‌ترین خودروها
          </span>
          <img
            loading="lazy"
            src={img.porche_car.src}
            alt="تنوع قیمت در آگهی‌ها"
            className="absolute -bottom-16 m-auto left-0 right-0 lg:w-1/2 md:w-2/3 w-3/4"
          />
        </div>
        <div className="bg-blue text-white h-fit p-10 flex flex-col items-center rounded-tl-lg rounded-bl-lg md:rounded-tr-none rounded-tr-lg md:rounded-br-none rounded-br-lg">
          <span>
            متاخودرو از طریق ارتباط با تامین کنندگان و فروشندگان متعدد، فضایی
            رقابتی را برای خرید خودرو صفر ایجاد کرده‌است.
          </span>
          <Link
            href="/pricing"
            className="border border-white rounded-lg px-6 py-2 w-fit mr-auto mt-5"
          >
            قیمت خودرو شما
          </Link>
        </div>
      </div>

      <div className="md:grid grid-cols-2 flex flex-col items-end gap-0 ">
        <div className="bg-blue text-white h-fit p-10 flex flex-col items-center rounded-tr-lg rounded-tl-lg rounded-br-lg md:rounded-bl-none rounded-bl-lg">
          <span>
            با استفاده از کارشناسی تخصصی تیم متاخودرو، از صفر بودن خودرو خود قبل
            از خرید اطمینان پیدا کنید
          </span>
          <Link
            className="border border-white rounded-lg px-6 py-2 w-fit mr-auto mt-5"
            href="/vehicle-check"
          >
            کارشناسی خودرو
          </Link>
        </div>

        <div className="md:bg-gray-lightest bg-white pt-16 pb-40 relative rounded-tl-lg rounded-bl-lg rounded-tr-lg md:w-full w-11/12 lg:mt-0 -mt-4 md:mx-0 mx-auto">
          <span className="text-blue  block text-center border-b-blue border-b pb-3 font-bold text-2xl w-fit mx-auto">
            {" "}
            خودروی کارشناسی شده
          </span>
          <img
            loading="lazy"
            src={img.bmw_car.src}
            alt="خودرو غیر نو نخر"
            className="absolute -bottom-16 m-auto left-0 right-0 md:w-2/3 w-3/4"
          />
        </div>
      </div>
    </div>
  );
}
