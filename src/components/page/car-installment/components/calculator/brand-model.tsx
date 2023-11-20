import DynamicBrandModal from "@/attom/modals/brand-model-of-car/dynamic-brand-modal";
import { SET_IS_MULTIPLE } from "@/redux/brand-model/brand-model-slice";
import { ADD_BRAND_MODEL } from "@/redux/car-installment/car-installment/car-Installment-slice";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "src/hooks/redux-hooks";

const BrandModel = () => {
  const carInstallment = useAppSelector<any>((state) => state.carInstallment);
  const dispatch = useAppDispatch();

  const { brand_models } = useAppSelector((state) => state.carInstallment);
  // State for showing multiple brands
  const [showBrand, setShowBrand] = useState(0);

  // Adding new brand
  const newBrandAndModelHandler = () => {
    setShowBrand((prv) => (prv == 2 ? 2 : prv + 1));
  };

  useEffect(() => {
    dispatch(SET_IS_MULTIPLE(false));
  }, []);

  const customHandleChange = (e, indexOfBrand) => {
    let array = [];
    array = carInstallment.brand_models;
    dispatch(ADD_BRAND_MODEL({ ...array, [indexOfBrand]: e.target.value }));
  };
  return (
    <div className="flex flex-col ml-5 h-full pb-3">
      <span className="block mb-2">برند و مدل</span>
      <DynamicBrandModal
        indexOfBrand={1}
        customHandleChange={customHandleChange}
        mainValue={Object.entries(brand_models)}
      />

      {carInstallment.brandModelError == "true" && (
        <span>انتخاب الزامی است</span>
      )}
      <div className="mt-3">
        {" "}
        {(showBrand == 1 || showBrand == 2) && (
          <DynamicBrandModal
            indexOfBrand={2}
            customHandleChange={customHandleChange}
            mainValue={Object.entries(brand_models)}
          />
        )}
      </div>
      <div className="mt-3">
        {" "}
        {showBrand == 2 && (
          <DynamicBrandModal
            indexOfBrand={3}
            customHandleChange={customHandleChange}
            mainValue={Object.entries(brand_models)}
          />
        )}
      </div>

      <button
        className="text-xs text-gray-400 mt-5 text-center border-b border-gray-400 w-fit mx-auto flex gap-1 items-center pb-1 disabled:cursor-not-allowed"
        disabled={showBrand == 2 ? true : false}
        onClick={newBrandAndModelHandler}
      >
        <BsPlus size={17} />
        انتخاب برند و مدل خودرویی دیگر
      </button>
    </div>
  );
};

export default BrandModel;
