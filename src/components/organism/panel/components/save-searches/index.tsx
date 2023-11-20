"use client";

import { GetFilterGet } from "@/apis/panel";
import DeleteSaveSearch from "@/attom/modals/save-filter-search/delete-save-search-modal";
import ModalSaveSearch from "@/attom/modals/save-filter-search/save-search";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { ADD_CAR_MODEL } from "@/redux/brand-model/brand-model-slice";
import { NumberSeprator } from "@/utils/number-seprator";
import { InfoCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { CitiesType, SavedSearchesType } from "./type";
import GetStaticDatasNotSSRAPI from "@/apis/static-datas/get-static-datas-not-ssr.api";
import { useRequest } from "@/hooks/useRequest";
import { FRONT2DB } from "@/config/url";

const SavedSearches = () => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [cities, setCities] = useState<CitiesType | null>(null);
  const [models, setModels] = useState<any>([]);
  const [searches, setSearches] = useState<SavedSearchesType>({
    data: null,
    loading: true,
    error: false,
  });

  async function GetCities() {
    const { cities } = await GetStaticDatasNotSSRAPI({
      endPoint: "/City/Get/All",
    }).then((res: any) => res);
    setCities(cities);
    return cities;
  }

  // async function GetBrandModels() {
  //   const brandData = await GetStaticDatasNotSSRAPI({
  //     endPoint: "/BrandModelType/Get/All",
  //     method: "post",
  //   });

  //   setModels(brandData.brandModelTypes || []);
  //   return brandData?.brandData || [];
  // }

  const { data: brandModel } = useRequest({
    method: "GP",
    url: `${FRONT2DB}/BrandModelType/Get/All`,
    data: {
      page_number: 1,
      page_size: 200,
    },
  });

  useEffect(() => {
    setSearches({ ...searches, loading: true });
    GetFilterGet()
      .then((res) => {
        setSearches({ ...searches, loading: false, data: res.filters });
        dispatch(
          ADD_CAR_MODEL({
            name: "editSaveSearch",
            value: res.filters.models,
          })
        );
      })
      .catch(() => setSearches({ ...searches, loading: false, error: true }));
    GetCities();
    // GetBrandModels();
  }, []);

  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setEditModal(true);
  };

  if (searches.loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="border rounded-lg p-6 h-full">
        <h1 className="font-bold text-blue tablet:text-xl text-lg">
          جستجوی ذخیره شده
        </h1>
        <div className="flex items-center  gap-1 mt-2 border-b border-b-gray-300 pb-6 mb-6">
          <InfoCircle size="24" color="#F87F06" variant="Bold" />
          <p className="text-xs">
            در حال حاضر امکان ذخیره
            <span className="text-blue"> یک جستجو </span>
            را دارید و در صورت ذخیره کردن, جستجوی جدید جایگزین جستجوی قبلی
            می‌شود.
          </p>
        </div>

        {searches.data === "filter not exist" ? (
          <Alert title="جستجوی ذخیره شده‌ای ثبت نشده است." type="error" />
        ) : searches.data ? (
          <div className="border tablet:w-[30rem] w-full tablet:p-6 p-2 rounded-md border-blue">
            <div className="flex justify-between items-center">
              <span className="text-blue block font-medium">
                جستجو دلخواه شما
              </span>
              <ModalSaveSearch
                open={editModal}
                loading={searches.loading}
                setOpen={setEditModal}
                handleOpen={handleOpen}
                defaultValues={searches.data}
                cities={cities}
                models={brandModel?.brandModelTypes ?? []}
              />
            </div>
            <div className="grid tablet:grid-cols-2 grid-cols-1 gap-4 text-[#979797] mt-4">
              <div>
                <span className="text-sm">برند: </span>
                <span className="font-medium">{searches.data.brands}</span>
              </div>

              <div>
                <span className="text-sm">حداقل قیمت: </span>
                <span className="font-medium">
                  {searches.data.min_price == -1 ? (
                    "-"
                  ) : (
                    <span className="text-xs font-light">
                      <span className="font-bold text-sm">
                        {NumberSeprator(searches.data.min_price)}
                      </span>{" "}
                      تومان
                    </span>
                  )}
                </span>
              </div>

              <div>
                <span className="text-sm">مدل: </span>
                <span className="font-medium">{searches.data.models}</span>
              </div>

              <div>
                <span className="text-sm">حدکثر قیمت: </span>
                <span className="font-medium ">
                  {searches.data.max_price == -1 ? (
                    "-"
                  ) : (
                    <span className="text-xs font-light">
                      <span className="font-bold text-sm">
                        {NumberSeprator(searches.data.max_price)}
                      </span>{" "}
                      تومان
                    </span>
                  )}
                </span>
              </div>

              <div>
                <span className="text-sm">استان: </span>{" "}
                <span className="font-medium">
                  {searches.data.city ? searches.data.city : "-"}
                </span>
              </div>

              <DeleteSaveSearch setSearches={setSearches} />
            </div>
          </div>
        ) : (
          <Alert title="جستجوی ذخیره شده‌ای ندارید" type="error" />
        )}
      </div>
    </>
  );
};

export default SavedSearches;
