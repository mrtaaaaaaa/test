"use client";

import { GetCarSaleListsAPI } from "@/apis/panel/admin";
import Alert from "@/attom/alerts/alert";
import CardProduct from "@/attom/cards/card-product";
import { Loading } from "@/attom/loading/loading";
import { ConvertAPIImagesToBase64 } from "@/utils/get-images-base64-api";
import { useEffect, useState } from "react";

interface StateData {
  ads: any[];
  isLoading: boolean;
  isError: boolean;
}

const NormalCarSaleRequestsPage = () => {
  const [data, setData] = useState<StateData>({
    ads: [],
    isLoading: false,
    isError: false,
  });

  async function fetchData() {
    setData({ ...data, isLoading: false });
    try {
      const tempCarList = await GetCarSaleListsAPI();
      await ConvertAPIImagesToBase64(tempCarList?.ads);
      setData({ ads: tempCarList.ads, isLoading: false, isError: false });
    } catch(error: any) {
      setData({ ads: [], isLoading: false, isError: true });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (data.isLoading) {
    return <Loading />;
  }
  if (data.isError) {
    return <Alert type="error" title="متاسفانه خطایی رخ داده است" />;
  } else {
    return (
      <>
        <h1 className="font-bold text-xl mb-4 text-blue">
          درخواست‌های ثبت‌شده فروش عادی
        </h1>
        <div
          className="grid  xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-6"
          id="product-list"
        >
          {data.ads == null ? (
            <Alert type="error" title="آگهی ثبت نشده است" />
          ) : (
            data.ads !== null &&
            data.ads?.map((product) => {
              return (
                <CardProduct
                  key={product.ad_code}
                  image={product.front_firstImage_base64File}
                  data={product}
                />
              );
            })
          )}
        </div>
      </>
    );
  }
};
export default NormalCarSaleRequestsPage;
