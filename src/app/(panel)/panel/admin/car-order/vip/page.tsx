"use client";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import { FRONT2DB } from "@/config/url";
import { useRequest } from "@/hooks/useRequest";
import CardOrderPanel from "@/organism/panel/admin/card-order-panel";

export default function VipOrders() {
  const { data, isError, isLoading } = useRequest({
    method: "GET",
    url: `${FRONT2DB}/AdSale/Vip/Get/All`,
  });

  return (
    <div>
      <h1 className="font-bold text-xl mb-4 text-blue">
        درخواست‌های ثبت شده خرید ویژه 
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
