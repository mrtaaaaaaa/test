"use client";
import { GetAllInspectorsAPI } from "@/apis/authentication@";
import { GetVehicleCheckListsAPI } from "@/apis/panel/admin";
import Alert from "@/attom/alerts/alert";
import VehicleCheckPack from "@/attom/cards/vehicle-check/vehicle-check-pack";
import { Loading } from "@/attom/loading/loading";
import { useEffect, useState } from "react";

interface StateData {
  data: any[];
  isLoading: boolean;
  isError: boolean;
}

const AdminVehicleCheck = () => {
  const [data, setData] = useState<StateData>({
    data: [],
    isLoading: true,
    isError: false,
  });
  const [inspectors, setInspectors] = useState([]);

  async function fetchData() {
    setData({ ...data, isLoading: true });
    GetVehicleCheckListsAPI()
      .then((res) => {
        setData({ data: res.VehicleChecks, isLoading: false, isError: false });
      })
      .catch(() => {
        setData({ data: [], isLoading: false, isError: true });
      });
  }

  useEffect(() => {
    fetchData();
    GetAllInspectorsAPI().then((res: any) => setInspectors(res.data.users));
  }, []);

  if (data.isLoading) {
    return <Loading />;
  } else if (data.isError) {
    return <Alert type="error" title="متاسفانه خطایی رخ داده است" />;
  } else {
    const arr = data.data?.map((item) => +item.payment_tracking_code);
    const duplicates = arr?.filter(
      (item, index) => arr.indexOf(item) === index
    );

    let myPackages: any[] = [];
    let vcPackage = duplicates?.map((tc) => {
      let innerArray: any[] = [];
      data.data?.map((item) => {
        if (item.payment_tracking_code == tc) {
          innerArray.push(item);
        }
      });
      myPackages.push(innerArray);
    });

    return (
      <>
        <h1 className="font-bold text-xl mb-4 text-blue">
          درخواست‌های کارشناسی
        </h1>
        {data.data?.length > 1 ? (
          myPackages?.map((pack, index) => (
            <VehicleCheckPack
              index={index}
              pack={pack}
              inspectors={inspectors}
            />
          ))
        ) : data.data?.length == 1 ? (
          <VehicleCheckPack
            index="panelOne"
            pack={data.data[0]}
            inspectors={inspectors}
          />
        ) : (
          <Alert
            title="شما تا کنون درخواست کارشناسی نداشته اید."
            type="error"
          />
        )}
      </>
    );
  }
};
export default AdminVehicleCheck;
