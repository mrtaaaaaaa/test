import { icons } from "@/data";

const BannerWhyPricing = () => {
  const whyPricing = [
    {
      img: icons.valuable_icon.src,
      title: "سریع و آسان",
      description: "تجربه‌ای جدید از فروش آسان و راحت خودرو",
    },
    {
      img: icons.pricingfast_icon.src,
      title: "براساس نوسانات روزانه بازار",
      description: "قیمت حدودی خودرو براساس نوسانات روزانه بازار",
    },
    {
      img: icons.freepricing_icon.src,
      title: "کاملا رایگان",
      description: "بدون پرداخت هزینه با چند کلیک",
    },
  ];
  return (
    <div>
      <h2 className="text-center tablet:text-2xl text-xl font-bold mb-6 mt-20">
        چرا قیمت‌گذاری با <span className="text-blue font-bold">‌متاخودرو</span>
        ؟
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {whyPricing.map(({ img, title, description }) => (
          <div className="flex flex-col gap-4 xl:px-10 px-5">
            <img
              src={img}
              alt={title}
              className="mx-auto tablet:w-20 tablet:h-20 w-14 h-14"
            />
            <span className="font-bold text-center block text-lg">{title}</span>
            <p className="text-center">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerWhyPricing;
