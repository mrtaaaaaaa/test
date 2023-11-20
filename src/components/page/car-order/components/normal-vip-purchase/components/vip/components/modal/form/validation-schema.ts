import { regexPersianCharacter, regexPhoneNumber } from "@/utils/regex";
import * as Yup from "yup";

export const VipBuyModalFormValidationSchema = Yup.object({
  first_name: Yup.string()
    .required("درج نام الزامی است.")
    .matches(regexPersianCharacter, "نام خانوادگی صحیح نیست."),
  last_name: Yup.string()
    .required("درج نام‌خانوادگی الزامی است.")
    .matches(regexPersianCharacter, "نام خانوادگی صحیح نیست."),
  contact_phone_number: Yup.string()
    .required("شماره تماس الزامی است")
    .matches(regexPhoneNumber, "فرمت وارد شده صحیح نیست"),
  budget: Yup.number()
    .required("بودجه الزامی ‌است")
    .typeError("بودجه خودرو الزامی است")
    .min(60000000, "مبلغ وارد شده کمتر از ۶۰ میلیون است")
    .max(200000000000, "مبلغ وارد شده بیش‌ از دویست میلیارد است"),
  model: Yup.string().required("انتخاب  برند و مدل خودرو الزامی است"),
});
