"use client";
import { REMOVE_ALL } from "@/redux/filter/filter-slice";
import { REMOVE_KEYWORD } from "@/redux/keywords/keywords-slice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "src/hooks/redux-hooks";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import CardProduct from "../cards/card-product";

interface SliderType {
  link: string;
  data: any;
}

export const SliderHomeProducts = ({ link, data }: SliderType) => {
  const dispatch = useAppDispatch();

  const navigate = useRouter();

  const navigateHandler = () => {
    dispatch(REMOVE_ALL());
    dispatch(REMOVE_KEYWORD());
    navigate.push(`/car-order/${link}/products`);
  };

  return (
    <div className="md:max-w-[1280px] mx-auto px-4">
      <div className="mt-24">
        <h2 className=" gradient-text font-bold text-center text-2xl mb-8 w-fit mx-auto">
          خرید خودرو جیب پرپول نمی خواد،با کمترین پیش پرداخت قسطی بخر!
        </h2>

        <Swiper
          loop={false}
          spaceBetween={5}
          navigation={true}
          className="p-10 home-page_slider"
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {data?.length >= 1 &&
            data?.slice(0, 6).map((product: any) => {
              return (
                <SwiperSlide className="p-2">
                  <CardProduct
                    key={product.ad_code}
                    image={product.image_guids}
                    data={product}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <button
        onClick={navigateHandler}
        className="w-fit flex mx-auto ont-medium mt-4 text-blue-primary bg-gray-150 px-8 py-2 rounded-xl border-b border-b-blue-primary"
      >
        مشاهده بیشتر
      </button>
    </div>
  );
};
