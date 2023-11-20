import React from "react";
import {
  InstallmentIntroSection,
  InstallmentIntroV2,
} from "./installment-intro-section";
import { img } from "@/data";
import FAQ from "@/attom/faq/faq";

export default function InstallmentFAQ() {
  const reciveLoan = [
    <h2 className="">
      ابتدا با یکی از شماره‌های زیر تماس بگیرید:
      <br />
      <span className="mr-auto ltr text-left">
        {" "}
        021-88108261 , 021-88108260
      </span>
    </h2>,
    "بعد از تماس، شما را اعتبارسنجی می‌کنیم.",
    "در صورتی که نتیجه اعتبارسنجی مورد تایید باشد، امکان دریافت تسهیلات خرید خودرو تا سقف 60 درصد ارزش خودرو به شما اعطا می‌شود.",
    "در صورتی که خودرو موردنظر خود را انتخاب کرده‌اید، تسهیلات به شما اعطا می‌شود و در غیر این صورت، در انتخاب خودرو مناسب، مشاوره‌ اختصاصی و رایگان به شما داده می‌شود.",
    "در نهایت پس از تنظیم قولنامه، خودرو متعلق به شماست!",
  ];

  const docsCondition = [
    [
      "برگه عضویت سامانه ثنا",
      "چک صیادی بنفش",
      "اصل مدارک هویتی (شناسنامه و کارت ملی)",
      // "اسناد شغلی",
      // "پرینت میانگین حساب",
      // "کپی سند مسکونی یا اجاره‌نامه",
    ],
    [
      "برگه عضویت سامانه ثنا",
      "چک صیادی بنفش",
      "اصل مدارک هویتی (شناسنامه و کارت ملی)",
      // "پرینت حساب بانکی",
      // "کپی سند مسکونی یا اجاره‌نامه",
    ],
  ];

  const accordionValue = [
    // {
    //   title: "بعد از اعتبارسنجی آیا محدودیت زمانی برای استفاده از آن دارم؟",
    //   desc: [
    //     {
    //       paragraph: {
    //         desc: "مراحل دریافت تسهیلات از اُتو مطابق مسیر زیر است:",
    //         component: (
    //           <InstallmentIntroSection
    //             img={img.installment_road_map.src}
    //             menu={reciveLoan}
    //             title={"مراحل دریافت تسهیلات"}
    //           />
    //         ),
    //       },
    //     },
    //   ],
    //   open: true,
    // },
    {
      title: "برای دریافت تسهیلات از اُتو چه مراحلی را باید طی کنم؟",
      desc: [
        {
          paragraph: {
            desc: "مراحل دریافت تسهیلات از اُتو مطابق مسیر زیر است:",
            component: (
              <InstallmentIntroSection
                img={img.installment_road_map.src}
                menu={reciveLoan}
                title={"مراحل دریافت تسهیلات"}
              />
            ),
          },
        },
      ],
      open: true,
    },
    {
      title: "بعد از اعتبارسنجی، آیا محدودیت زمانی برای استفاده از آن دارم؟",
      desc: [
        {
          paragraph: {
            desc: "بله. اعتبارسنجی شما تا 24 ساعت معتبر است.",
          },
        },
      ],
    },
    {
      title: "آیا برای خرید اقساطی خودرو ضامن نیاز دارم؟",
      mainTitle: (
        <h2 className="text-center mb-5">
          شرایط و مدارک <span className="font-bold text-xl">خرید اقساطی</span>
        </h2>
      ),
      desc: [
        {
          paragraph: {
            desc: `دریافت تسهیلات تا سقف 300 میلیون تومان، بدون نیاز به ضامن و تنها با مدارک متقاضی انجام می‌شود. از 300 تا 600 میلیون تومان تسهیلات نیازمند یک ضامن، و از 600 میلیون تا 1 میلیارد تومان تسهیلات نیز نیازمند دو ضامن است.`,
            component: (
              <InstallmentIntroV2
                menu={docsCondition}
                title={["مدارک متقاضی", "مدارک هر ضامن"]}
              />
            ),
          },
        },
      ],
    },
  ];

  return <FAQ accordionValue={accordionValue} isMore={false} />;
}
