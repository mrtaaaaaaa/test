import { useSelector } from "react-redux";
import TabLayout from "./tab-layout";

const CarSuspensionsTab = () => {
  const carSuspensionsSystem = Object.values(
    useSelector((state) => state.carSuspensionsSystem)
  );

  return (
    <div>
      <TabLayout title="اطلاعات سیستم تعلیق" options={carSuspensionsSystem} />
    </div>
  );
};

export default CarSuspensionsTab;
