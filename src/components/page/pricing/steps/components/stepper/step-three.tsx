import CardSelectedCarInfo from "./card-selected-car-info";
import ChartPrice from "./chart-price";

const StepThree = () => {
  return (
    <div className="border-blue border-4 rounded-lg grid lg:grid-cols-3 grid-cols-1 xl:w-10/12 mx-auto gap-6">
      <CardSelectedCarInfo />
      <ChartPrice />
    </div>
  );
};

export default StepThree;
