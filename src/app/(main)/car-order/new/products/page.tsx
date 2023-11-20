import { GetCarsListAPi } from "@/apis/cars-list";
import GetStaticDataAPI from "@/apis/static-datas/get-static-data.api";
import GetStaticDatasAPI from "@/apis/static-datas/get-static-data.api";
import GetStaticDatasNotSSRAPI from "@/apis/static-datas/get-static-datas-not-ssr.api";
import NewProductListPage from "@/page/car-order/new/products";

export default async function Product() {
  const data = await GetCarsListAPi("New");

  let pagedata = { page_number: 1, page_size: 100 };

  const brandData = await GetStaticDatasNotSSRAPI({
    endPoint: "/BrandModelType/Get/All",
    data: pagedata,
    method: "post",
  });

  const { colors } = await GetStaticDatasNotSSRAPI({
    method: "get",
    endPoint: "/Color/Get/All",
  });

  const { cities } = await GetStaticDatasNotSSRAPI({
    method: "get",
    endPoint: "/City/Get/All",
  });

  return (
    <NewProductListPage
      ads={data.ads}
      models={brandData?.brandModelTypes || []}
      colors={colors}
      cities={cities}
    />
  );
}
