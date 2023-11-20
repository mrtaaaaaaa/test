import * as Yup from "yup";

// @@@___________________ Formik validationSchema ___________________@@@
export const carSalevalidationSchema = Yup.object({
  name: Yup.string()
    .required("درج نام خودرو الزامی است.")
    .matches(
      /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F\s0-9a-zA-Z]+$/,
      "مقدار وارد شده صحیح نیست."
    ),
  brand: Yup.string()
    .required("انتخاب برند و مدل خودرو الزامی است.")
    .matches(
      /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F\s0-9a-zA-Z]+$/,
      "مقدار وارد شده صحیح نیست."
    ),
  year_of_manufacture: Yup.string().required("انتخاب سال ساخت الزامی است."),
  color: Yup.string().required("انتخاب رنگ الزامی است."),
  city: Yup.string().required("انتخاب استان الزامی است."),
  first_name: Yup.string()
    .required("درج نام الزامی است.")
    .matches(/^[\u0600-\u06FF\s]+$/, "مقدار وارد شده صحیح نیست."),
  last_name: Yup.string()
    .required("درج نام‌خانوادگی الزامی است.")
    .matches(/^[\u0600-\u06FF\s]+$/, "مقدار وارد شده صحیح نیست."),
  location_lat: Yup.number("مقدار وارد شده صحیح نیست.").required("انتخاب محدوده جغرافیایی ضروری است."),
  mileage: Yup.number()
    .required("درج کارکرد خودرو الزامی است.")
    .min(0, "کارکرد وارد شده صحیح نیست")
    .max(10000000, "حداکثر کارکرد خودرو ده میلیون کیلومتر می‌باشد."),

  announced_price: Yup.number("مقدار وارد شده صحیح نیست.")
    .required("درج قیمت خودرو الزامی است.")
    .typeError("درج قیمت خودرو الزامی است.")
    .min(60000000, "مقدار وارد شده کمتر از ۶۰ میلیون است.")
    .max(100000000000, "مبلغ وارد شده بیش‌ از صد میلیارد است."),

  gear_box_type: Yup.string().matches(
    /^[\u0600-\u06FF\s]+$/,
    "مقدار وارد شده صحیح نیست."
  ),
  car_chassis_damaged: Yup.string().matches(
    /^[\u0600-\u06FF\u200C\s]+$/,
    "مقدار وارد شده صحیح نیست."
  ),
  tire_health_percentage: Yup.number()
    .moreThan(0, "عدد وارد شده می‌بایست  به درصد (1 تا 100) باشد")
    .lessThan(101, "عدد وارد شده می‌بایست  به درصد (1٪ تا 100٪) باشد"),
  description: Yup.string()
    .max(1000, "تعداد حروف بیش از حد مجاز است")
    .matches(
      /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F\s0-9a-zA-Z]+$/,
      "مقدار وارد شده صحیح نیست."
    ),
});
