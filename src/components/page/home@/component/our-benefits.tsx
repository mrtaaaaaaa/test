import { icons } from "@/data";

const OurBenefits = () => {
  const detail = [
    {
      title: "قابل اعتماد",
      descrption: "برای خرید و فروش خودرو به کارشناسان ما اعتماد کنید.",
      icon: icons.trustable_icon.src,
    },
    {
      title: "سرعت و دقت",
      descrption:
        "دقت در ارائه خدمات شما را در سریع‌ترین زمان به هدف‌تان می‌رساند.",
      icon: icons.speed_icon.src,
    },
    {
      title: "همراهی",
      descrption: "تا لحظه عقدقرارداد کارشناسان ما همراه شما خواهند بود.",
      icon: icons.communicate_icon.src,
    },
    {
      title: "تنوع خدمات",
      descrption:
        "کلیه خدمات مرتبط با خودرو از خرید، فروش، کارشناسی و قیمت‌گذاری را از ما بخواهید.",
      icon: icons.scop_icon.src,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 md:mt-24 mt-16 lg:gap-16 md:gap-8 gap-2 p-4">
      {detail.map((item, index) => {
        return (
          <div
            className="flex flex-col lg:gap-8 gap-2 md:p-8 p-4 rounded-3xl justify-center items-center bg-light-blue border-2 border-blue-50"
            key={index}
          >
            <img src={item.icon} className="" />
            <h4 className="font-bold font-bols text-lg text-center">
              {item.title}
            </h4>
            <p className="text-center leading-relaxed md:text-base text-sm">
              {item.descrption}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default OurBenefits;
