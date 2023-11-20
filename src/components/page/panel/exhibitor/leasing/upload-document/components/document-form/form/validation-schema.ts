import * as Yup from "yup";

export const uploadDocumentValidationSchema = Yup.object({
  average_bank_account_grade: Yup.string().required(
    "بارگذاری پرینت میانگین (معدل) حساب با مُهر بانک الزامی است."
  ),
  sana_document: Yup.string().required("بارگذاری برگه سامانه ثنا الزامی است."),
});
