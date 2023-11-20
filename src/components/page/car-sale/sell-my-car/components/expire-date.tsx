"use client";
import { GetAdminParameterAdExpireGet } from "@/apis/authentication@";
import { SelectBox } from "@/attom/form@/components@/select@/select-box";
import { InfoCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ExpireDate = ({ formik }: { formik: any }) => {
  const [expireData, setExpireData] = useState<number>();

  useEffect(() => {
    GetAdminParameterAdExpireGet()
      .then((res) => {
        setExpireData(res.AdExpireParameter);

        let formikValue = formik.values;

        formik.setValues({
          ...formikValue,
          expire_day_count: res.AdExpireParameter,
        });
      })
      .catch((err) => toast.error("متاسفانه خطایی رخ داده است."));
  }, []);

  const expirationDates = Array.from(
    { length: expireData },
    (_, index) => index + 1
  );

  // useEffect(() => {
  //   let formikValue = formik.values;

  //   if (formik.values["expire_day_count"] !== "") {
  //     formik.setValues({
  //       ...formikValue,
  //       expire_day_count: "",
  //     });
  //   } else {
  //     formik.setValues({
  //       ...formikValue,
  //       expire_day_count: expireData?.AdExpireParameter,
  //     });
  //   }
  // }, [expireData]);

  return (
    <div className="my-8">
      <span className="text-blue font-bold text-xl">
        مدت زمان اعتبار هر آگهی
      </span>
      <div className="flex items-center gap-1 mt-6">
        <InfoCircle size="24" color="#EB6E02" variant="Bold" />
        <p>
          {" "}
          مدت زمان اعتبار این آگهی از زمان انتشار بر روی پلتفرم متاخودرو{" "}
          <span className="font-extrabold text-orange text-lg">
            {expireData} روز
          </span>{" "}
          است. در صورت نیاز می‌توانید مدت{" "}
          <span className="font-extrabold">زمان کمتری</span> برای اعتبار آگهی
          خود انتخاب نمایید.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 items-start mt-4">
        <SelectBox
          formik={formik}
          selectValue={expireData}
          options={expirationDates.map((item) => ({
            value: item,
            label: item,
          }))}
          name="expire_day_count"
        />
      </div>
    </div>
  );
};

export default ExpireDate;
