import DatePickerInput from "@/attom/form@/components@/date-picker/date-picker-input";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { SelectBox } from "@/attom/form@/components@/select@/select-box";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";
import { staticData } from "@/data";

const GuarantorsInfo = ({ formik }: any) => {
  let inputNum: any = {
    1: "اول",
    2: "دوم",
    3: "سوم",
    4: "چهارم",
    5: "پنجم",
    6: "ششم",
    7: "هفتم",
    8: "هشتم",
    9: "نهم",
    10: "دهم",
  };
  return (
    <div className="lg:col-span-4 md:col-span-2 col-span-1 mt-6 border-b border-b-gray-200 pb-4">
      <h2 className="font-bold text-xl mb-4 text-blue">اطلاعات ضامن‌ها</h2>

      {formik?.values?.guarantors?.map((item: any, index: number) => (
        <>
          <h3 className="text-gray-500 font-medium my-6">
            {index + 1}- ضامن {inputNum[index + 1]}
          </h3>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
            <FormInput
              formik={formik}
              label={`نام ضامن ${inputNum[index + 1]}`}
              name={`guarantors[${index}].name`}
            />
            <FormInput
              formik={formik}
              label={`نام‌خانوادگی ضامن ${inputNum[index + 1]}`}
              name={`guarantors[${index}].family`}
            />
            <FormInput
              formik={formik}
              label={`کدملی ضامن ${inputNum[index + 1]}`}
              name={`guarantors[${index}].national_code`}
            />
            <FormInput
              formik={formik}
              label={`موبایل ضامن ${inputNum[index + 1]}`}
              name={`guarantors[${index}].mobile_number`}
            />
            <SelectBox
              formik={formik}
              label={`نسبت ضامن ${inputNum[index + 1]}`}
              name={`guarantors[${index}].relative`}
              options={staticData.relatives}
              showEndAdorMent={true}
            />
            <FormInput
              formik={formik}
              label={`شغل ضامن ${inputNum[index + 1]}`}
              name={`guarantors[${index}].job`}
            />

            <FormInput
              formik={formik}
              label="محل صدور شناسنامه"
              name={`guarantors[${index}].birth_certificate_issuing_place`}
            />
            <FormInput
              formik={formik}
              label="شماره شناسنامه"
              name={`guarantors[${index}].birth_certificate_code`}
            />

            <DatePickerInput
              formik={formik}
              nameObject={{
                "guarantors[1].birth_date_year": "",
                "guarantors[1].birth_date_month": "",
                "guarantors[1].birth_date_day": "",
              }}
              name={`guarantors[${index}].birth_date_year`}
              defaultValue={`${formik.values.guarantors[index]?.birth_date_day}/${formik.values.guarantors[index]?.birth_date_month}/${formik.values.guarantors[index]?.birth_date_year}`}
            />
            <FormInput
              formik={formik}
              label="تلفن ثابت"
              name={`guarantors[${index}].landline_phone_number`}
            />
            <FormInput
              formik={formik}
              label="کد پستی"
              name={`guarantors[${index}].postal_code`}
            />
            <FormInput
              formik={formik}
              label="نام پدر"
              name={`guarantors[${index}].father_name`}
            />
            <FormInput
              formik={formik}
              label="شماره تماس محل کار"
              name={`guarantors[${index}].workplace_number`}
            />
            <CustomTextarea
              customClass="lg:col-span-3 md:col-span-2 col-span-1"
              formik={formik}
              label="آدرس"
              name={`guarantors[${index}].residence_address`}
              row="5"
            />
          </div>
        </>
      ))}
    </div>
  );
};

export default GuarantorsInfo;
