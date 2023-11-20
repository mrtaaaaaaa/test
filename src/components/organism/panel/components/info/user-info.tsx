"use client ";
import { img } from "@/data";
import { editSliceSelector } from "@/redux/edit-personal-info/edit-personal-info-slice";
import { useAppSelector } from "src/hooks/redux-hooks";
import DefaultInfo from "./default-info";
import FormUpdateInfo from "./form-update-info";

const UserInfo = () => {
  const { open } = useAppSelector(editSliceSelector);

  return (
    <>
      <h1 className="font-bold text-xl mb-4 text-blue">اطلاعات فردی</h1>
      <div className="grid md:grid-cols-4 gap-5">
        <div className="lg:col-span-3 md:col-span-5">
          <DefaultInfo />
          {open && <FormUpdateInfo />}
        </div>
        <div className="lg:block hidden">
          <img src={img.user_panel_img.src} />
        </div>
      </div>
    </>
  );
};

export default UserInfo;
