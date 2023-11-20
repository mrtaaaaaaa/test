import DatePickerInput from "@/attom/form@/components@/date-picker/date-picker-input";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { SelectBox } from "@/attom/form@/components@/select@/select-box";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";
import { staticData } from "@/data";

const GuarantorsInfo = ({ formik }) => {
  return (
    <div className="lg:col-span-4 md:col-span-2 col-span-1 mt-6 border-b border-b-gray-200 pb-4">
      <h2 className="font-bold text-xl mb-4 text-blue">اطلاعات ضامن‌ها</h2>

      <>
        <h3 className="text-gray-500 font-medium mb-6">1- ضامن اول</h3>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          <FormInput
            formik={formik}
            label="نام ضامن اول"
            name="guarantors[0].name"
          />
          <FormInput
            formik={formik}
            label="نام‌خانوادگی ضامن اول"
            name="guarantors[0].family"
          />
          <FormInput
            formik={formik}
            label="کدملی ضامن اول"
            name="guarantors[0].national_code"
          />
          <FormInput
            formik={formik}
            label="موبایل ضامن اول"
            name="guarantors[0].mobile_number"
          />
          <SelectBox
            formik={formik}
            label="نسبت ضامن اول"
            name="guarantors[0].relative"
            options={staticData.relatives}
            showEndAdorMent={true}
            showEndAdorMentValue="تست"
          />
          <FormInput
            formik={formik}
            label="شغل ضامن اول"
            name="guarantors[0].job"
          />
          <FormInput
            formik={formik}
            label="محل صدور شناسنامه"
            name="guarantors[0].birth_certificate_issuing_place"
          />
          <FormInput
            formik={formik}
            label="شماره شناسنامه"
            name="guarantors[0].birth_certificate_code"
          />
          <DatePickerInput
            formik={formik}
            nameObject={{
              "guarantors[0].birth_date_year": "",
              "guarantors[0].birth_date_month": "",
              "guarantors[0].birth_date_day": "",
            }}
            name="guarantors[0].birth_date_year"
          />
          <FormInput
            formik={formik}
            label="تلفن ثابت"
            name="guarantors[0].landline_phone_number"
          />
          <FormInput
            formik={formik}
            label="کد پستی"
            name="guarantors[0].postal_code"
          />
          <FormInput
            formik={formik}
            label="نام پدر"
            name="guarantors[0].father_name"
          />
          <FormInput
            formik={formik}
            label="شماره تماس محل کار"
            name="guarantors[0].workplace_number"
          />
          <CustomTextarea
            customClass="lg:col-span-3 md:col-span-2 col-span-1"
            formik={formik}
            label="آدرس"
            name="guarantors[0].residence_address"
            row="5"
          />
        </div>
      </>
      <>
        <h3 className="text-gray-500 font-medium my-6">2- ضامن دوم</h3>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
          <FormInput
            formik={formik}
            label="نام ضامن دوم"
            name="guarantors[1].name"
          />
          <FormInput
            formik={formik}
            label="نام‌خانوادگی ضامن دوم"
            name="guarantors[1].family"
          />
          <FormInput
            formik={formik}
            label="کدملی ضامن دوم"
            name="guarantors[1].national_code"
          />
          <FormInput
            formik={formik}
            label="موبایل ضامن دوم"
            name="guarantors[1].mobile_number"
          />
          <SelectBox
            formik={formik}
            label="نسبت ضامن دوم"
            name="guarantors[1].relative"
            options={staticData.relatives}
            showEndAdorMent={true}
          />
          <FormInput
            formik={formik}
            label="شغل ضامن دوم"
            name="guarantors[1].job"
          />

          <FormInput
            formik={formik}
            label="محل صدور شناسنامه"
            name="guarantors[1].birth_certificate_issuing_place"
          />
          <FormInput
            formik={formik}
            label="شماره شناسنامه"
            name="guarantors[1].birth_certificate_code"
          />
          <DatePickerInput
            formik={formik}
            nameObject={{
              "guarantors[1].birth_date_year": "",
              "guarantors[1].birth_date_month": "",
              "guarantors[1].birth_date_day": "",
            }}
            name="guarantors[1].birth_date_year"
          />
          <FormInput
            formik={formik}
            label="تلفن ثابت"
            name="guarantors[1].landline_phone_number"
          />
          <FormInput
            formik={formik}
            label="کد پستی"
            name="guarantors[1].postal_code"
          />
          <FormInput
            formik={formik}
            label="نام پدر"
            name="guarantors[1].father_name"
          />
          <FormInput
            formik={formik}
            label="شماره تماس محل کار"
            name="guarantors[1].workplace_number"
          />
          <CustomTextarea
            customClass="lg:col-span-3 md:col-span-2 col-span-1"
            formik={formik}
            label="آدرس"
            name="guarantors[1].residence_address"
            row="5"
          />
        </div>
      </>
    </div>
  );
};

export default GuarantorsInfo;
