import VipBox from "@/Ui/components/car/sale/components/vipCarSale";
import Alert from "Components/Alert/Alert";
import { Loading } from "Components/Alert/Loading";
import httpService from "services/httpService";
import { FRONT2DB } from "config/url";
import { useQuery } from "react-query";

const AdminVipCarSale = () => {
  async function fetchData() {
    const { data } = await httpService.get(`${FRONT2DB}/AdSale/Vip/Get/All`);
    return data;
  }

  const { data, isError, isLoading } = useQuery("products", fetchData);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Alert type="error" title="متاسفانه خطایی رخ داده است" />;
  } else {
    return (
      <div>
        <h1 className="font-bold text-lg mb-4">درخواست های فروش ویژه</h1>
        {data.ads == null ? (
          <Alert type="error" title="آگهی ثبت نشده است" />
        ) : (
          data.ads !== null && (
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 mt-6">
              {data.ads?.map((order) => (
                <VipBox
                  key={order.advertiser_id}
                  order={order}
                  badge="درخواست فروش ویژه"
                />
              ))}
            </div>
          )
        )}
      </div>
    );
  }
};

export default AdminVipCarSale;
