import HeadPhone from "@/assets/images/HomePage/headPhoneCall.svg";
import MoreFacilites from "@/assets/images/moreFacilities.png";
import { img } from "@/data";

export default function CardOrderNew() {
  const whyNewCar = [
    {
      title: "امکانات بیشتر",
      description:
        "خودروهای صفر دارای تکنولوژی‌های به روزتری نسبت به خودروهای دست دوم هستند که امکانات بیشتری را برای شما به ارمغان می‌آورند.",
      img: MoreFacilites,
    },
    {
      title: "آرامش خاطر",
      description:
        "ده خودروهای صفر دارای گارانتی پس از فروش بوده و شرکت سازنده خودرو نسبت به خرابی‌های احتمالی پاسخگویی بیشتری دارد.",
      img: img.peace_of_mind.src,
    },
    {
      title: "از اول برای شما",
      description:
        "خرید خودرو صفر این امکان را برای شما ایجاد می‌کند تا اولین استفاده کننده از خودرو شما باشید و این مهم باعث طول عمر بالاتر خودرو می‌شود.",
      img: img.for_you.src,
    },
  ];

  return (
    <div className="mt-14">
      <span className="font-bold text-2xl text-center block mb-5">
        چرا خودرو‌های صفر
      </span>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {whyNewCar.map(({ title, description, img }) => (
          <div className="flex flex-col items-center justify-center gap-4">
            <img src={img} alt={title} />
            <span className="block text-center font-bold mt-4 text-lg">
              {title}
            </span>
            <span className="block text-center lg:px-10">{description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const WhyMetakhodro = () => {
  const whyNewCar = [
    {
      title: "تنوع خدمات",
      description:
        "متاخودرو به عنوان پلتفرمی جامع، کلیه خدمات مرتبط با خودرو اعم از خرید، فروش، کارشناسی و قیمت‌گذاری خودرو  را برای مشتریان فراهم نموده است.",
      img: img.for_you.src,
    },
    {
      title: "مشاوره تخصصی",
      description:
        "یکی از اهداف متاخودرو، ارائه مشاوره تخصصی توسط کارشناسان خبره در زمینه خرید، فروش و کارشناسی خودرو به مشتریان خود است.",
      img: HeadPhone,
    },
    {
      title: "معاملات راحت و مطمئن",
      description:
        "متاخودرو سعی بر ارائه فضایی امن برای خرید و فروش خودرو دارد و مشتریان خود را از ابتدا تا لحظه عقد قرارداد همراهی می‌کند.",
      img: img.peace_of_mind.src,
    },
  ];

  return (
    <div className="mt-14">
      <h2 className="font-bold tablet:text-2xl text-xl text-center block mb-6">
        چرا متاخودرو
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {whyNewCar.map(({ title, description, img }) => (
          <div className="flex flex-col items-center justify-center gap-4">
            <img loading="lazy" src={img} alt={title} />
            <h3 className="block text-center font-bold mt-4 tablet:text-xl text-lg">
              {title}
            </h3>
            <p className="block text-center lg:px-10">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
