import { img } from "@/data";

export default function Tab1() {
  return (
    <>
      <div className="relative">
        <img
          src={img.about_us_bg_image.src}
          alt="sample"
          className="lg:w-11/12 mx-auto"
        />
        <h1 className="absolute text-white font-bold lg:text-5xl text-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          درباره ما
        </h1>
      </div>
      <div className="bg-blue text-white flex md:flex-row flex-col-reverse gap-6 py-10 px-8 rounded-md mt-10">
        <p className="lg:text-lg leading-loose lg:text-right text-justify">
          اتو از زیرمجموعه‌های هلدینگ سام، در سال 1401 به عنوان پلتفرمی
          جامع در حوزه معاملات خودرو فعالیت خود را آغاز نموده است. این پلتفرم
          بستری آنلاین و قابل‌اطمینان برای خرید و فروش خودرو بوده که هدف اصلی
          آن، ایجاد تجربه‌ای رضایت‌بخش از معامله‌ای امن با همراهی مشاوران تخصصی،
          برای مشتریان است.
        </p>
      </div>
    </>
  );
}
