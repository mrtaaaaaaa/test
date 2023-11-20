import GetStaticDatasAPI from "@/apis/static-datas/get-static-data.api";
import GetStaticDatasNotSSRAPI from "@/apis/static-datas/get-static-datas-not-ssr.api";
import PricingSteps from "@/page/pricing/steps";
import React from "react";

const PricingStepPage = async () => {
  let postedData = {
    page_number: 1,
    page_size: 200,
  };
  const brandData = await GetStaticDatasNotSSRAPI({
    endPoint: "/BrandModelType/Get/All",
    data: postedData,
    method: "post",
  });
  return <PricingSteps brandModel={brandData?.brandModelTypes ?? []} />;
};

export default PricingStepPage;
