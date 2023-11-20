import { img } from "@/data";
import Link from "next/link";
import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";

export default function AffordablePrice() {
  return (
    <div
      className="mt-4 bg-white rounded grid grid-cols-3"
      style={{
        filter: "drop-shadow(0px 1px 8px rgba(0, 0, 0, 0.18))",
      }}
    >
      <div className="bg-gray-150 p-6 flex flex-col">
        <span className="text-gray-800 text-center block font-bold text-2xl">
          خوش قیمت‌ترین خودروها
        </span>
        <img src={img.man_image.src} alt="man" className="mx-auto mt-6" />
      </div>
      <div className="col-span-2 p-8 flex flex-col justify-between items-center">
        <p className="text-gray-800 font-medium text-lg">
          اُتو از طریق ارتباط با تأمین‌کنندگان و فروشندگان متعدد خودرو، فضایی
          امن را برای رقابت در بازار خرید خودروی صفر مهیا کرده است.
        </p>
        <Link
          href="/pricing"
          className="bg-blue-100 text-blue rounded px-4 py-2 mr-auto font-medium flex items-center gap-2"
        >
          قیمت گذاری خودرو
          <IoChevronBackSharp />
        </Link>
      </div>
    </div>
  );
}
