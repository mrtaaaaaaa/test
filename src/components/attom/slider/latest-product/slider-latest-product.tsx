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
import CardProduct from "../../cards/card-product";
import { SliderType } from "./type";
import Alert from "@/attom/alerts/alert";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Navigation } from "swiper/modules";

export const SliderLatestProduct = ({ link, data }: SliderType) => {

  const dispatch = useAppDispatch();
  const navigate = useRouter();

  const navigateHandler = () => {
    dispatch(REMOVE_ALL(""));
    dispatch(REMOVE_KEYWORD());
    navigate.push(`/car-order/${link}/products`);
  };

  return (
    <div className="grid grid-cols-4 gap-4 my-8">
      <div
        className="bg-white rounded py-8 px-4 flex flex-col justify-between items-center"
        style={{
          boxShadow:
            "0px 1px 12px 0px rgba(0, 0, 0, 0.12), 0px 0px 1px 0px rgba(13, 68, 250, 0.16) inset",
        }}
      >
        <h3 className="text-gray-800  text-xl text-center mb-4 ">
          جدیدترین آگهی های
          <br />
          <b>خودروهای {link.includes("used") ? "کار کرده" : "صفر"}</b>
        </h3>
        <p className="text-justify">
          جدیدترین آگهی های مربوط به خودرو های{" "}
          {link.includes("used") ? "کار کرده" : "صفر"} را در اینجا ببینید.
          خودروهای کارشناسی شده با نشان کارشناسی شده مشخص شده اند.
        </p>
        <button
          className="bg-[#E3ECFF] text-[#0D45FF] w-5/6 h-[48px] mx-auto rounded-md font-bold flex justify-center items-center"
          onClick={navigateHandler}
        >
          همه آگهی ها
          <MdKeyboardArrowLeft fontSize={"24px"} />
        </button>
      </div>
      <div className="col-span-3">
        {!Array.isArray(data) || !data.length ? (
          <Alert title="محصولی موجود نیست" type="error" classes="my-10" />
        ) : (
          <div>
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
                1280: {
                  slidesPerView: 3,
                },
              }}
            >
              {data?.length >= 1 &&
                data?.slice(0, 6).map((product: any) => {
                  return (
                    <SwiperSlide>
                      <CardProduct
                        key={product.ad_code}
                        image={product.front_firstImage_base64File}
                        data={product}
                      />
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};
