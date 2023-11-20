import { GetCarsListAPi } from "@/apis/cars-list";
import GetStaticDataAPI from "@/apis/static-datas/get-static-data.api";
import GetStaticDatasAPI from "@/apis/static-datas/get-static-data.api";
import GetStaticDatasNotSSRAPI from "@/apis/static-datas/get-static-datas-not-ssr.api";
import UsedProductListPage from "@/page/car-order/used/products/page";
import { ConvertAPIImagesToBase64 } from "@/utils/get-images-base64-api";

export default async function Product() {
  const data = await GetCarsListAPi("Used");
  await ConvertAPIImagesToBase64(data?.ads);

  let pagedata = { page_number: 1, page_size: 100 };

  const brandData = await GetStaticDatasNotSSRAPI({
    endPoint: "/BrandModelType/Get/All",
    data: pagedata,
    method: "post",
  });

  const { colors } = await GetStaticDatasNotSSRAPI({
    endPoint: "/Color/Get/All",
  });

  const { cities } = await GetStaticDatasNotSSRAPI({
    endPoint: "/City/Get/All",
  });

  return (
    <UsedProductListPage
      ads={data.ads}
      models={brandData?.brandModelTypes || []}
      colors={colors}
      cities={cities}
    />
  );
}
