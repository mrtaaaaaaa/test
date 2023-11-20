import GetStaticDatasNotSSRAPI from "@/apis/static-datas/get-static-datas-not-ssr.api";
import UsedCarOrder from "@/page/car-order/used";
import { ConvertAPIImagesToBase64 } from "@/utils/get-images-base64-api";

export default async function UsedCarOrderPage() {
  const postedData = { page_number: 1, page_size: 200 };

  const brandModel = await GetStaticDatasNotSSRAPI({
    endPoint: "/BrandModelType/Get/All",
    data: postedData,
    method: "post",
  });

  const data = await GetStaticDatasNotSSRAPI({
    endPoint: "/AdSale/Get/Published/Used",
    method: "get",
  });
  await ConvertAPIImagesToBase64(data?.ads ?? []);

  return (
    <UsedCarOrder
      usedData={data?.ads ?? []}
      brandModel={brandModel?.brandModelTypes ?? []}
    />
  );
}
