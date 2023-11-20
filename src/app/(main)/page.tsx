import GetStaticDatasNotSSRAPI from "@/apis/static-datas/get-static-datas-not-ssr.api";
import Home from "@/page/home@";

const HomePage = async () => {
  let postedData = {
    page_number: 1,
    page_size: 200,
  };

  const brandData = await GetStaticDatasNotSSRAPI({
    endPoint: "/BrandModelType/Get/All",
    data: postedData,
    method: "post",
  });

  return <Home brandModelTypes={brandData?.brandModelTypes ?? []} />;
};

export default HomePage;
