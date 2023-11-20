"use client";

import { GetCarOrderListsAPI } from "@/apis/panel/admin";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import { useEffect, useState } from "react";
import CardOrderPanel from "./card-order-panel";

interface StateData {
  ads: any[];
  isLoading: boolean;
  isError: boolean;
}

const NormalCarOrderRequestsPage = () => {
  const [data, setData] = useState<StateData>({
    ads: [],
    isLoading: false,
    isError: false,
  });

  async function fetchData() {
    setData({ ...data, isLoading: false });
    GetCarOrderListsAPI()
      .then((res) => {
        setData({ ads: res.ads, isLoading: false, isError: false });
      })
      .catch(() => {
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
      <div>
        <h1 className="font-bold text-xl mb-4 text-blue">درخواست‌های ثبت شده خرید عادی</h1>
        {data.ads == null ? (
          <Alert type="error" title="آگهی ثبت نشده است" />
        ) : (
          data.ads !== null && (
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xl:gap-6 gap-8 mt-6">
              {data.ads?.map((order) => (
                <CardOrderPanel
                  key={order.advertiser_id}
                  order={order}
                  badge="درخواست خرید عادی"
                />
              ))}
            </div>
          )
        )}
      </div>
    );
  }
};

export default NormalCarOrderRequestsPage;
