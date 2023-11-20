import { img } from "@/data";
import { NumberSeprator } from "@/utils/number-seprator";
import { useSelector } from "react-redux";

const ChartPrice = () => {
  const { estimate, lower_estimate, upper_estimate } = useSelector(
    (state) => state.pricing
  );

  return (
    <div className="flex flex-col justify-center items-center lg:col-span-2 gap-4">
      <div className="flex items-center border py-2 px-6 border-orange rounded-lg text-orange bg-orange-100 relative">
        <span className="font-bold">{NumberSeprator(estimate)}</span>
        <span className="text-xs block mr-1 font-light ">تومان</span>
        <div className="arrow-down" />
      </div>
      <div className="flex md:flex-row flex-col gap-4 items-center relative">
        <div>
          <div className="flex items-center border py-2 px-6 border-red-500 rounded-lg text-red-500 bg-red-100 box-arrow-down relative">
            <span className="font-bold">{NumberSeprator(upper_estimate)}</span>
            <span className="text-xs block mr-1 font-light ">تومان</span>
            <div className="arrow-left" />
          </div>
          <span className="text-xs text-red-500 font-bold">حداکثر قیمت</span>
        </div>

        <img src={img.chart_pricing.src} alt="chart" />
        {/* <img src={ChartArrow} alt="ChartArrow" className="absolute left-0 right-0 m-auto" /> */}

        <div>
          <div className="flex items-center border py-2 px-6 border-green rounded-lg text-green bg-green-100 box-arrow-down relative">
            <span className="font-bold">{NumberSeprator(lower_estimate)}</span>
            <span className="text-xs block mr-1 font-light ">تومان</span>
            <div className="arrow-right" />
          </div>
          <span className="text-xs text-green font-bold text-left block mt-1">
            حداقل قیمت
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChartPrice;
