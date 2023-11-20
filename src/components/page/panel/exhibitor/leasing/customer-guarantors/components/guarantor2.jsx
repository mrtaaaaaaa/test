import { useState } from "react";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import ImageUploader from "../../req-registration/components/form/image-uploader";
import SelectCustom from "@/attom/form@/components@/select@/select-custom";
import { staticData } from "@/data";
import DatePickerInput from "@/attom/form@/components@/date-picker/date-picker-input";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";

const GuarantorSecond = ({ formik }) => {
  const [imgSanaDocument2, setImgSanaDocument2] = useState([]);
  const [imgNationalDocument2, setImgNationalDocument2] = useState([]);
  const [imgBirthCertificate2, setImgBirthCertificate2] = useState([]);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-16">
      <FormInput formik={formik} label="نام ضامن دوم" name="name2" />
      <FormInput formik={formik} label="نام‌خانوادگی ضامن دوم" name="family2" />
      <FormInput
        formik={formik}
        label="موبایل ضامن دوم"
        name="mobile_number2"
      />
      <FormInput formik={formik} label="کدملی ضامن دوم" name="national_code2" />
      <SelectCustom
        formik={formik}
        label="نسبت ضامن دوم"
        name="relative2"
        options={staticData.relatives}
      />
      <FormInput formik={formik} label="شغل ضامن دوم" name="job2" />
      <FormInput
        formik={formik}
        label="محل صدور شناسنامه"
        name="birth_certificate_issuing_place2"
      />
      <FormInput
        formik={formik}
        label=" شماره شناسنامه"
        name="birth_certificate_code2"
      />
      <DatePickerInput
        formik={formik}
        nameObject={{
          birth_date_year2: "",
          birth_date_month2: "",
          birth_date_day2: "",
        }}
        name="birth_date_year2"
      />
      <FormInput
        formik={formik}
        label="تلفن ثابت"
        name="landline_phone_number2"
        type="number"
      />
      <FormInput formik={formik} label="کد پستی" name="postal_code2" />
      <FormInput formik={formik} label="نام پدر" name="father_name2" />
      <CustomTextarea
        customClass="md:col-span-2 col-span-1"
        row="6"
        formik={formik}
        label="آدرس محل کار"
        name="workplace_number2"
      />
      <CustomTextarea
        customClass="md:col-span-2 col-span-1"
        row="6"
        formik={formik}
        label="آدرس محل سکونت"
        name="residence_address2"
      />

      <div className="lg:col-span-4 md:col-span-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        <ImageUploader
          imgsSrc={imgSanaDocument2}
          setImgsSrc={setImgSanaDocument2}
          formik={formik}
          name="sana_document2"
          imageCount="1"
          title="بارگذاری تصویر سامانه ثنا"
        />
        <ImageUploader
          imgsSrc={imgNationalDocument2}
          setImgsSrc={setImgNationalDocument2}
          formik={formik}
          name="national-document2"
          imageCount="1"
          title="تصویر کارت ملی"
        />
        <ImageUploader
          imgsSrc={imgBirthCertificate2}
          setImgsSrc={setImgBirthCertificate2}
          formik={formik}
          name="birth_certificate2"
          imageCount="1"
          title="بارگذاری تصویر شناسنامه"
        />
      </div>
    </div>
  );
};

export default GuarantorSecond;
