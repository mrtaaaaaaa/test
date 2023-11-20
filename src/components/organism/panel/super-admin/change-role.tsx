"use client";

import {
  GetAllRolesAPI,
  GetAllUsersAPI,
  postUserRole,
} from "@/apis/authentication@";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface UserDataTypes {
  allUsers: any[];
  isLoading: boolean;
  isError: boolean;
}
interface RolesDataTypes {
  allRoles: any[];
  loadingRoles: boolean;
  errorRoles: boolean;
}

export default function ChaneRole() {
  const [usersData, setUsersData] = useState<UserDataTypes>({
    allUsers: [],
    isLoading: false,
    isError: false,
  });
  const [roleData, setRoleData] = useState<RolesDataTypes>({
    allRoles: [],
    loadingRoles: false,
    errorRoles: false,
  });

  function fetchData() {
    setUsersData({ ...usersData, isLoading: true });

    //get all users //
    GetAllUsersAPI()
      .then((res) => {
        setUsersData({ allUsers: res.users, isLoading: false, isError: false });
      })
      .catch(() => {
        toast.error("دریافت لیست کاربران با خطا مواجه شد.");
        setUsersData({ allUsers: [], isLoading: true, isError: true });
      });
    //get all  roles //
    GetAllRolesAPI()
      .then((res) => {
        setRoleData({
          allRoles: res.roles,
          loadingRoles: false,
          errorRoles: false,
        });
      })
      .catch(() => {
        toast.error("دریافت لیست کاربران با خطا مواجه شد.");
        setRoleData({ allRoles: [], loadingRoles: true, errorRoles: true });
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  interface FuncInputs {
    e: React.ChangeEvent<HTMLSelectElement>;
    userName: string;
  }

  const changeSelect = ({ e, userName }: FuncInputs) => {
    let postData = new FormData();
    let roles = [{ role_name: e.target.value }];

    postData.append("user_name", userName);
    postData.append("roles", JSON.stringify(roles));

    postUserRole(postData)
      .then(() => toast.success("نقش کاربر با موفقیت تغییر کرد"))
      .catch(() => toast.error("مشکلی در تغییر نقش کاربر پیش آمده‌است"));
  };

  return (
    <div className="md:grid md:grid-cols-5 flex flex-col gap-4">
      <div className="md:col-span-5 col-span-1 md:grid lg:grid-cols-5 md:grid-cols-4 hidden bg-blue text-white items-center rounded-tr-md rounded-tl-md px-6 py-3">
        <div className="lg:block hidden">#</div>
        <div>نام و نام‌خانوادگی</div>
        <div>شماره همراه</div>
        <div>نقش فعلی</div>
        <div>نقش</div>
      </div>

      {usersData.isLoading || roleData.loadingRoles ? (
        <div className="md:col-span-5 col-span-1">
          <Loading />
        </div>
      ) : usersData.isError || roleData.errorRoles ? (
        <div className="md:col-span-5 col-span-1">
          <Alert type="error" title="متاسفانه خطایی رخ داده است" />
        </div>
      ) : (
        usersData?.allUsers?.map(
          (user: (typeof usersData.allUsers)[number], index: number) => (
            <div className="md:col-span-5 md:grid lg:grid-cols-5 md:grid-cols-4 flex flex-col gap-4 items-center md:px-6 md:py-3 p-5 md:border-0 border border-gray-300 rounded-lg ">
              <div className="font-bold lg:block hidden md:w-fit w-full">
                {++index}-
              </div>
              <div className="md:block flex justify-between md:w-fit w-full">
                <span className="md:hidden block font-bold">
                  نام و نام‌خانوادگی
                </span>
                <span>
                  {user.first_name} {user.last_name}
                </span>
              </div>
              <div className="md:block flex justify-between md:w-fit w-full">
                <span className="md:hidden block font-bold">شماره همراه</span>
                <span>{user.phone_number}</span>
              </div>
              <div className="md:block flex justify-between md:w-fit w-full">
                <span className="md:hidden block font-bold">نقش فعلی</span>
                <span className="font-bold">
                  {Object.values(user.roles)[0]}
                </span>
              </div>
              <div className="kflex justify-between md:w-fit w-full">
                <span className="md:hidden block font-bold">نقش</span>
                <select
                  className="rounded-md border border-blue lg:py-2 md:py-1 lg:px-3 md:px-1 px-2 py-1 text-xs outline-none md:w-full"
                  onChange={(e) =>
                    changeSelect({ e: e, userName: user.user_name })
                  }
                >
                  <option selected hidden>
                    نقش کاربر را مشخص کنید
                  </option>
                  {roleData.allRoles.map(({ role_name, role_title }: any) => (
                    <option value={role_name} style={{ fontSize: "11px" }}>
                      {role_title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}
