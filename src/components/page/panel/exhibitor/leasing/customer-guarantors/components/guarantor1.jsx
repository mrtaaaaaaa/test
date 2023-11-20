import { useState } from "react";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import SelectCustom from "@/attom/form@/components@/select@/select-custom";
import { staticData } from "@/data";
import DatePickerInput from "@/attom/form@/components@/date-picker/date-picker-input";
import ImageUploader from "../../req-registration/components/form/image-uploader";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";

const GuarantorOne = ({ formik }) => {
  const [imgSanaDocument1, setImgSanaDocument1] = useState([]);
  const [imgNationalDocument1, setImgNationalDocument1] = useState([]);
  const [imgBirthCertificate1, setImgBirthCertificate1] = useState([]);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
      <FormInput formik={formik} label="نام ضامن اول" name="name1" />
      <FormInput formik={formik} label="نام‌خانوادگی ضامن اول" name="family1" />
      <FormInput
        formik={formik}
        label="موبایل ضامن اول"
        name="mobile_number1"
      />
      <FormInput formik={formik} label="کدملی ضامن اول" name="national_code1" />
      <SelectCustom
        formik={formik}
        label="نسبت ضامن اول"
        name="relative1"
        options={staticData.relatives}
      />
      <FormInput formik={formik} label="شغل ضامن اول" name="job1" />
      <FormInput
        formik={formik}
        label="محل صدور شناسنامه"
        name="birth_certificate_issuing_place1"
      />
      <FormInput
        formik={formik}
        label=" شماره شناسنامه"
        name="birth_certificate_code1"
      />
      <DatePickerInput
        formik={formik}
        nameObject={{
          birth_date_year1: "",
          birth_date_month1: "",
          birth_date_day1: "",
        }}
        name="birth_date_year1"
      />
      <FormInput
        formik={formik}
        label="تلفن ثابت"
        name="landline_phone_number1"
        type="number"
      />
      <FormInput formik={formik} label="کد پستی" name="postal_code1" />
      <FormInput formik={formik} label="نام پدر" name="father_name1" />
      {/* <CustomTextarea
        customClass="md:col-span-2 col-span-1"
        row="6"
        formik={formik}
        label="آدرس محل کار"
        name="workplace_number1"
      /> */}
      <CustomTextarea
        customClass="md:col-span-2 col-span-1"
        row="6"
        formik={formik}
        label="آدرس محل سکونت"
        name="residence_address1"
      />

      <div className="lg:col-span-4 md:col-span-2 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        <ImageUploader
          imgsSrc={imgSanaDocument1}
          setImgsSrc={setImgSanaDocument1}
          formik={formik}
          name="sana_document1"
          imageCount="1"
          title="بارگذاری تصویر سامانه ثنا"
        />
        <ImageUploader
          imgsSrc={imgNationalDocument1}
          setImgsSrc={setImgNationalDocument1}
          formik={formik}
          name="national-document1"
          imageCount="1"
          title="تصویر کارت ملی"
        />
        <ImageUploader
          imgsSrc={imgBirthCertificate1}
          setImgsSrc={setImgBirthCertificate1}
          formik={formik}
          name="birth_certificate1"
          imageCount="1"
          title="بارگذاری تصویر شناسنامه"
        />
      </div>
    </div>
  );
};

export default GuarantorOne;
