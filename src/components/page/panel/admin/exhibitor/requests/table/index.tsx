"use client";
import {
  postAuthUsersExhibitorsSetStatus,
  postUserRole,
} from "@/apis/authentication@";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import { AUTH_URL } from "@/config/url";
import { useRequest } from "@/hooks/useRequest";
import { toast } from "react-toastify";

export default function AdminExhibitorRequestTable() {

  const { data, isLoading, isError } = useRequest({
    method: "GET",
    url: `${AUTH_URL}/Auth/Users/Exhibitors`,
  });


  return (
    <>
      <div className="tablet:col-span-5 col-span-1 gap-4 tablet:grid tablet:grid-cols-12 hidden bg-blue-100 items-center rounded-tr-md rounded-tl-md p-4">
        <div className="text-xs font-medium lg:block hidden">#</div>
        <div className="text-xs font-medium col-span-2">
          نام و نام‌خانوادگی نمایشگاه‌دار
        </div>
        <div className="text-xs font-medium col-span-2">شماره تماس</div>
        <div className="text-xs font-medium col-span-2">کد ملی</div>
        <div className="text-xs font-medium col-span-2">نام نمایشگاه</div>
        <div className="text-xs font-medium ">وضعیت</div>
        <div className="text-xs font-medium lg:col-span-2 tablet:col-span-3"></div>
      </div>

      {isLoading ? (
        <div className="md:col-span-5 col-span-1">
          <Loading />
        </div>
      ) : isError ? (
        <div className="md:col-span-5 col-span-1">
          <Alert type="error" title="متاسفانه خطایی رخ داده است" />
        </div>
      ) : data.count > 0 ? (
        data.users.map((user, index) => (
          <TableItem index={++index} user={user.exhibitor_profile} />
        ))
      ) : (
        <Alert title="درخواستی ثبت نشده است." type="error" />
      )}
    </>
  );
}

const TableItem = ({ user, index }: any) => {
  const acceptHandler = (e, phone_number) => {
    let postData = new FormData();
    let roles = [{ role_name: "Exhibitors" }];

    postData.append("user_name", phone_number);
    postData.append("roles", JSON.stringify(roles));

    postUserRole(postData)
      .then(() => toast.success("نقش کاربر با موفقیت تغییر کرد"))
      .catch(() => toast.error("مشکلی در تغییر نقش کاربر پیش آمده‌است"));
  };

  const rejectHandler = (e, phone_number) => {
    const postData = {
      user_name: phone_number,
      exhibition_status: "رد درخواست",
    };

    postAuthUsersExhibitorsSetStatus(postData)
      .then(() => toast.success("درخواست با موفقیت رد شد."))
      .catch(() => toast.error("متاسفانه خطایی رخ داده است."));
  };
  return (
    <div className="tablet:col-span-5 tablet:grid tablet:grid-cols-12 flex flex-col gap-4 items-center p-4 tablet:border-b tablet:border-0 tablet:border-b-gray-200 border border-gray-500 tablet:rounded-none rounded-lg mt-4">
      <div className="font-bold lg:block hidden tablet:w-fit w-full text-sm">
        {index}-
      </div>

      <div className="flex justify-between tablet:w-fit w-full col-span-2">
        <span className="tablet:hidden block font-bold">
          نام و نام‌خانوادگی نمایشگاه‌دار
        </span>
        <span className="text-sm text-ellipsis truncate lg:max-w-[7rem] tablet:max-w-[4rem] md:max-w-none max-w-[7rem]">
          {user.exhibition_manager_name} {user.exhibition_manager_family}
        </span>
      </div>

      <div className="flex justify-between tablet:w-fit w-full col-span-2">
        <span className="tablet:hidden block font-bold">شماره تماس</span>
        <span className="text-sm">{user.exhibition_manager_phone_number}</span>
      </div>

      <div className="flex justify-between tablet:w-fit w-full col-span-2">
        <span className="tablet:hidden block font-bold">کد ملی</span>
        <span className="font-bold text-sm">
          {user.exhibition_manager_national_code}
        </span>
      </div>

      <div className="flex justify-between tablet:w-fit w-full col-span-2">
        <span className="tablet:hidden block font-bold">نام نمایشگاه</span>
        <span className="text-sm">{user.exhibition_name}</span>
      </div>

      <div className="flex justify-between tablet:w-fit w-full">
        <span className="tablet:hidden block font-bold">وضعیت</span>
        <span className="text-xs text-green">{user.exhibition_status}</span>
      </div>

      <div className="flex justify-end gap-2 lg:col-span-2 tablet:col-span-3 w-full">
        <button
          className="bg-blue text-white rounded-lg px-6 py-[.5rem] text-xs disabled:bg-gray-500"
          onClick={(e) =>
            acceptHandler(e, user.exhibition_manager_phone_number)
          }
          disabled={user.exhibition_manager_phone_number == "" ? true : false}
        >
          تایید
        </button>
        <button
          className="bg-white text-red-500 border border-red-500 rounded-lg tablet:px-2 px-4 tablet:py-1 py-2 text-xs disabled:bg-gray-500 disabled:text-white disabled:border-0 disabled:cursor-not-allowed whitespace-nowrap font-medium"
          onClick={(e) =>
            rejectHandler(e, user.exhibition_manager_phone_number)
          }
        >
          عدم تایید
        </button>
      </div>
    </div>
  );
};
