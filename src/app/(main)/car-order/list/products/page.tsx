import { GetPublishedListAPI } from "@/apis/cars-list";
import GetStaticDatasNotSSRAPI from "@/apis/static-datas/get-static-datas-not-ssr.api";
import ProductListPage from "@/page/car-order/list/products/page";
import { ConvertAPIImagesToBase64 } from "@/utils/get-images-base64-api";

export default async function Product() {
  const data = await GetPublishedListAPI();
  await ConvertAPIImagesToBase64(data?.ads);

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

  const citiesData = await GetStaticDatasNotSSRAPI({
    method: "get",
    endPoint: "/City/Get/All",
  });

  return (
    <ProductListPage
      ads={data.ads}
      models={brandData?.brandModelTypes || []}
      colors={colors}
      cities={citiesData?.cities || []}
    />
  );
}
