import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { checkIndexName } from "@/utils/check-index-name";
import { Num2persian } from "@/utils/num2persian";
import { NumberSeprator } from "@/utils/number-seprator";
import { useState } from "react";
import ImageUploader from "../../req-registration/components/form/image-uploader";

const UploadCheck = ({ formik, checkTemplate, name, hasBack, index, pay_to, check_national_id }: any) => {
  const [imgCheck, setImgCheck] = useState([]);
  const [imgBackCheck, setImgBackCheck] = useState([]);
  

  return (
    <div className="border border-gray-200 rounded-lg lg:p-8 p-4 mt-4">
      <span className="font-bold text-lg text-gray-900">
        اطلاعات چک {checkIndexName(index)}
      </span>
      <div className="grid lg:grid-cols-6 md:grid-cols-2 grid-cols-1 gap-4 mt-4 border-b border-b-gray-150 pb-4">
        <div>
          <span className="text-xs text-gray-400 block">تاریخ چک به عدد</span>
          <span className="text-sm font-medium mt-1">
            {checkTemplate?.date_in_number}
          </span>
        </div>
        <div className="md:col-span-2">
          <span className="text-xs text-gray-400 block">تاریخ چک به حروف</span>
          <span className="text-sm font-medium mt-1">
            {checkTemplate?.date_in_letter}
          </span>
        </div>
        <div>
          <span className="text-xs text-gray-400 block">
            مبلغ چک به <span className="font-light">(ریال)</span>
          </span>
          <span className="text-sm font-medium mt-1">
            {NumberSeprator(checkTemplate?.amount_in_number)}{" "}
            <span className="font-light">(ریال)</span>
          </span>
        </div>
        <div className="md:col-span-2">
          <span className="text-xs text-gray-400 block">مبلغ چک به حروف</span>
          <span className="text-sm font-medium mt-1">
            {Num2persian(checkTemplate?.amount_in_number)}{" "}
            <span className="text-sm "> ریال </span>
          </span>
        </div>

        <div className="md:col-span-2">
          <span className="text-xs text-gray-400 block">در وجه</span>
          <span className="text-sm font-medium mt-1">
            {pay_to}
          </span>
        </div>

        <div className="md:col-span-2">
          <span className="text-xs text-gray-400 block">شناسه ملی</span>
          <span className="text-sm font-medium mt-1">
            {check_national_id}
          </span>
        </div>

        <div className="">
          <span className="text-xs text-gray-400 block">بابت</span>
          <span className="text-sm font-medium mt-1">اخذ تسهیلات</span>
        </div>

        <div className="">
          <span className="text-xs text-gray-400 block">شرح</span>
          <span className="text-sm font-medium mt-1">خرید خودرو</span>
        </div>
      </div>

      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 lg:w-1/2 mt-4">
            <FormInput
              formik={formik}
              label={"شناسه صیادی"}
              name={`${name}[${index}].sayadi_id`}
            />
            <FormInput
              formik={formik}
              label={"نام بانک"}
              name={`${name}[${index}].bank`}
            />
            <FormInput
              formik={formik}
              label={"شعبه بانک"}
              name={`${name}[${index}].bank_branch`}
            />
            <FormInput
              formik={formik}
              label={"شماره چک"}
              type="text"
              name={`${name}[${index}].check_no`}
            />
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
            <ImageUploader
              className="h-[12rem]"
              setImgsSrc={setImgCheck}
              imgsSrc={imgCheck}
              title={`بارگذاری تصویر چک ${checkIndexName(index)}`}
              name={checkTemplate.order}
              formik={formik}
              imageCount={1}
            />

            {hasBack && (
              <ImageUploader
                className="h-[12rem]"
                setImgsSrc={setImgBackCheck}
                imgsSrc={imgBackCheck}
                title={`بارگذاری تصویر پشت چک ${checkIndexName(index)}`}
                name={checkTemplate.order_back}
                formik={formik}
                imageCount={1}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadCheck;
