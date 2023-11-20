"use client";
import CustomSwitch from "@/attom/form@/components@/switch/switch";
import { FRONT2DB } from "@/config/url";
import { staticData } from "@/data";
import { SET_RESULT, SET_TAB } from "@/redux/pricing/pricing-slice";
import httpService from "@/services/http-service";
import { LinearProgress } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";

const StepTwo = () => {
  let pricing = useAppSelector((state) => state.pricing);
  const [status, setStatus] = useState({
    loading: null,
    error: null,
  });

  const dispatch = useAppDispatch();

  const nextStepHandler = () => {
    setStatus({ loading: true, error: false });
    let copy = { ...pricing };
    delete copy.tab;

    httpService
      .post(`${FRONT2DB}/Pricing`, copy)
      .then((res) => {
        setStatus({ ...status, loading: false });
        dispatch(
          SET_RESULT({
            estimate: res.data["estimate price"]["estimated"],
            lower_estimate: res.data["estimate price"]["lower_estimated"],
            upper_estimate: res.data["estimate price"]["upper_estimated"],
          })
        );
        dispatch(SET_TAB(3));
      })
      .catch(() => {
        setStatus({ loading: false, error: true });
      });
  };

  const prevStepHandler = () => {
    dispatch(SET_TAB(1));
  };

  return (
    <>
      <div className="border border-blue-200 lg:p-11 md:p-6 p-4 rounded-lg xl:w-8/12 lg:w-10/12 mx-auto">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          {staticData.pricing_list_items.map(({ name, en }) => (
            <CustomSwitch label={name} name={en} />
          ))}
        </div>
      </div>
      <div className="mt-20 border-t border-t-blue-200 pt-4 xl:w-8/12 lg:w-10/12 mx-auto flex gap-4 justify-center">
        <button
          className="bg-white py-3 lg:px-12 px-4 lg:w-auto w-fit rounded-lg border font-medium border-gray-dark text-gray-dark outline-none"
          onClick={prevStepHandler}
        >
          مرحله قبل
        </button>
        <button
          className={`bg-blue text-white py-3 lg:px-24 px-4 lg:w-auto w-fit rounded-lg font-medium outline-none ${
            status.loading && " cursor-not-allowed"
          }`}
          onClick={nextStepHandler}
          disabled={status.loading ? true : false}
        >
          تخمین قیمت خودرو
          {status.loading && <LinearProgress />}
        </button>
      </div>
      {status.error && (
        <span className="block text-center text-red-500 text-sm mt-4">
          متاسفانه خطایی رخ داده است.
        </span>
      )}
    </>
  );
};

export default StepTwo;
