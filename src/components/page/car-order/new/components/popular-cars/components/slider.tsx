"use client";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import Alert from "@/attom/alerts/alert";
import CardProduct from "@/attom/cards/card-product";
import { Navigation } from "swiper/modules";

export default function PopularCarSlider({ data }: { data: { ads: any[] } }) {
  return (
    <>
      {!Array.isArray(data?.ads) || !data?.ads?.length ? (
        <Alert title="محصولی موجود نیست" type="error" classes="my-10" />
      ) : (
        <>
          <Swiper
            loop={false}
            spaceBetween={5}
            navigation={true}
            modules={[Navigation]}
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
            }}
          >
            {data?.ads?.length >= 1 &&
              data?.ads?.slice(0, 6).map((product: any) => {
                return (
                  <SwiperSlide className="p-2">
                    <CardProduct
                      key={product.ad_code}
                      image={product.front_firstImage_base64File}
                      data={product}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </>
      )}
    </>
  );
}
