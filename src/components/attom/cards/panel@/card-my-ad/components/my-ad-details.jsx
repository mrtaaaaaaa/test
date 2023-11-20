import { NumberSeprator } from "@/utils/number-seprator";
import moment from "jalali-moment";

export default function MyAdDetails({ product }) {
  const {
    brand,
    year_of_manufacture_display,
    mileage,
    color,
    gear_box_type,
    fuel_type,
    announced_price,
  } = product;

  const time =
    product.publication_start_date != 0
      ? moment.unix(product.publication_start_date).format("jYYYY/jM/jD")
      : "منتشر نشده";

  return (
    <div className="col-span-2 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 bg-gray-50 py-3 px-4 rounded-md  gap-5">
      <div className="flex-col">
        <span className="block text-gray-500 text-xs">برند و مدل</span>
        <span className="block font-medium text-sm mt-1">{brand}</span>
      </div>
      <div className="flex-col">
        <span className="block text-gray-500 text-xs">سال ساخت</span>
        <span className="block font-medium text-sm mt-1">
          {year_of_manufacture_display}
        </span>
      </div>
      <div className="flex-col">
        <span className="block text-gray-500 text-xs">کارکرد خودرو</span>
        <span className="block font-medium text-sm mt-1">
          {mileage} <small>کیلومتر</small>
        </span>
      </div>
      <div className="flex-col">
        <span className="block text-gray-500 text-xs">رنگ</span>
        <span className="block font-medium text-sm mt-1">{color}</span>
      </div>
      <div className="flex-col">
        <span className="block text-gray-500 text-xs">گیربکس</span>
        <span className="block font-medium text-sm mt-1">
          {gear_box_type ? gear_box_type : "-"}
        </span>
      </div>
      <div className="flex-col">
        <span className="block text-gray-500 text-xs">نوع سوخت</span>
        <span className="block font-medium text-sm mt-1">
          {fuel_type ? fuel_type : "-"}
        </span>
      </div>
      <div className="flex-col">
        <span className="block text-gray-500 text-xs">تاریخ انتشار آگهی</span>
        <span className="block font-medium text-sm mt-1">{time}</span>
      </div>
      <div className="flex-col">
        <span className="block text-gray-500 text-xs">قیمت</span>
        <div className="flex flex-wrap items-center">
          <span className="font-bold text-blue text-sm">
            {NumberSeprator(announced_price)}
          </span>
          <span className="text-blue mr-1 font-light md:whitespace-nowrap text-xs">
            تومان
          </span>
        </div>
      </div>
    </div>
  );
}
