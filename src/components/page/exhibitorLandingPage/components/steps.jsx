import {img} from "@/data"

const Steps = () => {
  const steps = [
    {
      step: 1,
      title: "ثبت‌نام و تکمیل اطلاعات اولیه",
    },
    {
      step: 2,
      title: "احراز هویت توسط اُتو",
    },
    {
      step: 3,
      title: "فعال شدن پنل نمایشگاه",
    },
    {
      step: 4,
      title: "دسترسی به امکانات خرید و فروش",
    },
  ];
  return (
    <div className="tablet:max-w-[1280px] mx-auto tablet:p-4 p-0 tablet:mt-24 mt-16">
      <div className="grid tablet:grid-cols-2 grid-cols-1 gap-4 items-center">
        <div className="p-4">
          <h2 className="text-2xl font-medium">
            چطوری پروفایل نمایشگاهی بسازم؟
          </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-8">
            {steps.map(({ step, title }) => (
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#EAF1F3] text-blue rounded-full flex items-center justify-center">
                  <span>{step}</span>
                </div>
                <span className="font-medium">{title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-tr from-[#2B3990] to-[#1242E0] tablet:rounded-md h-full  text-white flex tablet:flex-row flex-col gap-2 tablet:px-0 px-8 tablet:pt-0 pt-8">
          <div className="tablet:py-8 tablet:pr-8">
            <h2 className="text-2xl font-medium">همکاری با اُتو</h2>
            <span className="font-light block mt-4">
              با عضویت در نمایشگاه‌داران اُتو تبدیل به یکی از همکاران ما در
              بازار معاملات آنلاین خودرو بشوید.
            </span>
          </div>
          <div className="tablet:pt-8 tablet:pl-8">
            <img src={img.man.src} alt="همکاری با اُتو" className="max-w-[14rem] mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;
