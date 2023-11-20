import { PostFilterSave } from "@/apis/filter-save";
import ModalSaveSearch from "@/attom/modals/save-filter-search/save-search";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/redux/auth/auth-Slice";
import {
  REMOVE_ALL,
  SET_SHOW_NULL,
  filterSelector,
} from "@/redux/filter/filter-slice";
import { SearchStatus } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function NotFoundResult({ cities, models }: any) {
  const [alert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const dataFilter = useAppSelector(filterSelector);
  const { userInfo } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const router = useRouter();

  const saveSearchHandler = () => {
    if (userInfo.phone_number) {
      setOpen(true);
      if (
        dataFilter.model.length !== 0 ||
        dataFilter.min_price !== -1 ||
        dataFilter.max_price !== -1
      ) {
        const postData = {
          brands: dataFilter?.brand[0],
          models: dataFilter?.model[0],
          min_price:
            dataFilter?.min_price == -1 ? -1 : dataFilter?.min_price / 1000000,
          max_price:
            dataFilter?.max_price == -1 ? -1 : dataFilter?.max_price / 1000000,
          city: "",
          notification_type: "SMS",
          user_name: userInfo?.phone_number,
        };

        PostFilterSave(postData)
          .then(() => {
            setShowAlert(true);
          })
          .catch((err) => {
            toast.error("مشکلی در ذخیره جستجو پیش آمده‌است");
          });
      }
    } else {
      router.push("/auth/check");
    }
  };

  const removeAlert = () => {
    setShowAlert(false);
    dispatch(REMOVE_ALL(""));
    dispatch(SET_SHOW_NULL(false));
  };

  return (
    <div className="col-span-3 mt-16">
      {open &&
        dataFilter.model.length == 0 &&
        dataFilter.min_price == -1 &&
        dataFilter.max_price == -1 && (
          <ModalSaveSearch
            models={models}
            cities={cities}
            open={open}
            setOpen={setOpen}
            setShowAlert={setShowAlert}
          />
        )}

      {!alert && (
        <div className="flex items-center flex-col h-full">
          <span className="block font-bold text-blue mb-4">
            خودروی مورد نظر شما پیدا نشد!
          </span>
          <div className="flex  gap-1 items-center">
            <SearchStatus size="16" color="#1242E0" />
            <span className="block font-bold text-blue">
              در صورت تمایل برای اطلاع از آگهی‌های آینده با این مشخصات، جستجو را
              ذخیره نمایید.
            </span>
          </div>
          <button
            className="border rounded-lg mt-6 border-blue text-blue px-8 py-2"
            onClick={saveSearchHandler}
          >
            ذخیره جستجوی اخیر
          </button>
        </div>
      )}

      {alert && (
        <div className="flex justify-center">
          <div className="lg:w-1/2 md:w-2/3 w-full rounded-xl border border-gray-200">
            <span className="border-b border-b-100 p-4 text-lg font-bold text-center block">
              جستجوی اخیر شما ذخیره شد!
            </span>
            <div className="p-4 flex flex-col">
              <div className="p-4 bg-[#EAF1F3] text-blue text-sm font-medium rounded-lg">
                <span className="block">
                  در حال حاضر امکان ذخیره یک «جستجو» وجود دارد.
                </span>
                <p>
                  توجه داشته‌باشید در صورت ذخیره نمودن جستجوی جدید، جستجوی قبلی
                  حذف خواهد شد.
                </p>
              </div>

              <button
                className="border text-gray-500 rounded-lg text-sm py-1 px-2 mx-auto mt-4"
                onClick={removeAlert}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
