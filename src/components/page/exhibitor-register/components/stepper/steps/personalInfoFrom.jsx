import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import SelectCustom from "@/attom/form@/components@/select@/select-custom";
import { AUTH_URL, FRONT2DB } from "@/config/url";
import { useRequest } from "@/hooks/useRequest";
import httpService from "@/services/http-service";
import {
  regexAddress,
  regexNationalCode,
  regexPersianCharacter,
  regexPhoneNumber,
  regexPostalCode,
} from "@/utils/regex";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

const PersonalInfoForm = ({ handleNext,setShowStepper }) => {
  const {userInfo} = JSON.parse(localStorage.getItem("userInfo"));

  let initialValues = {
    first_name: "",
    last_name: "",
    national_code: "",
    city: "",
    phone_number: "",
    postal_code: "",
    address: "",
  };
 
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("نام الزامی است.")
      .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),

    last_name: Yup.string()
      .required(" نام خانوادگی الزامی است.")
      .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),

    national_code: Yup.string()
      .required(" کد ملی الزامی است.")
      .matches(regexNationalCode, "کدملی وارد شده صحیح نیست."),

    city: Yup.string()
      .required("شهر الزامی است.")
      .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),

    phone_number: Yup.string()
      .required("شماره تماس الزامی است.")
      .matches(regexPhoneNumber, ".شماره تماس وارد شده صحیح نیست"),

    postal_code: Yup.string()
      .required("کد پستی الزامی است.")
      .matches(regexPostalCode, "کد پستی وارد شده صحیح نیست."),

    address: Yup.string()
      .required("آدرس الزامی است.")
      .matches(regexAddress, "مقدار وارد شده صحیح نیست."),
  });

  const onSubmit = (values) => {
    const exhibitorData = localStorage.getItem("exhibitor_token");

    let config = {
      Authorization: exhibitorData,
    };

    let postData = {
      exhibition_manager_phone_number: String(values.phone_number),
      exhibition_manager_name: values.first_name,
      exhibition_manager_family: values.last_name,
      exhibition_city: values.city,
      exhibition_manager_national_code: String(values.national_code),
      exhibition_postal_code: String(values.postal_code),
      exhibition_address: values.address,
      exhibition_status: String(4),
    };

    httpService
      .post(
        `${AUTH_URL}/Auth/${userInfo.phone_number}/Exhibitor/Update`,
        postData,
        config
      )
      .then((res) => {
        handleNext();
        setStatus({});
        setShowStepper(true)
      })
      .catch((err) => {
        setStatus(true);
        setShowStepper(false)
        toast.error("ثبت اطلاعات با خطا مواجه شد.");

      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const { data: cities } = useRequest({
    method: "GET",
    url: `${FRONT2DB}/City/Get/All`,
  });

  return (
    <div className="p-4">
      <h3 className="block font-bold border-b border-b-gray-200  pb-3 my-4 text-gray-900">
        اطلاعات فردی
      </h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
          <FormInput
            formik={formik}
            label="نام (مدیر نمایشگاه)"
            name="first_name"
            placeholder="امیررضا "
          />

          <FormInput
            formik={formik}
            label=" نام‌خانوادگی (مدیر نمایشگاه)"
            name="last_name"
            placeholder="سیفی "
          />

          <FormInput
            type={"number"}
            formik={formik}
            label="کدملی"
            name="national_code"
            placeholder="146082544"
            classes="text-left ltr"
          />

          <SelectCustom
            formik={formik}
            name="city"
            label="استان"
            options={cities?.cities}
          />

          <FormInput
            type={"number"}
            formik={formik}
            label="کدپستی"
            name="postal_code"
            placeholder="0912111111"
            classes="text-left ltr"
          />

          <FormInput
            type={"number"}
            formik={formik}
            label="شماره تماس (مدیر نمایشگاه)"
            name="phone_number"
            placeholder="0912111111"
            classes="text-left ltr"
          />

          {/* <div className="lg:col-span-3 md:col-span-2 col-span-1">
            <CustomTextarea
              formik={formik}
              label="آدرس نمایشگاه"
              name="address"
              placeholder="آدرس"
              customClass="w-full"
            />
          </div> */}
        </div>

        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="bg-blue  rounded-md px-8 py-2 text-white"
          >
            مرحله بعد
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
