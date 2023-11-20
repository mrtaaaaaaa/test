import { staticData } from "@/data";
import {
  regexAddress,
  regexNumber,
  regexPersianCharacter,
  regexPostalCode,
} from "@/utils/regex";
import * as Yup from "yup";

// @@@___________________ Formik validationSchema ___________________@@@
const validationObject = {};
const validationSchemaObject = staticData.update_info_form_datas.forEach(
  (element) => {
    validationObject[element.name] =
      element.fa &&
      Yup.string()
        .required(`${element.fa} متقاضی الزامی است.`)
        .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست.");
  }
);

validationObject.postal_code = Yup.string()
  .matches(regexPostalCode, "کد پستی صحیح نیست.")
  .required("کد پستی الزامی است.");

validationObject.birth_certificate_code = Yup.string().required(
  "شماره شناسنامه الزامی است."
);
validationObject.birth_date_year = Yup.string().required(
  "تاریخ تولد الزامی است."
);

validationObject.landline_phone_number = Yup.string().required(
  "تلفن ثابت الزامی است."
);
validationObject.workplace_number = Yup.string().required(
  "شماره تماس محل کار الزامی است."
);

validationObject.number_of_children = Yup.string().matches(
  regexNumber,
  "مقدار وارد شده صحیح نیست."
);

validationObject.residence_address = Yup.string()
  .required("آدرس محل سکونت الزامی است.")
  .matches(regexAddress, "مقدار وارد شده صحیح نیست.");

validationObject.work_address = Yup.string()
  .required("آدرس محل کار الزامی است.")
  .matches(regexAddress, "مقدار وارد شده صحیح نیست.");

validationObject.documented_monthly_income = Yup.string().required(
  "درآمد ماهانه مستند الزامی است."
);

validationObject.undocumented_monthly_income = Yup.string().required(
  "درآمد ماهانه غیر مستند الزامی است."
);

validationObject.amount_of_requested_facility = Yup.string().required(
  "مبلغ تسهیلات درخواستی الزامی است."
);
validationObject.repayment_period = Yup.number().required(
  "مدت بازپرداخت وام الزامی است."
);

// validationObject.guarantors = Yup.array().of(
//   Yup.object().shape({
//     name: Yup.string().required("نام ضامن الزامی است."),
//     family: Yup.string().required("نام خانوادگی ضامن الزامی است."),
//     national_code: Yup.string()
//       .matches(regexNationalCode, "کد ملی صحیح نیست.")
//       .required("کد ملی ضامن الزامی است."),
//     mobile_number: Yup.string()
//       .matches(regexPhoneNumber, "شماره موبایل صحیح نیست.")
//       .required("موبایل ضامن الزامی است."),
//     job: Yup.string().required("شغل ضامن الزامی است."),
//     birth_certificate_issuing_place: Yup.string().required(
//       "محل صدور شناسنامه ضامن الزامی است."
//     ),
//     birth_certificate_code: Yup.string().required(
//       "شماره شناسنامه ضامن الزامی است."
//     ),
//     birth_date_year: Yup.string().required("تاریخ تولد ضامن الزامی است."),
//     landline_phone_number: Yup.string().required("تلفن ثابت ضامن الزامی است."),
//     postal_code: Yup.string()
//       .matches(regexPostalCode, "کد پستی صحیح نیست.")
//       .required("کدپستی ضامن الزامی است."),
//     father_name: Yup.string().required("نام پدر ضامن الزامی است."),
//     workplace_number: Yup.string().required("شماره تماس محل کار ضامن الزامی است."),
//     residence_address: Yup.string().required("آدرس کار ضامن الزامی است."),
//   })
// );

export const updateInfoValidationSchema = Yup.object(validationObject);
