import { SliderLatestProduct } from "@/attom/slider/latest-product/slider-latest-product";
import CarOrderFAQ from "../components/faq";
import NormalVipPurchase from "../components/normal-vip-purchase";
import AffordablePrice from "./components/affordable-price";
import PopularCars from "./components/popular-cars";
import VehicleCheckPack from "./components/vehicle-check";

export default function NewCarOrders({ popularAds, brandModel, newData }: any) {
  return (
    <div className="flex flex-col gap-10 mt-8">
      <NormalVipPurchase brandModel={brandModel} />
      <SliderLatestProduct link="/new" data={newData} />
      <PopularCars popularAds={popularAds} />
      <AffordablePrice />
      <VehicleCheckPack />
      <CarOrderFAQ />
    </div>
  );
}
