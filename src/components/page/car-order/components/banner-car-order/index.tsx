import { BannerCarOrderType } from "./type";

const BannerCarOrder = ({ slogan, img, className }: BannerCarOrderType) => {
  return (
    <div
      className={`gap-8 flex md:flex-row flex-col xl:mt-10 mt-5 justify-center rounded-xl md:py-28 py-10 md:px-2 px-4 text-center ${className}`}
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
      }}
    >
      <h1
        style={{ textShadow: "-2px -1px 0 #1242E0 w-full" }}
        className={`lg:text-4xl md:text-2xl sm:text-xl text-lg text-center font-bold text-white`}
      >
        {slogan}
      </h1>
    </div>
  );
};

export default BannerCarOrder;
