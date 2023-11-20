"use client";
import { CircularProgress } from "@mui/material";
import httpService from "@/services/http-service";
import { FRONT2MESSAGE } from "@/config/url";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  SET_ERROR_AREA,
  SET_ERROR_BRAND,
  SET_ERROR_YEAR,
} from "@/redux/vehicle-check/vehicle-check-slice";
import { NumberSeprator } from "@/utils/number-seprator";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux-hooks";
import { checkExistWindow } from "@/utils/check-exist-window";
import { parseJwt } from "@/utils/jwt";

const VehicleCheckFactor = () => {
  const [roles, setRoles] = useState<any[]>([]);

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

  const {
    brand_and_model,
    year_of_manufacture,
    vehicle_check_area,
    payment,
    error,
  } = useSelector((state) => state.vehicleCheck);

  const [loading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  let str = typeof window !== "undefined" ? window.location.pathname : "";
  let numOfComponents = str.split("/")[2];

  let ArrayOfNumComponents =
    numOfComponents == 1
      ? [1]
      : numOfComponents == 3
      ? [1, 2, 3]
      : [1, 2, 3, 4, 5];

  let brand = Object.values(brand_and_model);
  let year = Object.values(year_of_manufacture);
  let vehicleArea = Object.values(vehicle_check_area);
  let vehicle_check_fee_value = Object.values(payment);

  let totalPayment;
  if (payment) {
    totalPayment = Object.values(payment)?.reduce((a, b) => +a + +b, 0);
  }
  let discount = Math.ceil(
    numOfComponents == 3
      ? (20 / 100) * totalPayment
      : numOfComponents == 5 && (35 / 100) * totalPayment
  );
  let pay = totalPayment - discount;

  let showData = brand.map((item, index) => {
    return {
      Order: index + 1,
      brand_and_model: item,
      year_of_manufacture: year[index]?.toString(),
      vehicle_check_area: vehicleArea[index],
      vehicle_check_fee: vehicle_check_fee_value[index],
      discount_percentage_applied:
        numOfComponents == 3 ? 20 : numOfComponents == 5 ? 35 : 0,
    };
  });

  const router = useRouter();

  // Error list
  let brandError = Object.values(error.brand);
  let yearError = Object.values(error.year);
  let areaError = Object.values(error.area);

  // Payment Handler
  const submitHandler = () => {
    if (
      brand.length === +numOfComponents &&
      year.length === +numOfComponents &&
      vehicleArea.length === +numOfComponents
    ) {
      let data = new FormData();

      data.append("user_name", "09190979722");
      data.append("payment_amount", pay);
      data.append("payment_tracking_code", Math.floor(Math.random() * 100000));
      data.append("payment_timestamp", "");
      data.append("VehicleChecks", JSON.stringify(showData));
      // setIsLoading(true);

      httpService
        .post(`${FRONT2MESSAGE}/VehicleCheck`, data)
        .then(() => {
          setIsLoading(false);
          toast.success("درخواست‌های کارشناسی شما با موفقیت ثبت شد");
          router.push(`/panel/${roles?.[0]}/vehicle-check`);
        })
        .catch(() => {
          setIsLoading(false);
          toast.error("متاسفانه خطایی در ثبت درخواست شما بوجود آمده‌است");
        });
    } else {
      let brandErrorArray = brandError.length ? [error.brand] : [];
      let yearErrorArray = yearError.length ? [error.year] : [];
      let areaErrorArray = areaError.length ? [error.area] : [];

      ArrayOfNumComponents.map((item) => {
        error.brand[item] == undefined &&
          brandErrorArray.push({ [item]: true });
        error.year[item] == undefined && yearErrorArray.push({ [item]: true });
        error.area[item] == undefined && areaErrorArray.push({ [item]: true });
      });

      dispatch(SET_ERROR_BRAND(Object.assign({}, ...brandErrorArray)));
      dispatch(SET_ERROR_YEAR(Object.assign({}, ...yearErrorArray)));
      dispatch(SET_ERROR_AREA(Object.assign({}, ...areaErrorArray)));
    }
  };

  return (
    <div className="custom-shadow border rounded-lg p-4 border-[#F3F3F3]">
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 justify-between items-center">
        <div>
          <span>هزینه کارشناسی:</span>
          <b>{NumberSeprator(totalPayment)}</b>
          <small> تومان </small>
        </div>

        <div>
          <span>مبلغ تخفیف:</span>
          <b>{!isNaN(discount) && NumberSeprator(discount)}</b>
          <small> تومان </small>
        </div>

        <div>
          <span>مبلغ قابل پرداخت:</span>
          <b>{!isNaN(pay) && NumberSeprator(pay)}</b>
          <small> تومان </small>
        </div>

        <div>
          {loading ? (
            <button className="bg-blue  cursor-not-allowed text-white px-3 py-1 rounded">
              <CircularProgress />
            </button>
          ) : (
            <button
              className="bg-blue  text-white disabled:bg-gray-400 disabled:cursor-not-allowed px-3 py-1 rounded"
              onClick={submitHandler}
            >
              پرداخت
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleCheckFactor;
