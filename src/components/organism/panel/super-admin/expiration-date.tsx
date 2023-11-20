"use client";
import { postExpireDateForAd } from "@/apis/authentication@";
import { InfoCircle } from "iconsax-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
var FormData = require("form-data");

export default function ExpirationDatePage() {
  const [value, setValue] = useState("");

  const formData = new FormData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    formData.append("ad_expire_day", value);
    postExpireDateForAd(formData)
      .then(() => {
        toast.success(`تاریخ انقضای مشخص شده با موفقیت ثبت شد`);
      })
      .catch(() => {
        toast.error(`مشکلی در تعیین تاریخ انقضای آگهی‌ها پیش آمده‌است.`);
      });
  };

  return (
    <>
      <div className="flex md:flex-row flex-col gap-4 items-center">
        <input
          className="bg-gray-150 text-right mt-2 rounded py-3 px-2 w-full text-sm outline-none"
          placeholder="تعداد روز انقضای آگهی رو مشخص کنید"
          type="number"
          onChange={handleChange}
        />
        <button
          className="bg-blue py-2 px-4 md:w-28 w-fit text-white rounded-lg"
          onClick={handleClick}
        >
          تایید
        </button>
      </div>
      <div className="flex items-center gap-1 mt-6">
        <InfoCircle size="24" color="#F87F06" variant="Bold" />
        <p className="text-justify">
          در این بخش سوپرادمین برای آگهی‌های منتشرشده در پلتفرم تاریخی تعیین
          می‌کند که پس از آن تاریخ، آگهی‌های منتشر شده منقضی خواهند شد.{" "}
        </p>
      </div>
    </>
  );
}
