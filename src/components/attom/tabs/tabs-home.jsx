import buyCarHomePage from "@/assets/images/buyCarHomePage.png";
import homePage1 from "@/assets/images/HomePage/homePage1.png";
import homePage2 from "@/assets/images/HomePage/homePage2.png";
import homePage3 from "@/assets/images/HomePage/homePage3.png";
import homePage4 from "@/assets/images/HomePage/homePage4.png";
import homePage5 from "@/assets/images/HomePage/homePage5.png";
import homePage6 from "@/assets/images/HomePage/homePage6.png";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "next/link";

const TabHome = () => {
  let windowSize;

  useEffect(() => {
    if (typeof window !== "undefined") {
      windowSize = useRef(window.innerWidth);
    }
  }, []);
  const [tabClick, setTabClick] = useState(-1);
  const [tabClickTwo, setTabClickTwo] = useState(-1);
  const ref = useRef(null);

  let tabs = [
    {
      title: "خرید خودرو",
      img: homePage1,
    },
    {
      title: "فروش خودرو",
      img: homePage2,
    },
    {
      title: "  کارشناسی خودرو",
      img: homePage6,
    },
    {
      title: "قیمت‌گذاری خودرو",
      img: homePage3,
    },
    // {
    //   title: "  خرید اقساطی",
    //   img: homePage5,

    // },
    // {
    //   title: "  تاخت خودرو",
    //   img: homePage4,
    //   link:' '
    // },
  ];

  let tabDetail = [
    {
      title: "خرید خودرو",
      img: buyCarHomePage,
      details: [
        " دسترسی به آگهی‌های متنوع خودروهای صفر و کارکرده",
        "مشاوره اختصاصی خرید با کارشناسان مجرب",
        "انجام معاملات سفارشی و عقد قرارداد در محل",
      ],
      link: "/car-order/new",
    },
    {
      title: "فروش خودرو",
      img: buyCarHomePage,
      details: [
        "فروش خودرو در بستری امن و مطمئن",
        "همراهی با فروشنده تا زمان عقد قرارداد",
        "کارشناسی رایگان خودرو",
      ],
      link: "/car-sale",
    },
    {
      title: "کارشناسی خودرو",
      img: buyCarHomePage,
      details: [
        "ارزیابی تخصصی خودرو در کوتاه‌ترین زمان و صرفه‌جویی در زمان و هزینه ",
        "ارزش‌گذاری دقیق و شفاف خودرو",
        "ارائه گزارش نتیجه کارشناسی به صورت آنلاین و نسخه چاپی",
      ],
      link: "/vehicle-check",
    },
    {
      title: "قیمت‌گذاری خودرو",
      img: buyCarHomePage,
      details: [
        "تعیین ارزش روز خودرو ",
        "تخمین قیمت خودرو به صورت آنلاین و رایگان",
        "ارزش‌گذاری رایگان خودرو در کوتاه‌ترین زمان",
      ],
      link: "/pricing",
    },
    // {
    //   title: "خرید اقساطی",
    //   img: buyCarHomePage,
    //   details: [
    //     "اعطای تسهیلات خرید خودرو در کمترین زمان",
    //     "اقساط با سود پایین و عدم نیاز به ضامن تا سقف 300 میلیون تومان"
    //   ],
    //   link: ''
    // },
    // {
    //   title: "تاخت خودرو",
    //   img: buyCarHomePage,
    //   details: [
    //     "این سرویس به زودی فعال خواهد شد"
    //   ],
    //   link: ''
    // },
  ];

  const handleClick = (position) => {
    setTabClick(tabClick == position ? -1 : position);
    setTabClickTwo(-1);
    if (windowSize.current <= 768) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClickSecondTab = (position) => {
    setTabClick(-1);
    setTabClickTwo(tabClickTwo == position ? -1 : position);
  };

  return (
    <div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4 my-10">
        {tabs.slice(0, 4).map((item, index) => {
          return (
            <>
              <div
                className={`rounded-2xl cursor-pointer justify-between flex lg:flex-row md:flex-col lg:items-center md:items-start items-center p-4 bg-blue-100 relative ${
                  tabClick == index &&
                  "active-home-tab-border border border-blue bg-blue-active"
                }`}
                onClick={() => handleClick(index)}
              >
                {tabClick == index && (
                  <div className="active-home-tab md:block hidden"></div>
                )}

                <div className="flex flex-col items-center justify-center gap-3 w-full">
                  <img src={item.img} className="w-20" />
                  <span className="text-blue font-bold text-lg text-center">
                    {item.title}
                  </span>
                </div>
                {/* <span className="text-blue mr-auto block text-sm">
                  مشاهده بیشتر
                </span> */}
              </div>

              {index == 3 &&
                tabDetail.map((item, index) => {
                  return tabClick == index ? (
                    <div
                      ref={ref}
                      className="grid border-b border-t md:col-span-4 col-span-1 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:h-72 h-auto bg-blue-100 p-10 "
                    >
                      {item.img !== "" && (
                        <img className="p-3" src={item.img} />
                      )}
                      <div className="flex flex-col gap-6">
                        <span className="text-blue font-bold text-2xl">
                          {item.title}{" "}
                        </span>
                        <ul className="flex flex-col gap-4">
                          {item?.details.length > 0 &&
                            item?.details?.map((item) => {
                              return (
                                <li className="list-disc" key={item}>
                                  {item}
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      {item.title !== "" && (
                        <Link
                          href={item.link}
                          className="text-center flex items-center justify-center bg-blue text-white rounded-md h-10 w-52 mt-auto mb-10"
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  ) : (
                    ""
                  );
                })}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default TabHome;
