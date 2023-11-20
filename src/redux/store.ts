import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-Slice";
import forgotPassSlice from "./auth/forgot-pass/forgot-pass-slice";
import loginSlice from "./auth/login/login-slice";
import registerSlice from "./auth/register/register-slice";
import sendCodeSlice from "./auth/send-code/send-code-slice";
import brandModelReducer from "./brand-model/brand-model-slice";
import carInstallmentInfoReducer from "./car-installment/car-installment-info/car-installment-info-slice";
import carInstallmentReducer from "./car-installment/car-installment/car-Installment-slice";
import editReducer from "./edit-personal-info/edit-personal-info-slice";
import exhibitorReducer from "./exhibitor-data/exhibitor-slice";
import filterReducer from "./filter/filter-slice";
import insuranceReducer from "./insurance/insurance-slice";
import mapAddressReducer from "./map-address/map-address-slice";
import pricingReducer from "./pricing/pricing-slice";
import carEngineReducer from "./vehicle-check/result/car-engine/car-engine-slice";
import carFuselagReducer from "./vehicle-check/result/car-fuselage/car-fuselage-slice";
import carInnerSystemReducer from "./vehicle-check/result/car-inner-system/car-inner-system";
import carSuspensionsSystem from "./vehicle-check/result/car-suspensions-system/car-suspensions-system";
import vehicleCheckReducer from "./vehicle-check/vehicle-check-slice";
import keywordReducer from "./keywords/keywords-slice";

export const store = configureStore({
  devTools: true,
  // process.env.NEXT_PUBLIC_APP_ENVIORMENT === "development" ? true : false,
  reducer: {
    filter: filterReducer,
    keywords: keywordReducer,
    register: registerSlice,
    auth: authSlice,
    login: loginSlice,
    forgotPass: forgotPassSlice,
    vehicleCheck: vehicleCheckReducer,
    sendCode: sendCodeSlice,
    editPersonalInfo: editReducer,
    carInnerSystem: carInnerSystemReducer,
    carFuselage: carFuselagReducer,
    carEngine: carEngineReducer,
    carSuspensionsSystem: carSuspensionsSystem,
    carInstallment: carInstallmentReducer,
    carInstallmentInfo: carInstallmentInfoReducer,
    pricing: pricingReducer,
    insurance: insuranceReducer,
    brandModel: brandModelReducer,
    mapAddress: mapAddressReducer,
    exhibitor: exhibitorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
