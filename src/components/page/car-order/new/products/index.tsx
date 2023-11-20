"use client";

import { PostFilterSave } from "@/apis/filter-save";
import Alert from "@/attom/alerts/alert";
import CardProduct from "@/attom/cards/card-product";
import { useAppSelector } from "@/hooks/redux-hooks";
import MainPageFilter from "@/molcule/filter";
import SelectSortBy from "@/molcule/filter/components@/sort";
import NotFoundResult from "@/organism/car-order/not-found/not-found-result";
import { authSelector } from "@/redux/auth/auth-Slice";
import { filterSelector } from "@/redux/filter/filter-slice";
import { useState } from "react";
import { toast } from "react-toastify";

const NewProductListPage = ({ ads, models, colors, cities }: any) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const dataFilter = useAppSelector(filterSelector);

  const [showFilter, setShowFilter] = useState<boolean | null>(null);
  const { userInfo } = useAppSelector(authSelector);

  const filteredArr = dataFilter?.previewData?.reduce((acc, current) => {
    const x = acc.find(
      (item: any) => item.advertiser_id === current.advertiser_id
    );
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  if (ads === null) {
    return (
      <Alert title="خودروی صفر ثبت نشده است." type="error" classes="my-10" />
    );
  }

  const showFilterhandler = () => {
    setShowFilter(!showFilter);
  };

  const handleOpen = () => {
    setOpenModal(true);
    const data = {
      brands: dataFilter?.model?.join(",") ?? -1,
      models: dataFilter?.model?.join(",") ?? -1,
      min_price: +dataFilter.min_price ? +dataFilter.min_price : -1,
      max_price: +dataFilter.max_price ? +dataFilter.max_price : -1,
      city: "",
      notification_type: "SMS",
      user_name: userInfo?.phone_number,
    };
    PostFilterSave(data)
      .then(() => toast.success("جستجو با موفقیت ذخیره شد."))
      .catch(() => toast.error("متاسفانه خطایی رخ داده است."));
  };

  return (
    <div
      className="grid lg:grid-cols-4 md:grid-cols-3 gap-4 md:mt-0 mt-5 mb-16"
      id="product-list"
    >
      <div className="lg:col-span-1 md:col-span-1">
        <div
          className="md:static fixed bg-white top-[8rem] z-10 right-0 left-0 md:p-0 px-4 py-2"
          style={{ zIndex: "100" }}
        >
          <button
            className="lg:hidden flex items-center gap-1 text-blue font-medium text-sm px-5 py-1 border border-gray-200 rounded-lg leading-relaxed"
            onClick={showFilterhandler}
          >
            فیلترها
          </button>
        </div>
        <MainPageFilter
          colors={colors}
          models={models}
          setShowFilter={setShowFilter}
          showFilter={showFilter}
          showMileAge={false}
          classes={`${
            showFilter ? "right-0 top-0  z-9999 " : "-right-[50rem] top-32"
          }`}
        />
      </div>

      {dataFilter.showNull == true ? (
        <div className="grid lg:col-span-3 md:col-span-3  lg:grid-cols-3 tablet:grid-cols-3 md:grid-cols-2 gap-6 h-fit">
          <NotFoundResult
            cities={cities}
            models={models}
            handleOpen={handleOpen}
            setOpen={setOpenModal}
            open={openModal}
          />
        </div>
      ) : (
        <div className="lg:col-span-3 md:col-span-3 grid lg:grid-cols-3 tablet:grid-cols-3 md:grid-cols-2 gap-6 h-fit">
          <SelectSortBy />
          {filteredArr?.length > 0 ? (
            filteredArr.length > 1 ? (
              filteredArr.map((product: any) => {
                return (
                  <CardProduct
                    key={product.ad_code}
                    image={product.front_firstImage_base64File}
                    data={product}
                  />
                );
              })
            ) : (
              <CardProduct
                image={filteredArr[0].front_firstImage_base64File}
                data={filteredArr[0]}
              />
            )
          ) : (
            ads.map((product: any) => {
              return (
                <CardProduct
                  key={product.ad_code}
                  image={product.front_firstImage_base64File}
                  data={product}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
export default NewProductListPage;
