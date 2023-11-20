import { BsShareFill } from "react-icons/bs";
import { RWebShare } from "react-web-share";

type AdTitlePropsType = {
  name: string;
  year: string | number;
};

export const AdTitle = ({ name, year }: AdTitlePropsType) => {
  return (
    <div className="flex items-center ">
      <span className="text-blue  font-bold md:text-xl">{name}</span>
      <span className="text-blue font-bold md:text-xl">{year}</span>
    </div>
  );
};

export const ShareAd = () => {
  return (
    <div>
      <RWebShare
        data={{
          text: "برای خرید و فروش آسان و مطمئن خودرو کنار شما هستیم.",
          url: typeof window !== "undefined" ? window.location.href:'',
          title: "اُتو",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button className="text-black items-center gap-2 text-sm flex mr-auto border lg:border-0 border-gray-900 rounded-full px-4 py-2">
          <BsShareFill />
          اشتراک گذاری
        </button>
      </RWebShare>
    </div>
  );
};

export const AdOptions = ({
  gear_box_type,
  mileage,
  city,
}: {
  gear_box_type: string | number;
  mileage: string | number;
  city: string;
}) => {
  return (
    <div className="mt-2 text-[#8C8C8C]">
      <span className=" border-l-2 pl-2">{gear_box_type}</span>
      <span className=" border-l-2 px-2">{mileage} کیلومتر</span>
      <span className="pr-2">{city}</span>
    </div>
  );
};
