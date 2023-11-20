import * as Yup from "yup";

// Formik validationSchema
export const brandModelValidationSchema = Yup.object({
  model: Yup.string().required("انتخاب برند و مدل الزامی است."),
  year_of_manufacture: Yup.string().required("انتخاب سال ساخت الزامی است."),
});
