"use client";
import { PostAdSaleSearchKeywords } from "@/apis/search";
import DropDownProfile from "@/attom/form@/components@/drop-down/drop-down-profile";
import { NavLink } from "@/attom/nav-link";
import { icons } from "@/data";
import { useAppSelector } from "@/hooks/redux-hooks";
import {
  PREVIEW_DATA,
  REMOVE_ALL,
  SET_SHOW_NULL,
  SHOW_NULL_BUTTON,
} from "@/redux/filter/filter-slice";
import { ADD_KEYWORD, keywordSelector } from "@/redux/keywords/keywords-slice";
import { checkExistWindow } from "@/utils/check-exist-window";
import { ConvertAPIImagesToBase64 } from "@/utils/get-images-base64-api";
import { isTokenExpired, parseJwt } from "@/utils/jwt";
import { InputAdornment, TextField } from "@mui/material";
import { AddSquare, Home2, Menu, Profile as ProfileIcon } from "iconsax-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const userToken =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("userToken") ?? "{}");
  const { roles } = userToken
    ? checkExistWindow() &&
      parseJwt(window.localStorage.getItem("userToken" ?? "{}"))
    : { roles: [] };

  const router = useRouter();
  const pathname = usePathname();

  const navbarTxt = [
    {
      name: "خرید خودرو صفر",
      href: "/car-order/new",
    },
    {
      name: "خرید خودرو کارکرده",
      href: "/car-order/used",
    },
    {
      name: "فروش خودرو",
      href: "/car-sale",
    },
    {
      name: "خرید اقساطی",
      href: "/car-installment",
    },
    {
      name: "قیمت‌گذاری خودرو",
      href: "/pricing",
    },
    {
      name: "کارشناسی خودرو",
      href: "/vehicle-check",
    },
    {
      name: "با اُتو",
      href: "/about-us",
    },
  ];

  const bottomNavigation = [
    {
      title: "صفحه اصلی",
      icon: <Home2 size="20" />,
      link: "/",
      onClick: () => setShowSubMenu(false),
    },
    {
      title: "سرویس‌ها",
      icon: <Menu size="20" />,
      link: pathname,
      onClick: () => setShowSubMenu(!showSubMenu),
    },

    {
      title: "ثبت آگهی",
      icon: <AddSquare size="20" />,
      link: "/car-sale",
      onClick: () => setShowSubMenu(false),
    },
    {
      title: "پروفایل",
      icon: <ProfileIcon size="20" />,
      link: `/panel/${roles?.[0]}/info`,
      onClick: () => setShowSubMenu(false),
    },
  ];

  const subMenus = [
    {
      title: "فروش خودرو",
      link: "/car-sale",
      onClick: () => setShowSubMenu(!showSubMenu),
      bgImg: icons.nav_adsale_icon.src,
    },
    {
      title: "خرید خودرو صفر",
      link: "/car-order/new",
      onClick: () => setShowSubMenu(!showSubMenu),
      bgImg: icons.nav_newcar_icon.src,
    },
    {
      title: "خرید خودرو کارکرده",
      link: "/car-order/used",
      onClick: () => setShowSubMenu(!showSubMenu),
      bgImg: icons.nav_usedcar_icon.src,
    },
    {
      title: "ارزش‌گذاری خودرو",
      link: "/pricing",
      onClick: () => setShowSubMenu(!showSubMenu),
      bgImg: icons.nav_pricing_icon.src,
    },
    {
      title: "ارزیابی خودرو",
      link: "/vehicle-check",
      onClick: () => setShowSubMenu(!showSubMenu),
      bgImg: icons.nav_vehiclecheck_icon.src,
    },
    {
      title: "خرید اقساطی",
      link: "/car-installment",
      onClick: () => setShowSubMenu(!showSubMenu),
      bgImg: icons.nav_vehiclecheck_icon.src,
    },
    {
      title: "با اُتو",
      link: "/about-us",
      onClick: () => setShowSubMenu(!showSubMenu),
      bgImg: icons.nav_vehiclecheck_icon.src,
    },
  ];

  const pathnameLink = usePathname();

  const [win, setWin] = useState<any>(null);

  useEffect(() => {
    const win = window;
    setWin(win);
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="sticky top-0 z-[100] bg-[#F3F8FF]">
        <section className="max-w-[1336px] mx-auto p-2">
          <nav className="md:h-fit h-[9rem]">
            <div className="grid grid-cols-7 gap-4 items-center justify-between">
              <span className="lg:col-span-2 md:col-span-1 col-span-3">
                <img
                  onClick={() => router.push("/")}
                  className="md:w-12 w-fit cursor-pointer lg:mx-0 mx-0"
                  src={icons.logo_blue.src}
                  alt="logo"
                />
              </span>

              <SearchInput />

              <div className="flex justify-end items-center mr-auto lg:col-span-2 md:col-span-3 col-span-4 gap-4">
                <Link
                  href="/car-sale"
                  className="whitespace-nowrap text-blue border border-blue-200 px-6 py-2 rounded-lg text-xs font-medium md:block hidden"
                >
                  ثبت آگهی
                </Link>

                {!isTokenExpired(win?.localStorage.getItem("userToken")) ? (
                  <DropDownProfile />
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="h-[25px] bg-blue-300 md:block hidden w-[1px]"></span>
                    <Link
                      href={"/auth/check"}
                      className="whitespace-nowrap text-blue border border-blue-100 bg-blue-100 px-6 py-2 rounded-lg text-xs font-medium "
                    >
                      ورود | ثبت‌نام
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </section>

        <div className="xl:container mb-2 px-4 md:mx-auto tablet:flex hidden justify-center lg:gap-12 gap-8 items-start mt-2">
          {navbarTxt.map(({ name, href }) => {
            return (
              <NavLink href={href} key={name}>
                {name}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div
        className="tablet:hidden flex bg-white fixed bottom-0 md:pt-2 sm:pt-3 pt-2 md:px-6 sm:px-3 px-4 w-full z-[100] justify-between  rounded-tr-3xl rounded-tl-3xl"
        style={{ boxShadow: "0px -1px 4px rgba(0, 0, 0, 0.04)" }}
      >
        {bottomNavigation.map(({ title, icon, link, onClick }) => {
          let isActive = pathnameLink === link;
          return (
            <Link
              href={link}
              className={`${
                isActive && title !== "سرویس‌ها"
                  ? "text-blue font-medium border-b-2 border-b-blue"
                  : "text-gray"
              } flex flex-col items-center gap-1 pb-1 justify-center`}
            >
              <span
                onClick={onClick}
                className="text-xs flex flex-col items-center justify-center"
              >
                <span className="block mx-auto w-fit">{icon}</span>
                {title}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Services */}
      {showSubMenu && (
        <div className="fixed bg-white w-full h-full z-30 pt-16 bottom-[-6rem]">
          <div className="grid grid-cols-2 gap-4 px-4">
            {subMenus.map(({ link, title, onClick, bgImg }) => (
              <Link
                href={link}
                className="rounded-lg text-white py-10 px-2 text-center font-bold text-md"
                style={{
                  background: `url(${bgImg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <span onClick={onClick}>{title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// Components
const SearchInput = () => {
  // لیست کلیدواژه‌ها
  const { keywords } = useAppSelector(keywordSelector);

  const router = useRouter();

  const dispatch = useDispatch();

  // تایمر
  let timer: any;
  const delay = 300;

  function handleInput(e: any) {
    let value = e.target.value;
    dispatch(ADD_KEYWORD(value));
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchHandler(value);
    }, delay);
  }


  const searchHandler = async (value: any) => {
    
    if (value !== "" && value.length >= 3) {

      const tempSearch = await PostAdSaleSearchKeywords(value);
      await ConvertAPIImagesToBase64(tempSearch);

      dispatch(PREVIEW_DATA(tempSearch));
      dispatch(SET_SHOW_NULL(false));
      dispatch(SHOW_NULL_BUTTON(true));

      if (tempSearch == null) {
        dispatch(SET_SHOW_NULL(true));
      }

      router.push("/car-order/list/products");

    } else {
      dispatch(REMOVE_ALL(""));
    }
  };

  return (
    <div className="md:col-span-3 col-span-7 text-sm md:order-none order-last">
      <TextField
        value={keywords}
        inputProps={{
          style: {
            height: "10px",
          },
        }}
        sx={{
          "& .MuiInputLabel-root": { color: "green" },
          border: "1px solid #E9E8E7",
          width: { md: "90%", xs: "100%" },
          borderRadius: "8px",
          fontSize: "12px",
          padding: "10px 16px",
          "& .MuiInputBase-input": { fontSize: "14px" },
          background: "#fff",
        }}
        variant="standard"
        placeholder="جست‌وجو در آگهی‌ها..."
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <LuSearch size="20" color="#363E4D" />
            </InputAdornment>
          ),
        }}
        onChange={handleInput}
      />

      {/* {searchedResult?.ads?.length > 0 && (
      <SearchedValues data={searchedResult} />
    )} */}
    </div>
  );
};
