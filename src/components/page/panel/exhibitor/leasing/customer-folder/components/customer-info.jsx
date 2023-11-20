import PreviewDetail from "@/attom/exhibitors/preview-detail";
import { NumberSeprator } from "@/utils/number-seprator";

export default function CustomerInfo({
  applicant_info,
  contaract_date,
  repayment_per_month,
}) {
  const customerInfo = [
    {
      name: "نام متقاضی",
      value: `${applicant_info?.name} ${applicant_info?.family}`,
    },
    {
      name: " نام پدر",
      value: applicant_info?.father_name,
    },
    {
      name: "شماره موبایل",
      value: applicant_info?.mobile_number,
    },
    {
      name: " کد ملی",
      value: applicant_info?.national_code,
    },
    {
      name: "تاریخ تولد",
      value:
        applicant_info?.birth_date_year +
        "/" +
        applicant_info?.birth_date_month +
        "/" +
        applicant_info?.birth_date_day,
    },
    {
      name: "شماره شناسنامه",
      value: applicant_info?.birth_certificate_code,
    },
    {
      name: "محل صدور شناسنامه",
      value: applicant_info?.birth_certificate_issuing_place,
    },
    {
      name: "تلفن ثابت",
      value: applicant_info?.landline_phone_number,
    },
    {
      name: "کد پستی",
      value: applicant_info?.postal_code,
    },
    {
      name: "وضعیت تاهل",
      value: applicant_info?.marital_status,
    },
    {
      name: "تعداد فرزند",
      value: applicant_info?.number_of_children
        ? Number(applicant_info?.number_of_children)
        : 0,
    },
    {
      name: "وضعیت  تملک",
      value: applicant_info?.housing_ownership_status,
    },
    {
      name: "مدت بازپرداخت تسهیلات",
      value: `${repayment_per_month} ماه`,
    },
    {
      name: "تاریخ ثبت قرارداد",
      value: contaract_date,
    },

    {
      name: "شغل متقاضی",
      value: applicant_info?.job,
    },
    {
      name: "درآمد ماهانه مستند",
      value:
        NumberSeprator(applicant_info?.documented_monthly_income) +
        " " +
        "تومان",
    },
    {
      name: "درآمد ماهانه غیر مستند  ",
      value:
        NumberSeprator(applicant_info?.undocumented_monthly_income) +
        " " +
        "تومان",
    },
    {
      name: " مبلغ تسهیلات درخواستی",
      value:
        NumberSeprator(applicant_info?.amount_of_requested_facility) +
        " " +
        "تومان",
    },
  ];

  const customerAddresses = [
    {
      name: "آدرس محل سکونت ",
      value: applicant_info?.residence_address,
    },
    {
      name: "آدرس محل کار",
      value: applicant_info?.work_address,
    },
  ];

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {customerInfo.map(({ name, value }) => (
          <PreviewDetail key={name} label={name} value={value} />
        ))}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {customerAddresses.map(({ name, value }) => (
          <div className="md:col-span-2 gap-2 mt-2 border border-[#C4C4C4] relative h-[10rem] rounded-lg flex flex-col px-2 py-4">
            <label
              className="bg-white px-2 right-2 -top-2 absolute text-blue"
              style={{ fontSize: "11px" }}
            >
              {name}
            </label>
            <span className="text-sm">
              {value && value != "undefined-undefined" ? value : ""}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
