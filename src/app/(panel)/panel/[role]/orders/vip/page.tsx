"use client";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import { FRONT2DB } from "@/config/url";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useRequest } from "@/hooks/useRequest";
import CardOrderPanel from "@/organism/panel/admin/card-order-panel";
import { authSelector } from "@/redux/auth/auth-Slice";
import React from "react";

export default function VipOrders() {
  const { userInfo } = useAppSelector(authSelector);
  const { data, isError, isLoading } = useRequest({
    method: "GP",
    url: `${FRONT2DB}/AdBuy/Vip/Get/User/${userInfo.phone_number}`,
    data: {
      start_time: -1,
      end_time: -1,
      ascending: true,
    },
  });

  return (
    <div>
      <h1 className="font-bold text-xl mb-4 text-blue">
        درخواست‌های خرید ویژه من
      </h1>
      {isLoading ? (
        <div className="md:col-span-5 col-span-1">
          <Loading />
        </div>
      ) : isError ? (
        <div className="md:col-span-5 col-span-1">
          <Alert type="error" title="متاسفانه خطایی رخ داده است" />
        </div>
      ) : !data ? (
        <Alert type="error" title="درخواستی ثبت نشده است." />
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-6">
          {data?.ads.map((order) => (
            <CardOrderPanel
              key={order.advertiser_id}
              order={order}
              badge="درخواست خرید ویژه"
            />
          ))}
        </div>
      )}
    </div>
  );
}
