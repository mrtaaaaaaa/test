"use client";

import { GetInfoAPI } from "@/apis/panel";
import TabsMyAds from "@/attom/tabs/tabs-my-ads";
import { Loading } from "@/attom/loading/loading";
import { useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/redux/auth/auth-Slice";

import { Suspense, useEffect, useState } from "react";

export default function Ads() {
  const { userInfo } = useAppSelector(authSelector);

  const [dataFetching, setDataFetching] = useState({
    data: "",
    isError: false,
    isLoading: true,
  });

  function fetchData() {
    GetInfoAPI(userInfo?.phone_number)
      .then((res) => {
        setDataFetching({
          ...dataFetching,
          data: res.ads,
          isLoading: false,
        });
      })
      .catch(() => {
        setDataFetching({ ...dataFetching, isError: true, isLoading: false });
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="font-bold text-xl mb-4 text-blue">آگهی‌های من</h1>
      <div className="border rounded-md p-5">
        <Suspense fallback={<Loading />}>
          <TabsMyAds
            data={dataFetching.data}
            setDataFetching={setDataFetching}
            dataFetching={dataFetching}
          />
        </Suspense>
      </div>
    </>
  );
}
