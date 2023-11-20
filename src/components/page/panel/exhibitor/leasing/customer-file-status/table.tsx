"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import TableRow from "./table-row";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import { useEffect, useState } from "react";
import { GetExhibitorLeasingUserName } from "@/apis/panel/exhibitor";
import { SET_USERS_LEASING_DATA } from "@/redux/exhibitor-data/exhibitor-slice";

export const CustomerFileStatusTable = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const [leasing, setLeasing] = useState({
    loading: false,
    error: false,
    data: [],
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLeasing({ ...leasing, loading: true });
    GetExhibitorLeasingUserName(userInfo.phone_number)
      .then((res) => {
        dispatch(SET_USERS_LEASING_DATA(res));
        setLeasing({ ...leasing, loading: false, data: res });
      })
      .catch(() => setLeasing({ ...leasing, loading: false, error: true }));
  }, []);

  return (
    <>
      <div className="tablet:col-span-5 col-span-1 gap-2 tablet:grid tablet:grid-cols-12 hidden bg-blue-100 items-center rounded-tr-md rounded-tl-md px-3 py-4">
        <div className="text-xs font-medium lg:block hidden">#</div>
        <div className="text-xs text-center font-medium">کد پرونده</div>
        <div className="text-xs text-center font-medium col-span-2">
          نام و نام‌خانوادگی
        </div>
        <div className="text-xs text-center font-medium col-span-2">کدملی</div>
        <div className="text-xs text-center font-medium col-span-2">
          شماره تماس
        </div>
        <div className="text-xs text-center font-medium col-span-2">وضعیت</div>
        <div className="text-xs text-center font-medium lg:col-span-2 tablet:col-span-3"></div>
      </div>

      {leasing.loading ? (
        <Loading />
      ) : leasing.error ? (
        <div className="mt-4">
          <Alert type="error" title="متاسفانه خطایی رخ داده است" />
        </div>
      ) : leasing.data ? (
        leasing.data.map((leasing, index) => (
          <TableRow leasing={leasing} index={++index} />
        ))
      ) : (
        <Alert type="error" title="درخواست خرید اقساطی ثبت نشده است." />
      )}
    </>
  );
};
