import { useSelector } from "react-redux";
import TabLayout from "./tab-layout";

const CarEngineTab = () => {
  const engine = Object.values(useSelector((state) => state.carEngine));
  return <TabLayout title="اطلاعات موتور" options={engine} />;
};

export default CarEngineTab;
