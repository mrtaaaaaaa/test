"use client";

import { img } from "@/data";
import { REMOVE_CONTENT } from "@/redux/car-installment/car-installment/car-Installment-slice";
import { useEffect } from "react";
import { useAppDispatch } from "src/hooks/redux-hooks";
import CardInstallment from "./components/calculator/card-installment";
import InstallmentFAQ from "./components/faq/installment-faq";
import Servicess from "./components/services";

const CarInstallmentPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(REMOVE_CONTENT());
  }, []);

  return (
    <>
      <div
        className="mx-auto lg:p-10 p-5 flex items-center md:justify-end justify-center rounded-3xl car-installment-bg"
        style={{
          background: `url(${img.installment_banner.src}) no-repeat center top`,
          backgroundSize: "contain",
        }}
      >
        <div className="lg:ml-24 md:w-fit w-full">
          <CardInstallment />
        </div>
      </div>

      <Servicess />
      <InstallmentFAQ />
    </>
  );
};

export default CarInstallmentPage;
