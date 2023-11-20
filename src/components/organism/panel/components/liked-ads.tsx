"use client";
import { GetLikedAdsAPI } from "@/apis/panel";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import { useState, useEffect } from "react";
import { Suspense, lazy } from "react";
const CardLiked = lazy(() => import("@/attom/cards/card-like"));

interface DataState {
  ads: any[];
  isLoading: boolean;
  isError: boolean;
}

export default function LikedAds() {
  const [isFilledIcon, setIsFilledIcon] = useState<Boolean>(true);
  const [data, setData] = useState<DataState>({
    ads: [],
    isLoading: false,
    isError: false,
  });

  function fetchData() {
    setData({ ...data, isLoading: true });
    GetLikedAdsAPI()
      .then((res) =>
        setData({ ads: res.ads, isLoading: false, isError: false })
      )
      .catch(() => setData({ ads: [], isLoading: false, isError: true }));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="font-bold text-xl mb-4 text-blue">آگهی‌های پسندیده شده</h1>
      {data.isLoading ? (
        <Loading />
      ) : data.isError ? (
        <Alert title="متاسفانه خطایی پیش آمده‌ است" type="error" />
      ) : data?.ads ? (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          {data?.ads?.map((item, index) => {
            return (
              <Suspense fallback={<Loading />}>
                <CardLiked
                  setIsFilledIcon={setIsFilledIcon}
                  isFilledIcon={isFilledIcon}
                  index={index}
                  item={item}
                />
              </Suspense>
            );
          })}
        </div>
      ) : (
        <Alert title="آگهی پسندیده شده‌ای ندارید." type="error" />
      )}
    </>
  );
}
