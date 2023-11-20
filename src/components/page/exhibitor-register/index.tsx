"use client"
import Banner from "./components/banner";
import ExhibitorsList from "./components/exhibitorsList";
import LatestAds from "./components/latestAds";
import RegisterExhibitors from "./components/register/registerExhibitors";
import Steps from "./components/steps";

const Exhibitors = () => {
  return (
    <>
      <Banner />
      <LatestAds />
      <Steps />
      <RegisterExhibitors />
      <ExhibitorsList />
    </>
  );
};

export default Exhibitors;
