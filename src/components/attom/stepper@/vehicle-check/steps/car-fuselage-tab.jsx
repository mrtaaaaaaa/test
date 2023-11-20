import { useSelector } from "react-redux";
import TabLayout from "./tab-layout";

const CarFaselagecategoryTab = () => {
  const carFuselage = Object.values(useSelector((state) => state.carFuselage));

  return <TabLayout title=" اطلاعات بدنه و لاستیک" options={carFuselage} />;
};

export default CarFaselagecategoryTab;
