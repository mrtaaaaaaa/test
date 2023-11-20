"use client"


import Banner from "./components/banner";
import RegisterExhibitors from "./components/register/registerExhibitors";
import Steps from "./components/steps";


const ExhibitorLandingPage = () => {
  return (
    <>
      <Banner />
      {/* <LatestAds /> */}
      <Steps />
      <RegisterExhibitors />
      {/* <ExhibitorsList /> */}
    </>
  );
};

export default ExhibitorLandingPage;
