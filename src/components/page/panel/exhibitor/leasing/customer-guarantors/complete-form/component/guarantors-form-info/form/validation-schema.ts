import {
  regexPersianCharacter,
  regexPhoneNumber,
  regexPostalCode,
} from "@/utils/regex";

import * as Yup from "yup";

// @@@___________________ formik validationSchema ___________________@@@
export const GuarantorsFormInfoValidationSchema = Yup.object({
  name1: Yup.string()
    .required("نام ضامن الزامی است.")
    .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),
  family1: Yup.string()
    .required("نام‌خانوادگی ضامن الزامی است.")
    .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),
  relative1: Yup.string()
    .required("نسبت ضامن الزامی است.")
    .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),
  mobile_number1: Yup.string("مقدار وارد شده صحیح نیست.")
    .required("شماره تماس ضامن الزامی است")
    .matches(regexPhoneNumber, "شماره تماس وارد شده صحیح نیست."),
  national_code1: Yup.string().required("کدملی ضامن الزامی است"),

  job1: Yup.string()
    .required("شغل ضامن الزامی است.")
    .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),
  "national-document1": Yup.string().required(
    "تصویر کارت ملی  ضامن الزامی است."
  ),
  father_name1: Yup.string()
    .required("نام پدر ضامن الزامی است.")
    .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),
  residence_address1: Yup.string().required("آدرس ضامن الزامی است."),
  workplace_number1: Yup.string().required("آدرس محل کار ضامن الزامی است."),
  postal_code1: Yup.string()
    .required("کد پستی ضامن الزامی است.")
    .matches(regexPostalCode, "مقدار وارد شده صحیح نیست."),
  landline_phone_number1: Yup.number("مقدار وارد شده صحیح نیست.").required(
    "تلفن ثابت الزامی است."
  ),
  birth_date_year1: Yup.number("مقدار وارد شده صحیح نیست.").required(
    "تاریخ تولد الزامی است."
  ),
  birth_certificate_code1: Yup.number("مقدار وارد شده صحیح نیست.").required(
    "شماره شناسنامه الزامی است."
  ),
  birth_certificate_issuing_place1: Yup.string(
    "مقدار وارد شده صحیح نیست."
  ).required("محل صدور شناسنامه الزامی است."),

  birth_certificate1: Yup.string().required("تصویر شناسنامه ضامن الزامی است."),
  sana_document1: Yup.string().required("تصویر ثنا ضامن الزامی است."),

  name2: Yup.string()
    .required("نام ضامن الزامی است.")
    .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),
  family2: Yup.string()
    .required("نام‌خانوادگی ضامن الزامی است.")
    .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),
  relative2: Yup.string()
    .required("نسبت ضامن الزامی است.")
    .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),
  mobile_number2: Yup.string("مقدار وارد شده صحیح نیست.")
    .required("شماره تماس ضامن الزامی است")
    .matches(regexPhoneNumber, "شماره تماس وارد شده صحیح نیست."),
  national_code2: Yup.string().required("کدملی ضامن الزامی است"),

  job2: Yup.string()
    .required("شغل ضامن الزامی است.")
    .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),
  "national-document2": Yup.string().required(
    "تصویر کارت ملی  ضامن الزامی است."
  ),
  father_name2: Yup.string()
    .required("نام پدر ضامن الزامی است.")
    .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),
  residence_address2: Yup.string().required("آدرس ضامن الزامی است."),
  workplace_number2: Yup.string().required("آدرس محل کار ضامن الزامی است."),
  postal_code2: Yup.string()
    .required("کد پستی ضامن الزامی است.")
    .matches(regexPostalCode, "مقدار وارد شده صحیح نیست."),
  landline_phone_number2: Yup.number("مقدار وارد شده صحیح نیست.").required(
    "تلفن ثابت الزامی است."
  ),
  birth_date_year2: Yup.number("مقدار وارد شده صحیح نیست.").required(
    "تاریخ تولد الزامی است."
  ),
  birth_certificate_code2: Yup.number("مقدار وارد شده صحیح نیست.").required(
    "شماره شناسنامه الزامی است."
  ),
  birth_certificate_issuing_place2: Yup.string(
    "مقدار وارد شده صحیح نیست."
  ).required("محل صدور شناسنامه الزامی است."),

  birth_certificate2: Yup.string().required("تصویر شناسنامه ضامن الزامی است."),
  sana_document2: Yup.string().required("تصویر ثنا ضامن الزامی است."),
});
