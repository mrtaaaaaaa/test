import { GetCarsListAPi } from "@/apis/cars-list";
import GetStaticDatasAPI from "@/apis/static-datas/get-static-data.api";
import GetStaticDatasNotSSRAPI from "@/apis/static-datas/get-static-datas-not-ssr.api";
import NewCarOrders from "@/components/page/car-order/new/index";
import { ConvertAPIImagesToBase64 } from "@/utils/get-images-base64-api";

export default async function NewCarOrdersPage() {
  const postedData = { page_number: 1, page_size: 200 };

  const brandData = await GetStaticDatasNotSSRAPI({
    endPoint: "/BrandModelType/Get/All",
    data: postedData,
    method: "post",
  });

  const publishedAds = await GetStaticDatasNotSSRAPI({
    endPoint: "/AdSale/Get/Published/Top",
    method: "get",
  });
  await ConvertAPIImagesToBase64(publishedAds?.ads);

  const newData = await GetCarsListAPi("New");
  await ConvertAPIImagesToBase64(newData?.ads);

  return (
    <NewCarOrders
      brandModel={brandData?.brandModelTypes ?? []}
      popularAds={publishedAds}
      newData={newData?.ads ?? []}
    />
  );
}
