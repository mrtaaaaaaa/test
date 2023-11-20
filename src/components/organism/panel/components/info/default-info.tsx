"use client ";

import { GetUserInfoAPI } from "@/apis/authentication@";
import { authSelector } from "@/redux/auth/auth-Slice";
import {
  SET_DATA,
  SET_MODAL_SITUATION,
  editSliceSelector,
} from "@/redux/edit-personal-info/edit-personal-info-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAppSelector } from "src/hooks/redux-hooks";

const DefaultInfo = () => {
  const dispatch = useDispatch();
  const editInfo = useAppSelector(editSliceSelector);
  const { userInfo } = useAppSelector(authSelector);

  function fetchData() {
    GetUserInfoAPI(userInfo.phone_number)
      .then((res) => {
        dispatch(SET_DATA(res.users));
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, [editInfo.open]);

  const openModalHandler = () => {
    dispatch(SET_MODAL_SITUATION(true));
  };
  const info = [
    {
      title: "نام",
      value: editInfo.data.first_name,
    },
    {
      title: "نام‌خانوادگی",
      value: editInfo.data.last_name,
    },
    {
      title: "جنسیت",
      value: editInfo.data.gender ? editInfo.data.gender : "-",
    },
    {
      title: "شغل",
      value: editInfo?.data?.job,
    },
    {
      title: "تاریخ تولد",
      value: editInfo.data.day_of_birth
        ? ` ${editInfo.data.day_of_birth} / ${editInfo.data.month_of_birth} / ${editInfo.data.year_of_birth}`
        : "-",
    },
    {
      title: "کد‌ملی",
      value: editInfo.data.national_code ? editInfo.data.national_code : "-",
    },
    {
      title: "پست‌الکترونیکی",
      value: editInfo.data.email ? editInfo.data.email : "-",
    },
    {
      title: "کدپستی",
      value: editInfo.data.postal_code ? editInfo.data.postal_code : "-",
    },
    {
      title: "آدرس",
      value: editInfo.data.address ? editInfo.data.address : "-",
    },
  ];

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
      {info.map(({ title, value }) => (
        <div
          key={title}
          className={`border px-3 py-4 rounded-lg border-gray-250 ${
            title == "آدرس" && "md:col-span-2 col-span-1"
          }`}
        >
          <span className="block">{title}</span>
          <span className="font-bold">{value}</span>
        </div>
      ))}

      <div className="lg:col-span-3 md:col-span-2 mt-5 flex justify-center ">
        <button
          onClick={openModalHandler}
          className="bg-blue  rounded-md px-3 col-span-3 py-2 text-white"
        >
          ویرایش اطلاعات
        </button>
      </div>
    </div>
  );
};

export default DefaultInfo;
