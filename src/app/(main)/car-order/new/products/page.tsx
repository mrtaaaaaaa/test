import GetStaticDatasNotSSRAPI from "@/apis/static-datas/get-static-datas-not-ssr.api";
import NewProductListPage from "@/page/car-order/new/products";

export default async function Product() {
  const data = await GetStaticDatasNotSSRAPI({
    endPoint: "/AdSale/Get/Published/New",
    method: "get",
  });

  let pagedata = { page_number: 1, page_size: 100 };

  const brandData = await GetStaticDatasNotSSRAPI({
    endPoint: "/BrandModelType/Get/All",
    data: pagedata,
    method: "post",
  });

  const colorsData = await GetStaticDatasNotSSRAPI({
    method: "get",
    endPoint: "/Color/Get/All",
  });

  const citiesData = await GetStaticDatasNotSSRAPI({
    method: "get",
    endPoint: "/City/Get/All",
  });

  return (
    <NewProductListPage
      ads={data?.ads || []}
      models={brandData?.brandModelTypes || []}
      colors={colorsData?.colors || []}
      cities={citiesData?.cities || []}
    />
  );
}
