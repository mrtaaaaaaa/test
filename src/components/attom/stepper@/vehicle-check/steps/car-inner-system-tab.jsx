import { useSelector } from "react-redux";
import TabLayout from "./tab-layout";

const CarInnerSystemTab = () => {
  const carInnerSystem = Object.values(
    useSelector((state) => state.carInnerSystem)
  );

  return (
    <div>
      <TabLayout title="اطلاعات سیستم برقی و داخلی" options={carInnerSystem} />
    </div>
  );
};

export default CarInnerSystemTab;
