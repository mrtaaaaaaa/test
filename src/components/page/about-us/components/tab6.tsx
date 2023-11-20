import { Call, Location } from "iconsax-react";

const Tab6 = () => {
  return (
    <>
      <div className="lg:w-11/12 mx-auto">
        <div className="flex lg:flex-row flex-col lg:gap-10 gap-5 border-b border-blue pb-5 items-center mb-10">
          <Location className="text-blue " size="32" />
          <p>
            <span className="font-bold leading-10">آدرس: </span>
            تهران، خیابان میرزای شیرازی، نبش کوچه آزادگان، پلاک 219 (ساختمان
            زیتون)، طبقه 3، واحد 4
          </p>
        </div>
        <div className="flex lg:flex-row flex-col lg:gap-10 gap-5 pb-5 items-center">
          <Call className="text-blue " size="32" />
          <p>
            <span className="font-bold leading-10"> شماره تماس: </span>
            02188108261- 02188108260
          </p>
        </div>
      </div>
    </>
  );
};

export default Tab6;
