"use client";
import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
// import Logo from "@/Assets/images/Logo.svg";
import { FRONT2DB, FRONT2MESSAGE } from "@/config/url";
import { Suspense } from "react";
import { Puff } from "react-loading-icons";
// import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import { Wrapper } from "Layout/components/wrapper";
// import httpService from "Services/httpService";
import { useDispatch } from "react-redux";
import {
  PREVIEW_DATA,
  SET_SHOW_NULL,
  SHOW_NULL_BUTTON,
} from "@/redux/filter/filter-slice";
import { ADD_KEYWORD } from "@/redux/keywords/keywords-slice";
import { AdOptions, AdTitle, ShareAd } from "./components@/details";
import ProductDetailsItem from "./components@/product-details-item";
import SellerDetails from "./components@/seller-details";
import LikeIconInCards from "@/attom/cards/components/like-icon-in-cards";
import { useRouter, useSearchParams } from "next/navigation";
import { icons, img } from "@/data";
import httpService from "@/services/http-service";
import { useRequest } from "@/hooks/useRequest";
import { B64toBlob } from "@/utils/b64-to-blob";
import AdminConfirm from "./components@/delete-reason";
import { checkExistWindow } from "@/utils/check-exist-window";
import { logo_blue } from "src/data/icon";
import { convertToPersianFont } from "@/utils/convert-number-font-persian";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const ImageComponent = React.lazy(() =>
  import("@/attom/image/image-component")
);

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#2255fc",
        borderRadius: "50%",
        marginRight: "30px",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#2255fc",
        borderRadius: "50%",
        marginLeft: "30px",
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

