"use client";
import { PostAuthUserUpdate } from "@/apis/authentication@/post-auth-user-update.api";
import { postAdSaleUpdateId } from "@/apis/panel/user/post-ad-sale-update-id";
import { staticData } from "@/data";
import { carSalevalidationSchema } from "@/page/car-sale/sell-my-car/components/form/validation-schema";
import FurtherInfo from "@/page/car-sale/sell-my-car/components/further-info";
import RequiredInfo from "@/page/car-sale/sell-my-car/components/required-info";
import UserInfo from "@/page/car-sale/sell-my-car/components/user-info";
import { authSelector } from "@/redux/auth/auth-Slice";
import {
  ADD_WHOLE_INSURANE,
  insuranceSelector,
} from "@/redux/insurance/insurance-slice";
import {
  ADD_WHOLE_CAR_DETAILS_INFO,
  REMOVE_CAR_INFO,
  pricingSelector,
} from "@/redux/pricing/pricing-slice";
import { B64toBlob } from "@/utils/b64-to-blob";
import { checkExistWindow } from "@/utils/check-exist-window";
import { parseJwt } from "@/utils/jwt";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";
import { UpdateAdSaleInitValue } from "./component/form/initial-value";
import PreviewImage from "./component/preview-image";

export default function UpdateAdPageContent({
  cities,
  colors,
  advertise,
}: any) {
  const MapModal = useMemo(
    () =>
      dynamic(() => import("@/attom/form@/components@/map@/map"), {
        ssr: false,
      }),
    []
  );

  // @@@___________________ Redux ___________________@@@
  const { userInfo } = useAppSelector(authSelector);
  const { insurances } = useAppSelector(insuranceSelector);
  const pricing = useAppSelector(pricingSelector);

  // @@@___________________ use State ___________________@@@
  const [imgsSrc, setImgsSrc] = useState([]);
  const [showSearched, setShowSearched] = useState([]);

  const [roles, setRoles] = useState<any[]>([]);
  let pricingData: any[] = [];

  // @@@___________________ use App Dispatch ___________________@@@
  const dispatch = useAppDispatch();

  // @@@___________________ use Effect ___________________@@@
  useEffect(() => {
    if (checkExistWindow()) {
      if (!localStorage.getItem("userInfo")) {
        return router.push("/auth/check");
      } else {
        if (localStorage.getItem("userToken")) {
          setRoles(
            parseJwt(JSON.parse(localStorage.getItem("userToken") ?? "{}"))
              .roles
          );
        }
      }
    }
  }, []);

  useEffect(() => {
    dispatch(ADD_WHOLE_INSURANE(advertise?.insurances));
    staticData.pricing_list_items.map(({ en }) => {
      Object.entries(advertise).map(([key, value]) => {
        key == en &&
          pricingData.push({
            name: key,
            value: value,
          });
      });
    });

    dispatch(ADD_WHOLE_CAR_DETAILS_INFO(pricingData));
  }, []);

  // @@@___________________ use Router ___________________@@@
  const router = useRouter();

  // @@@___________________ formik onSubmit ___________________@@@
  const onSubmit = (values: any) => {
    let data = new FormData();

    if (imgsSrc.length === 1) {
      data.append("files", B64toBlob(imgsSrc[0].src));
    } else if (imgsSrc.length > 1) {
      imgsSrc.map((item: any) => {
        return data.append("files", B64toBlob(item.src));
      });
    }

    staticData.car_sale_items.map(({ name, value }) =>
      data.append(name, values[name] ? values[name] : value)
    );

    staticData.pricing_list_items.map(({ en }) => data.append(en, pricing[en]));

    data.append("status", "ثبت اولیه آگهی خودرو");
    data.append("user_name", userInfo.phone_number);
    data.append("keywords", JSON.stringify(showSearched));
    data.append("insurance", JSON.stringify(insurances));

    data.delete("brand");
    data.delete("type");
    data.delete("model");

    data.append("brand", advertise.brand);
    data.append("type", advertise.type);
    data.append("model", advertise.model);

    data.delete("mileage");
    data.append("mileage", values.mileage);
    data.delete("expire_day_count");
    data.append(
      "expire_day_count",
      advertise.expire_day_count
        ? advertise.expire_day_count
        : values.expire_day_count
    );

    data.append("car_damaged", values.car_damaged);

    let userData = {
      user_name: userInfo.phone_number,
      phone_number: userInfo.phone_number,
      last_name: values.last_name,
      first_name: values.first_name,
    };

    postAdSaleUpdateId(advertise.advertiser_id, data)
      .then(() => {
        PostAuthUserUpdate(userData).then((res) => {
          toast.success("آگهی شما پس از تایید منتشر خواهد شد");
          dispatch(REMOVE_CAR_INFO());
          router.push(`/panel/${roles?.[0]}/info`);
        });
      })
      .catch((err) => {
        toast.error("ثبت آگهی با خطا مواجه شد");
        dispatch(REMOVE_CAR_INFO());
        router.push(`/panel/${roles?.[0]}/info`);
      });
  };

  // @@@___________________ use Formik ___________________@@@
  const formik = useFormik({
    initialValues: UpdateAdSaleInitValue(advertise),
    validationSchema: carSalevalidationSchema,
    onSubmit,
    enableReinitialize: true,
    validateOnMount: true,
  });

  return (
    <div className="custom-shadow md:p-5 p-3 rounded-md mb-10">
      <h1 className="font-bold text-2xl pb-3 mb-3 border-b border-b-gray-150 text-blue text-center">
        ویرایش آگهی
      </h1>
      <div className="mt-3">
        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          {/* @@@___________________ اطلاعات خودرو ___________________@@@ */}
          <RequiredInfo
            cities={cities}
            colors={colors}
            formik={formik}
            update={true}
          />

          {/* @@@___________________ اطلاعات فردی ___________________@@@ */}
          <UserInfo formik={formik} />

          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
            {/* @@@___________________ نقشه ___________________@@@ */}
            <MapModal
              classes="h-[18rem] mt-8 mr-0 ml-auto"
              hasDistance={false}
              formik={formik}
              name={{
                lat: "location_lat",
                long: "location_long",
              }}
            />

            {advertise?.image_guids && (
              <PreviewImage
                ad_id={advertise?.advertiser_id}
                image_guids={advertise?.image_guids}
              />
            )}
          </div>

          {/* @@@___________________ اطلاعات تکمیلی ___________________@@@ */}
          <FurtherInfo
            formik={formik}
            showSearched={showSearched}
            setShowSearched={setShowSearched}
            imgsSrc={imgsSrc}
            setImgsSrc={setImgsSrc}
          />

          <button
            type="submit"
            className={`bg-blue text-white px-12 py-2 rounded-md w-fit mx-auto disabled:bg-gray-border disabled:text-gray-dark disabled:cursor-not-allowed`}
          >
            ثبت خودرو
          </button>
        </form>
      </div>
    </div>
  );
}
