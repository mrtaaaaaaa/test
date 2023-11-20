import CarCategory from "./components/car-category";
import PopularCarSlider from "./components/slider";

export default function PopularCars({ popularAds }: any) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <CarCategory />
      <div className="col-span-3">
        <PopularCarSlider data={popularAds} />
      </div>
    </div>
  );
}
