import cityCars from "@/assets/images/cityCars.png";
import environmentCars from "@/assets/images/environmentCars.png";
import offroadCars from "@/assets/images/ofroadCars.png";
import roadCars from "@/assets/images/roadCars.png";
import { Link } from "next/link";
// import { FreeMode, Navigation, Thumbs } from "swiper";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import { Swiper, SwiperSlide } from "swiper/react";

const Card = ({ link, img, title }) => {
  return (
    <Link
      href={link && link}
      className="flex flex-col items-center justify-center border border-grey-400 rounded-lg p-5 h-full"
    >
      <img src={img} alt="image" className="w-2/3" />
      <span className="text-center block font-bold text-lg mt-4 whitespace-normal">
        {title}
      </span>
    </Link>
  );
};

export default function CardTopicsFromExperts() {
  const topicsFromTheExperts = [
    {
      title: "بهترین خودروهای شهری",
      img: cityCars,
      link: "/car-order/city-car",
    },
    {
      title: "بهترین خودروهای جاده",
      img: roadCars,
      link: "/car-order/road-car",
    },
    {
      title: "بهترین خودروهای آفرود",
      img: offroadCars,
      link: "/car-order/offroad-car",
    },
    {
      title: "بهترین خودروهای سازگار با محیط زیست",
      img: environmentCars,
      link: "/car-order/environmentally-friendly-car",
    },
  ];

  return (
    <div>
      {/* <h4 className="font-bold text-center text-xl mb-10">
        دسته‌بندی خودرو‌های پیشنهادی کارشناسان متاخودرو
      </h4>

      <Swiper
        loop={false}
        spaceBetween={20}
        // navigation={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="p-10 home-page_slider"
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 4,
          },
        }}
      >
        {topicsFromTheExperts.map(({ title, img, link }) => (
          <SwiperSlide className="p-2" style={{ height: "20rem",whiteSpace:'nowrap' }}>
            <Card title={title} img={img} link={link} />
          </SwiperSlide>
        ))}
      </Swiper> */}

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-10 mt-10"></div>
    </div>
  );
}
