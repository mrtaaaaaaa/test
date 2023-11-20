import { icons, img } from "@/data";
import Link from "next/link";

const ExhibitorSection = () => {
  return (
    <div className="flex flex-col items-center mt-24 md:p-16 p-4">
      <img
        src={img.exhibitor_home_bg_banner.src}
        alt="background"
        className="absolute left-0 right-0 m-auto z-0"
      />
      <div className="flex md:flex-row flex-col items-center justify-center z-10 mt-12 md:gap-0 gap-4">
        <div
          className="bg-white md:p-8 md:pl-60 p-8 rounded-2xl flex md:gap-8 gap-4 items-center justify-center"
          style={{
            boxShadow: "0px 1px 8px 0px #8BA5FA",
          }}
        >
          <img src={icons.arrow_footer.src} alt="txt" className="w-10" />
          <p className="md:text-2xl font-bold text-lg text-gray leading-relaxed">
            نمایشگاه مجازیتان را
            <br />
            اینجا داشته باشید!
          </p>
        </div>
        <Link
          href="/exhibitors/register"
          className="bg-blue rounded-xl text-white border-4 border-blue-100 px-8 py-3 font-bold md:-mr-20 m-auto md:text-2xl"
        >
          ثبت‌نام نمایشگاه
        </Link>
      </div>

      <div className="rounded-lg max-w-[60rem] md:-mt-20">
        <img
          src={img.exhibitor_home_banner.src}
          alt="Cars"
          className="mt-4 rounded-b-xl"
        />
      </div>
    </div>
  );
};

export default ExhibitorSection;
