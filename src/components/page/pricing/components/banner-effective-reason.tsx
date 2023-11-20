import CustomAccordion from "@/attom/form@/components@/accordion@/accordion";
import { img } from "@/data";

const BannerEffectiveReason = () => {
  const IncreaseCarValue = [
    {
      id: 1,
      title: "سرویس خودرو",
      description:
        "برای خرید خودروی کارکرده می بایست به سن آن توجه شود، زیرا طول عمر بالای خودرو سبب کاهش قیمت می‌شود .",
    },
    {
      id: 2,
      title: "رنگ خودرو",
      description:
        "برخی از رنگ‌ها محبوبیت بیشتری بین خریداران دارند که سبب می‌شود ارزش خودرو نسبت به رنگ‌های دیگر بیشتر شود.",
    },
    {
      id: 3,
      title: "سلامت بدنه",
      description:
        "عدم وجود خط‌وخش و سلامت بدنه خودرو نسبت به خودرویی که وضعیت سالمی ندارد، سبب افزایش ارزش خودروی موردنظر می‌شود .",
    },
    {
      id: 4,
      title: "بیمه ثالث خودرو",
      description:
        "هرچه تعداد ماه‌های باقی‌مانده از بیمه ثالث خودرو بیشتر باشد، در افزایش قیمت خودرو تاثیر خواهد داشت.",
    },
  ];

  const DescreaseCarValue = [
    {
      id: 1,
      title: "رنگ‌شدگی و تعویض قطعات بدنه خودرو",
      description:
        "رنگ‌شدگی و تعویض قطعات بدنه خودرو یکی از عوامل مهم و موثر در کاهش قیمت خودروی کارکرده به حساب می‌آید. لازم به توضیح است که رنگ‌شدگی و تعویض قطعات در قسمت جلوی خودرو، افت قیمت بیشتری را به‌دنبال دارد.",
    },
    {
      id: 2,
      title: "تصادف سنگین",
      description:
        "سقف رنگ‌شده خودرو نشان‌دهنده تصادف سنگین خودرو بوده و کاهش قیمت را به دنبال خواهد داشت. باید در نظر داشت که تصادف‌های کوچک ممکن است تاثیر چندانی بر قیمت خودرو نگذارند، اما اگر تصادف سبب لطمه به شاسی، ستون یا سقف خودرو گردد، افت قیمت بسیاری را در پی خواهد داشت.",
    },
    {
      id: 3,
      title: "کارکرد خودرو (کیلومتر)",
      description:
        "تأثیر کارکرد یا همان کیلومتر روی قیمت خودروی کارکرده، تابعی از عواملی چون قیمت پایه خودرو، سن خودرو، نوع خودرو و … بوده که کارکرد خودروی ایرانی بین 20 تا 25 هزار کیلومتر و کارکرد خودروی خارجی 15 هزار کیلومتر در سال است. بنابراین کارکرد بیشتر از این مقدار کیلومتر سبب افت قیمت خودرو می‌شود.",
    },
    {
      id: 4,
      title: "سن و طول عمر خودرو",
      description:
        "برای خرید خودروی کارکرده می بایست به سن آن توجه شود، زیرا طول عمر بالای خودرو سبب کاهش قیمت می‌شود .",
    },
  ];

  return (
    <div className="my-20">
      <h2 className="text-center tablet:text-2xl text-xl font-bold mb-6">
        عواملی که بر
        <span className="text-blue font-bold"> ارزش خودرو </span>
        تاثیر می‌گذارند.
      </h2>

      <div className="md:grid grid-cols-2 flex flex-col gap-10 lg:w-11/12 mx-auto items-start">
        <div className="flex flex-col ">
          <div className="bg-gray-100 p-4 pt-8 rounded-lg md:w-full w-11/12 md:mx-0 mx-auto lg:h-5/6 mb-6">
            <span className="text-blue  block text-center border-b-blue border-b pb-2 font-bold text-xl w-fit mx-auto">
              مواردی که ارزش خودرو را کاهش می‌دهد
            </span>
            <img
              loading="lazy"
              src={img.mazda_car.src}
              alt="درخواست خودت را بساز"
              className="lg:h-[14rem]  mx-auto"
            />
          </div>
          <div>
            <CustomAccordion data={DescreaseCarValue} />
          </div>
        </div>
        <div className="flex flex-col ">
          <div className="bg-gray-100 p-4 pt-8 rounded-lg md:w-full w-11/12 md:mx-0 mx-auto lg:h-5/6 mb-6">
            <span className="text-blue block text-center border-b-blue border-b pb-2 font-bold text-xl w-fit mx-auto">
              مواردی که ارزش خودرو را افزایش می‌دهد
            </span>
            <img
              loading="lazy"
              src={img.bmw_car.src}
              alt="خودرو غیر نو نخر"
              className="h-[14rem] mx-auto"
            />
          </div>

          <div>
            <CustomAccordion data={IncreaseCarValue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerEffectiveReason;
