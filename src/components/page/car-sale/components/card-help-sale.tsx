import { icons } from "@/data";

const CardHelpSale = () => {
  const Items = [
    {
      img: icons.readycar_icon.src,
      title: "آماده‌سازی خودرو برای ثبت آگهی",
      desc: "اولین قدم، تمیز نگه‌داشتن خودرو، آماده‌سازی مدارک حقوقی، رفع نواقص فنی و بدنه خودرو و تمدید بیمه است.",
    },
    {
      img: icons.adsale_icon.src,
      title: "ثبت آگهی فروش در سایت",
      desc: "جهت ایجاد آگهی فروش در متاخودرو باید درج مشخصات فردی، اطلاعات فنی و بدنه، توضیحات تکمیلی آگهی خودرو و بارگذاری عکس‌های خودرو صورت پذیرد.",
    },
    {
      img: icons.coordinatvisit_icon.src,
      title: "هماهنگی زمان بازدید",
      desc: "در این مرحله هماهنگی‌های لازم برای روز و ساعت بازدید خودرو از سمت متاخودرو با فروشنده و خریدار انجام می‌پذیرد.",
    },
  ];
  return (
    <div className="my-20">
      <span className="text-center font-bold xl:text-2xl text-xl block mb-6">
        راهنمای فروش خودرو شما
      </span>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16">
        {Items.map(({ img, title, desc }) => (
          <div className="flex flex-col rounded-xl gap-4 items-center px-6 py-8 border border-gray-300">
            <img className="p-3 rounded-md h-[7rem]" src={img} loading="lazy" />
            <span className="font-medium py-2 text-lg">{title}</span>
            <p className="text-center">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardHelpSale;