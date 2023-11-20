"use client";

import { GetCarSaleListsAPI } from "@/apis/panel/admin";
import Alert from "@/attom/alerts/alert";
import CardProduct from "@/attom/cards/card-product";
import { Loading } from "@/attom/loading/loading";
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
    GetCarSaleListsAPI().then((res) => {
      setData({ ads: res.ads, isLoading: false, isError: false });
    }).catch(() => {
      setData({ ads: [], isLoading: false, isError: true });
    });
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
        <h1 className="font-bold text-lg mb-4">
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
                  image={product.image_guids}
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