const ProductDetails = ({ params, blobImages, base64Images, productData }) => {
  // const [imageData, setImageData] = useState("");
  const [isLiked, setIsliked] = useState(false);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const router = useRouter();

  const [noAd, setNoAd] = useState(false);

  const [like, setLike] = useState({
    count: productData.like,
    status: false,
  });
  const [images, setImages] = useState();

  const [dislike, setDisLike] = useState({
    count: productData.un_like,
    status: false,
  });

  if (noAd) {
    return <div>وجود ندارد</div>;
  }

  // Click handler for keyWords
  const keywordHandler = (value) => {
    httpService
      .get(`${FRONT2DB}/AdSale/Search/Keywords/${value}`)
      .then((res) => {
        dispatch(ADD_KEYWORD(value));
        dispatch(PREVIEW_DATA(res.ads));
        dispatch(SET_SHOW_NULL(false));
        dispatch(SHOW_NULL_BUTTON(true));

        // navigate("/car-order/list/products");
        router.push("/car-order/list/products");
        if (res.ads == null) {
          dispatch(SET_SHOW_NULL(true));
        }
      })
      .catch((err) => console.log(err));
  };

  // const blob = new Blob([blobImages], { type: "application/octet-stream" });

  const productsAds = params?.products_ads || null;

  // useEffect(() => {
  //   setImageData([
  //     ...imageData,
  //     ...(checkExistWindow() ? [window.URL.createObjectURL(blob)] : []),
  //   ]);
  // }, []);

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={`data:image/png;base64,${base64Images[i]}`} width={100} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    // <Wrapper>
    <>
      <div className="product-details lg:grid xl:grid-cols-2 lg:grid-cols-2 flex flex-col-reverse lg:gap-10 md:gap-10 gap-0">
        <div className="flex flex-col gap-4">
          <div className="car-details">
            <div className="flex lg:flex-row flex-col-reverse justify-between">
              <AdTitle
                name={productData.name}
                year={productData.year_of_manufacture}
              />
              <ShareAd />
            </div>
            <AdOptions
              gear_box_type={productData.gear_box_type}
              mileage={productData.mileage}
              city={productData.city}
            />
            <SellerDetails productData={productData} productId={productsAds} />
            <div className="mt-7 flex items-center whitespace-nowrap gap-2">
              <span className="text-blue font-bold text-2xl">مشخصات خودرو</span>
              <div className="border-b w-full"></div>
            </div>
            <ProductDetailsItem state={productData} />

            {productData.description !== "" && (
              <div className="bg-white lg:hidden block p-5 h-fit  border border-gray-250 rounded-md mt-6">
                <h3 className="font-bold text-lg mb-4">توضیحات</h3>
                <p className="w-full overflow-hidden">
                  {productData.description}
                </p>
              </div>
            )}

            <div className="lg:hidden flex flex-wrap gap-2 my-4">
              {productData.keywords?.length
                ? productData.keywords.map(
                    (item) =>
                      item !== "" && (
                        <button
                          onClick={() => keywordHandler(item)}
                          className="bg-[#518A9D] px-3 py-1 rounded-md text-[#CCE4FF] text-sm font-light h-fit whitespace-nowrap"
                        >
                          {item}
                        </button>
                      )
                  )
                : "-"}
            </div>
          </div>

          <AdminConfirm
            productId={productsAds}
            name={productData.name}
            advertiser_id={productData.advertiser_id}
            is_published={productData.is_published}
          />
        </div>
        <div className="product-details__image w-full xl:col-span-1 ">
          <div className="relative">
            {base64Images?.length == 0 ? (
              <>
                <div className="w-full lg:h-[38rem] h-[10rem] object-cover rounded flex flex-col items-center justify-center bg-white">
                  <img src={logo_blue.src} alt="logo" />
                </div>
                <div
                  className="text-white w-36 p-3 text-center absolute z-10 top-0 rounded-tr-lg"
                  style={{ background: " rgba(71, 76, 85, 0.8)" }}
                >
                  کد آگهی : {productData.ad_code}
                </div>
                <div className="flex items-center gap-2">
                  <LikeIconInCards
                    advertiser_id={productData.advertiser_id}
                    productDetail={productData}
                    index={productData.advertiser_id}
                  />
                </div>
              </>
            ) : base64Images?.length <= 1 ? (
              <>
                <div className="md:h-[38rem]">
                  <Suspense
                    fallback={
                      <div className="flex items-center ">
                        <Puff
                          stroke="#1242E0"
                          strokeOpacity={0.125}
                          speed={0.75}
                        />
                      </div>
                    }
                  >
                    <ImageComponent
                      className="rounded-md mb-4 w-full md:h-full object-cover object-bottom"
                      // src={blobImages[0]}
                      src={`data:image/png;base64,${base64Images[0]}`}
                      alt="product"
                    />
                  </Suspense>
                </div>
                <div
                  className="text-white w-36 p-3 text-center absolute z-10 top-0 rounded-tr-lg"
                  style={{ background: " rgba(71, 76, 85, 0.8)" }}
                >
                  کد آگهی : {productData.ad_code}
                </div>
                <div className="flex items-center gap-2 ">
                  <LikeIconInCards
                    advertiser_id={productData.advertiser_id}
                    productDetail={productData}
                    index={productData.advertiser_id}
                  />
                </div>
              </>
            ) : (
              <>
                <div
                  className="text-white w-36 p-3 text-center absolute z-10 top-0 rounded-tr-lg"
                  style={{ background: " rgba(71, 76, 85, 0.8)" }}
                >
                  کد آگهی : {productData.ad_code}
                </div>

                {/* <Swiper
                  style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                  loop={false}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  // modules={[FreeMode, Navigation, Thumbs]}
                  className="rounded-md mb-4 w-full md:h-[38rem] h-96"
                >
                  {base64Images?.map((sliderItem, index) => (
                    <SwiperSlide key={index}>
                      <Suspense
                        fallback={
                          <div className="flex items-center justify-center">
                            <Puff
                              stroke="#1242E0"
                              strokeOpacity={0.125}
                              speed={0.75}
                            />
                          </div>
                        }
                      >
                        <ImageComponent
                          className="w-full h-full object-cover"
                          // src={sliderItem}
                          // src={`data:image/png;base64,${sliderItem}`}
                          alt="product"
                        />
                      </Suspense>
                      <span className="bg-white absolute bottom-4 rounded-full left-0 right-0 mx-auto w-fit px-3 bg-opacity-80">
                        {imageData.length} / {index + 1}
                      </span>
                    </SwiperSlide>
                  ))}
                </Swiper> */}

                <Slider {...settings}>
                  {base64Images?.map((sliderItem, index) => (
                    <div key={index}>
                      <img
                        src={`data:image/png;base64,${sliderItem}`}
                        style={{ width: "100%", objectFit: "scale-down" }}
                      />
                    </div>
                  ))}
                </Slider>

                <div className="flex items-center gap-2 ">
                  <LikeIconInCards
                    advertiser_id={productData.advertiser_id}
                    productDetail={productData}
                    index={productData.advertiser_id}
                  />
                </div>
                <div className="md:block hidden">
                  {/* <Swiper
                    breakpoints={{
                      // when window width is >= 340px
                      340: {
                        width: 640,
                        slidesPerView: 5,
                      },
                      // when window width is >= 768px
                      992: {
                        width: 768,
                        slidesPerView: 6,
                      },
                    }}
                    onSwiper={setThumbsSwiper}
                    loop={false}
                    spaceBetween={10}
                    // slidesPerView={6}
                    freeMode={true}
                    watchSlidesProgress={true}
                    // modules={[FreeMode, Navigation, Thumbs]}
                  >
                    {base64Images?.map((sliderItem, index) => (
                      <SwiperSlide
                        key={index}
                        className="cursor-pointer"
                      >
                        <Suspense
                          fallback={
                            <div className="flex items-center justify-center">
                              <Puff
                                stroke="#1242E0"
                                strokeOpacity={0.125}
                                speed={0.75}
                              />
                            </div>
                          }
                          ƒ
                        >
                          <ImageComponent
                            className="rounded-md md:h-36 h-20 object-cover w-full"
                            // src={sliderItem}
                            // src={`data:image/png;base64,${sliderItem}`}
                            alt="product"
                          />
                        </Suspense>
                      </SwiperSlide>
                    ))}
                  </Swiper> */}
                </div>
              </>
            )}
          </div>
          {productData.description !== "" && (
            <div className="bg-white lg:block hidden p-5 h-fit  border border-gray-250 rounded-md mt-6">
              <h3 className="font-bold text-lg mb-4">توضیحات</h3>
              <p className="w-full overflow-hidden">
                {productData.description}
              </p>
            </div>
          )}

          <div className="lg:flex hidden flex-wrap gap-2 my-4">
            {productData.keywords?.length
              ? productData.keywords.map(
                  (item) =>
                    item !== "" && (
                      <button
                        onClick={() => keywordHandler(item)}
                        className="bg-blue px-3 py-1 rounded-md text-[#CCE4FF] text-sm font-light h-fit whitespace-nowrap"
                      >
                        {item}
                      </button>
                    )
                )
              : "-"}
          </div>
        </div>
      </div>
      {/* // </Wrapper> */}
    </>
  );
};

export default ProductDetails;
