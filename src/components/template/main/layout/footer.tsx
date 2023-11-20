import { icons } from "@/data";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";
const Footer = () => {
  const services = [
    {
      title: "خرید خودروی صفر",
      path: "/car-order/new",
    },
    {
      title: "خرید خودروی کارکرده",
      path: "/car-order/used",
    },
    {
      title: "فروش خودرو",
      path: "/car-sale",
    },
    {
      title: "خرید اقساطی",
      path: "/car-installment",
    },
    {
      title: "قیمت‌گذاری خودرو",
      path: "/pricing",
    },
    {
      title: "کارشناسی خودرو",
      path: "/vehicle-check",
    },
    // {
    //   title: "تاخت خودرو",
    //   path: "/",
    // },
  ];

  const withUs = [
    {
      title: "درباره ما",
      path: "/about-us",
    },
    {
      title: "تماس با ما",
      path: "/about-us",
    },
  ];

  const handleBackToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer
      style={{ boxShadow: "rgb(37 109 133 / 15%) 1px -2px 4px 0px" }}
      className="md:p-8 py-4 mt-5 max-w-[1920px] mx-auto bg-dark-d_1 text-white "
    >
      <div className="max-w-[1360px] p-4 mx-auto">
        <div className="lg:mb-0 mb-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          <div>
            <div
              className="bg-[#A8A8A8] text-white flex justify-center items-center rounded-full h-12 p-4 w-12 absolute cursor-pointer md:-mt-[4.5rem] -mt-24"
              onClick={handleBackToTop}
            >
              <ArrowUpwardIcon />
            </div>
            <img src={icons.white_logo.src} alt="logo" />
            <p className="mt-8 leading-relaxed text-justify w-[18.5rem] md:text-[15px] text-sm">
              پلتفرم جامع معاملات خودرویی در بستر آنلاین، همراه با مشاوره تخصصی
              در زمینه خرید، فروش و ارزیابی خودرو توسط کارشناسان خبره
            </p>
          </div>

          <div className="grid grid-cols-2 lg:gap-0 gap-4">
            <div className="flex flex-col gap-4">
              <h4 className="md:text-lg text-sm pb-1 border-b font-bold border-b-gray-150 w-fit ">
                خدمات ما
              </h4>
              {services.map(({ title, path }) => (
                <Link
                  href={path}
                  className="block font-light md:text-base text-sm"
                >
                  {title}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="md:text-lg text-sm pb-1 font-bold border-b border-b-gray-150 w-fit">
                با اُتو
              </h4>
              {withUs.map(({ title, path }) => (
                <Link
                  className="block font-light md:text-base text-sm"
                  href={path}
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 md:col-span-2 md:text-base text-sm">
            <p className="leading-loose">
              آدرس: تهران، خیابان شهید بهشتی، خیابان میرزای شیرازی، نبش کوچه
              آزادگان، پلاک 219، طبقه 3، واحد ۴
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="leading-loose whitespace-nowrap">
                شماره تماس:
              </span>
              <span className="flex ltr">
                <span>021 - </span>88108261
              </span>
              و
              <span className="flex ltr">
                <span>021 - </span>88108260
              </span>
            </div>

            <div className="py-4 px-5 bg-dark-d_2 max-w-max rounded-xl mt-6">
              <span className="block text-lg ">
                ما را در شبکه‌های اجتماعی دنبال کنید
              </span>

              <div className="mt-4 flex gap-4">
                <Link
                  className="bg-gray-socialBg p-1 rounded-lg"
                  href={`https://www.instagram.com/oto.ir.insta`}
                >
                  <InstagramIcon sx={{ color: "#fff" }} />
                </Link>
                <Link
                  className="bg-gray-socialBg p-1 rounded-lg"
                  href={`https://www.linkedin.com/company/metakhodro`}
                >
                  <LinkedInIcon sx={{ color: "#fff" }} />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 md:col-span-2 col-span-1 md:flex flex-row grid grid-cols-1 gap-2 items-center">
            <span className="block sm:whitespace-nowrap  md:text-sm text-xs md:order-first order-last md:text-right text-center md:mt-0 mt-4">
              کلیه حقوق این سایت متعلق به شرکت مروارید تِک آمانج است.
              {/* <br />
              <p>V 1.0.1</p> */}
            </span>
            <div className="flex gap-2 w-full items-center">
              <span className="w-full h-[1px] bg-gray-150"></span>

              <Link href="https://trustseal.enamad.ir/?id=353814&amp;Code=lYJITr4gLKdwYTMVR71q">
                <img
                  referrerPolicy="origin"
                  src="https://Trustseal.eNamad.ir/logo.aspx?id=353814&amp;Code=lYJITr4gLKdwYTMVR71q"
                  alt=""
                  id="lYJITr4gLKdwYTMVR71q"
                  className="w-16 h-16"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
