import { staticData } from "@/data";
import { useEffect } from "react";
import DatePickerInput from "@/attom/form@/components@/date-picker/date-picker-input";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { InputNumberSeprator } from "@/attom/form@/components@/inputs/input-number-seprator";
import SelectCustom from "@/attom/form@/components@/select@/select-custom";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";
import ImageUploader from "../form/image-uploader";

const CustomerInfo = ({ formik, imgsSrc, setImgsSrc }) => {
  useEffect(() => {
    if (formik?.values?.marital_status == "مجرد") {
      formik.setValues({
        ...formik.initialValues,
        number_of_children: 0,
      });
    }
  }, [formik.marital_status]);

  return (
    <>
      <FormInput formik={formik} label="نام متقاضی" name="name" />
      <FormInput formik={formik} label="نام‌خانوادگی متقاضی" name="family" />
      <FormInput formik={formik} label="نام پدر" name="father_name" />
   
      <DatePickerInput
        formik={formik}
        nameObject={{
          birth_date_year: "",
          birth_date_month: "",
          birth_date_day: "",
        }}
        name="birth_date_year"
        defaultValue={`${formik.values.birth_date_day}/${formik.values.birth_date_month}/${formik.values.birth_date_year}`}
      />
      <FormInput
        formik={formik}
        label="شماره شناسنامه"
        name="birth_certificate_code"
      />
      <FormInput
        formik={formik}
        label="محل صدور شناسنامه"
        name="birth_certificate_issuing_place"
      />
      <FormInput
        formik={formik}
        label="تلفن ثابت"
        name="landline_phone_number"
        type="number"
      />
      <FormInput formik={formik} label="کد پستی" name="postal_code" />

      <SelectCustom
        formik={formik}
        label="وضعیت تاهل"
        name="marital_status"
        options={staticData.marital_status}
      />

      <FormInput
        formik={formik}
        label="تعداد فرزند"
        name="number_of_children"
        type="number"
        disabled={formik?.values?.marital_status == "مجرد" ? true : false}
      />

      <SelectCustom
        formik={formik}
        label="وضعیت تملک"
        name="housing_ownership_status"
        options={staticData.housing_ownership_status}
      />

      <SelectCustom
        formik={formik}
        label="مدت بازپرداخت تسهیلات"
        name="repayment_period"
        options={staticData.loan_repayment_period}
      />

      <FormInput
        formik={formik}
        label="شماره تماس محل کار"
        name="workplace_number"
        type="tel"
      />

      <div className="grid lg:col-span-4 lg:grid-cols-4 md:col-span-2 md:grid-cols-2 col-span-1 grid-cols-1 gap-6">
        <CustomTextarea
          formik={formik}
          label="آدرس محل سکونت"
          name="residence_address"
          customClass="lg:col-span-2 md:col-span-2 col-span-1"
        />

        <CustomTextarea
          formik={formik}
          label="آدرس محل کار"
          name="work_address"
          customClass="lg:col-span-2 md:col-span-2 col-span-1"
        />
      </div>

      <FormInput formik={formik} label="شغل متقاضی" name="job" />

      <InputNumberSeprator
        formik={formik}
        label="درآمد ماهانه مستند"
        name="documented_monthly_income"
        showEndAdorMent={true}
        showEndAdorMentValue="تومان"
      />

      <InputNumberSeprator
        formik={formik}
        label="درآمد ماهانه غیر مستند"
        name="undocumented_monthly_income"
        showEndAdorMent={true}
        showEndAdorMentValue="تومان"
      />

      <InputNumberSeprator
        formik={formik}
        label="مبلغ تسهیلات درخواستی"
        name="amount_of_requested_facility"
        showEndAdorMent={true}
        showEndAdorMentValue="تومان"
      />

     
    </>
  );
};

export default CustomerInfo;
