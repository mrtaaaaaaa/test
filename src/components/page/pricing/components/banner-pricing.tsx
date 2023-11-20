import { img } from "@/data";
import PricingCard from "./pricing-card";

const BannerPricing = ({ brandModel }: any) => {
  return (
    <div className="relative">
      <div
        style={{
          backgroundImage: `url(${img.pricing_banner.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
        className="pt-24"
      >
        <PricingCard brandModel={brandModel} />
      </div>
    </div>
  );
};

export default BannerPricing;
