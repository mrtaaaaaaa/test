"use client";

import { useEffect } from "react";
import { REMOVE_CAR_INFO } from "@/redux/pricing/pricing-slice";
import { useAppDispatch } from "src/hooks/redux-hooks";
import BannerPricing from "./components/banner-pricing";
import BannerWhyPricing from "./components/banner-why-pricing";
import BannerEffectiveReason from "./components/banner-effective-reason";

const Pricing = ({ brandModel }: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(REMOVE_CAR_INFO());
  }, []);

  return (
    <>
      {/* @@@___________________ Pricing Banner ___________________@@@ */}
      <BannerPricing brandModel={brandModel} />

      {/* @@@___________________ Why pricing with OtoKhodro ___________________@@@ */}
      <BannerWhyPricing />

      {/* @@@___________________ Effective reason banner ___________________@@@ */}
      <BannerEffectiveReason />
    </>
  );
};

export default Pricing;
