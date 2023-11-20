"use client";
import { useAppSelector } from "src/hooks/redux-hooks";
import Stepper from "./components/stepper";
import StepOne from "./components/stepper/step-one";
import StepTwo from "./components/stepper/step-two";
import StepThree from "./components/stepper/step-three";
import { useRequest } from "@/hooks/useRequest";
import { FRONT2DB } from "@/config/url";

const PricingSteps = () => {
  const { data } = useRequest({
    method: "GP",
    url: `${FRONT2DB}/BrandModelType/Get/All`,
  });

  const { tab } = useAppSelector((state) => state.pricing);
  return (
    <>
      <div className="mb-4">
        {tab !== 3 ? (
          <h1 className="tablet:text-2xl text-xl font-bold text-center">
            در مورد
            <span className="text-blue">
              {tab == 1 ? " اطلاعات خودرو " : tab == 2 && " وضعیت بدنه خودرو "}
            </span>
            خود به ما بگویید!
          </h1>
        ) : (
          <h1 className="tablet:text-2xl text-xl font-bold text-center">
            تخمین <span className="text-blue">قیمت خودرو</span> شما
          </h1>
        )}
        {tab !== 3 && (
          <span className="block text-center mt-4 md:text-base text-sm">
            یک ارزیابی فوری دریافت کنید - لطفا جزئیات خودرو را وارد کنید.
          </span>
        )}
      </div>

      <div>
        <Stepper />
        {/* Stepper One */}
        {tab == 1 && <StepOne brandModel={data?.brandModel || []} />}

        {/* Stepper Two */}
        {tab == 2 && <StepTwo />}

        {/* Stepper Three */}
        {tab == 3 && <StepThree />}
      </div>
    </>
  );
};

export default PricingSteps;
