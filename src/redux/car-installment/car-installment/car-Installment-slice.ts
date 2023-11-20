const { createSlice } = require("@reduxjs/toolkit");
import { initialState } from "./initial-state";
import { InitialType } from "./initial-type";

const carInstallment = createSlice({
  name: "carInstallment",
  initialState,
  reducers: {
    ADD_MONTH: (state: InitialType, { payload }: any) => {
      state.installments_duration = payload.month;
      state.number_of_installment = payload.number_of_installment;
      state.marketing_percentage = payload.marketing_percentage;
      state.facility_interest_percentage = payload.facility_interest_percentage;
    },
    ADD_AMOUNT: (state: InitialType, { payload }: any) => {
      // مبلغ درخواستی وام
      state.loan_amount = +payload;
    },
    CALCULATE_CHECK: (state: InitialType, { payload }: any) => {
      let tashilat = +payload * 0.6;

      // مبلغ پیش پرداخت
      state.loan_advance =
        +payload * 0.4 + state.marketing_percentage * tashilat;

      //  مبلغ تسهیلات
      state.facility_amount = tashilat;

      state.monthly_installment =
        Math.round(
          Math.floor(state.facility_interest_percentage * tashilat + tashilat) /
            state.installments_duration /
            1000
        ) * 1000;

      //  سود تسهیلات
      state.facility_interest = Math.floor(
        state.facility_interest_percentage * tashilat
      );

      // کل بازپرداخت
      state.refund_total = Math.floor(
        state.facility_interest_percentage * tashilat + tashilat
      );

      // تقسیم کل بازپرداخت به تعداد افساط
      let refund_duration_month =
        Math.floor(
          (state.facility_interest_percentage * tashilat + tashilat) /
            state.number_of_installment /
            1000
        ) * 1000;

      // مبلغ چک هر ماه بجز ماه آخر
      state.check_installments_monthly = refund_duration_month;

      let total = Math.floor(
        state.facility_interest_percentage * tashilat + tashilat
      );

      state.last_check =
        total - refund_duration_month * (state.number_of_installment - 1);
    },
    FORM_CHANGE: (state: InitialType, { payload }: any) => {
      state.showFactor = payload;
    },
    ADD_BRAND_MODEL: (state: InitialType, { payload }: any) => {
      state.brand_models = payload;
    },
    SET_BRANDMODEL_ERROR: (state: InitialType, { payload }: any) => {
      state.brandModelError = payload;
    },
    SET_LEASING_ID: (state: InitialType, { payload }: any) => {
      state.leasing_id = payload;
    },
    SET_CURRENT_STEP: (state: InitialType, { payload }: any) => {
      state.current_step = payload;
    },
    SET_ADVERTISE_ID: (state: InitialType, { payload }: any) => {
      state.advertiser_id = payload.advertiser_id;
      state.ad_code = payload.ad_code;
    },
    REMOVE_CONTENT: (state: InitialType, { payload }: any) => {
      // بازپرداخت به ماه
      state.installments_duration = 6;

      // مبلغ درخواستی - مبلغ وام
      state.loan_amount = 0;

      // کل بازپرداخت
      state.refund_total = 0;

      // مبلغ تسهیلات
      state.facility_amount = 0;

      // تعداد اقساط
      state.number_of_installment = 2;

      // درصد سود تسهیلات
      state.facility_interest_percentage = 0.09852300242;

      // سود تسهیلات
      state.facility_interest = 0;

      // درصد بازاریابی
      state.marketing_percentage = 0.08;

      // مبلغ چک بجز چک آخر
      state.check_installments_monthly = 0;

      // مبلغ چک آخر
      state.last_check = 0;

      // پیش پرداخت
      state.loan_advance = 0;

      state.showFactor = true;
      state.leasing_id = "";
      state.brand_models = [];
      state.brand = "";
      state.model = "";
      state.brandModelError = "";
      state.current_step = 1;
      state.advertiser_id = "";
      state.ad_code = "";
    },
    ADD_ONE_BRAND: (state: InitialType, { payload }: any) => {
      state.brand = payload;
      state.model = payload;
    },
  },
});

export const {
  ADD_MONTH,
  ADD_AMOUNT,
  ADD_FACTOR,
  FORM_CHANGE,
  ADD_BRAND_MODEL,
  SET_BRANDMODEL_ERROR,
  SET_LEASING_ID,
  SET_CURRENT_STEP,
  SET_ADVERTISE_ID,
  REMOVE_CONTENT,
  ADD_ONE_BRAND,
  CALCULATE_CHECK,
} = carInstallment.actions;

export default carInstallment.reducer;
