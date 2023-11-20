import * as Yup from "yup";

export const ChangeStatusValidationSchema = Yup.object({
  reason: Yup.string().required("دلیل درخواست ویرایش الزامی است."),
});
