import { img } from "@/data";

const Tab4 = () => {
  const feauters = [
    {
      title: "احترام",
      content:
        "اصلی‌ترین ارزش سازمانی در متاخودرو، احترام و رعایت اصول اخلاقی نسبت به همدیگر است و همه اعضای شرکت با درک اهمیت این ارزش، سعی در برقراری ارتباطات سازمانی مبتنی بر احترام دارند.",
    },
    {
      title: "نظم و انضباط",
      content:
        "نظم و انضباط به عنوان سرلوحه اهداف ما، در تمامی واحدهای متاخودرو نهادینه شده و همه اعضا در راستای پیشبرد کارها به شیوه ای دقیق و به دور از خطا تلاش می کنند.",
    },
    {
      title: "مشتری‌محور",
      content:
        "ما در متاخودرو شنونده و بینندة همکاران و مشتریان هستیم تا مطمئن شویم کوچک‌ترین خواسته‌های آن‌ها بی‌جواب نمانده است.",
    },
    {
      title: "کارگروهی",
      content:
        "با درک ارزش کارگروهی و تاثیر آن در افزایش بهره‌وری سازمان، همه اعضای متاخودرو در کنار کارگروهی با تصمیم‌گیری جمعی به سمت اهداف سازمان پیش می‌روند.",
    },
  ];

  return (
    <>
      <div className="relative lg:w-11/12 mx-auto">
        <img src={img.arzesh_img.src} className="w-full" />
        <h1 className="absolute text-white font-bold lg:text-5xl text-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          ارزش‌‌های سازمانی
        </h1>
      </div>
      <div className="grid md:grid-cols-2 md:gap-4 gap-10 mt-10">
        {feauters.map((feature) => (
          <div className="border border-gray-300 rounded-lg bg-gray-50 p-5">
            <span className="text-blue  block font-bold mb-2 text-lg">
              {feature.title}
            </span>
            <p>{feature.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tab4;
