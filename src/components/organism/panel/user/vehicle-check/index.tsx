"use client";
import { GetVehicleCheckAPI } from "@/apis/panel";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import { useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/redux/auth/auth-Slice";
import { Suspense, lazy, useState, useEffect } from "react";

const VehicleCheckPack = lazy(
  () => import("@/attom/cards/vehicle-check/vehicle-check-pack")
);

interface StateType {
  VehicleChecks: any[];
  isError: boolean;
  isLoading: boolean;
  [name: string]: any;
}

const UserVehicleCheck = () => {
  const { userInfo } = useAppSelector(authSelector);

  const [data, setData] = useState<StateType>({
    VehicleChecks: [],
    isError: false,
    isLoading: false,
  });

  function fetchData() {
    setData({ ...data, isLoading: true });
    GetVehicleCheckAPI(userInfo.phone_number)
      .then((res) =>
        setData({
          isError: false,
          isLoading: false,
          VehicleChecks: res.VehicleChecks,
        })
      )
      .catch(() => {
        setData({ isError: true, isLoading: false, VehicleChecks: [] });
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  interface IVehicleCheck {
    payment_tracking_code: number | string;
  }

  if (data.isError) {
    return <Alert title="متاسفانه خطایی پیش آمده‌ است" type="error" />;
  } else {
    const arr = data?.VehicleChecks?.map(
      (item: IVehicleCheck) => +item.payment_tracking_code
    );
    const duplicates = arr?.filter(
      (item, index) => arr.indexOf(item) === index
    );

    let myPackages: any[] = [];
    let vcPackage = duplicates?.map((tc) => {
      let innerArray: any[] = [];
      data?.VehicleChecks?.map((item: IVehicleCheck) => {
        if (item.payment_tracking_code == tc) {
          innerArray.push(item);
        }
      });
      myPackages.push(innerArray);
    });

    return (
      <>
        <h1 className="font-bold text-xl mb-4 text-blue">
          درخواست‌های کارشناسی خودرو
        </h1>

        {data.isLoading ? (
          <Loading />
        ) : data.VehicleChecks ? (
          data?.VehicleChecks?.length > 1 ? (
            myPackages?.map((pack, index) => (
              <Suspense fallback={<span></span>}>
                <VehicleCheckPack index={index} pack={pack} />
              </Suspense>
            ))
          ) : (
            data?.VehicleChecks?.length == 1 && (
              <Suspense fallback={<span></span>}>
                <VehicleCheckPack index="panelOne" pack={data?.data[0]} />
              </Suspense>
            )
          )
        ) : (
          <Alert
            type="error"
            title="شما تا کنون درخواست کارشناسی ثبت نکرده‌اید"
          />
        )}
      </>
    );
  }
};
export default UserVehicleCheck;
