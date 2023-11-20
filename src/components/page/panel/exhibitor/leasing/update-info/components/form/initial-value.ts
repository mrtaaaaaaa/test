import { staticData } from "@/data";

let updateInfoFormInitialValues: any;

// @@@___________________ Formik initial Values ___________________@@@
export let UpdateInfoFormInit = (state: any) => {

  updateInfoFormInitialValues = {
    guarantors: [
      {
        name: state.applicant_info.guarantors[0].name,
        family: state.applicant_info.guarantors[0].family,
        national_code: state.applicant_info.guarantors[0].national_code,
        mobile_number: state.applicant_info.guarantors[0].mobile_number,
        relative: state.applicant_info.guarantors[0].relative,
        job: state.applicant_info.guarantors[0].job,
        father_name: state.applicant_info.guarantors[0].father_name,
        birth_certificate_issuing_place: state.applicant_info.guarantors[0].birth_certificate_issuing_place,
        birth_certificate_code: state.applicant_info.guarantors[0].birth_certificate_code,
        birth_date_year: state.applicant_info.guarantors[0].birth_date_year,
        birth_date_month: state.applicant_info.guarantors[0].birth_date_month,
        birth_date_day: state.applicant_info.guarantors[0].birth_date_day,
        landline_phone_number: state.applicant_info.guarantors[0].landline_phone_number,
        residence_address: state.applicant_info.guarantors[0].residence_address,
        postal_code: state.applicant_info.guarantors[0].postal_code,
        workplace_number: state.applicant_info.guarantors[0].workplace_number,
      },
      {
        name: state.applicant_info.guarantors[1].name,
        family: state.applicant_info.guarantors[1].family,
        national_code: state.applicant_info.guarantors[1].national_code,
        mobile_number: state.applicant_info.guarantors[1].mobile_number,
        relative: state.applicant_info.guarantors[1].relative,
        job: state.applicant_info.guarantors[1].job,
        father_name: state.applicant_info.guarantors[1].father_name,
        birth_certificate_issuing_place: state.applicant_info.guarantors[1].birth_certificate_issuing_place,
        birth_certificate_code: state.applicant_info.guarantors[1].birth_certificate_code,
        birth_date_year: state.applicant_info.guarantors[1].birth_date_year,
        birth_date_month: state.applicant_info.guarantors[1].birth_date_month,
        birth_date_day: state.applicant_info.guarantors[1].birth_date_day,
        landline_phone_number: state.applicant_info.guarantors[1].landline_phone_number,
        residence_address: state.applicant_info.guarantors[1].residence_address,
        postal_code: state.applicant_info.guarantors[1].postal_code,
        workplace_number: state.applicant_info.guarantors[1].workplace_number,
      },
    ],
    name: state?.applicant_info?.name,
    family: state?.applicant_info?.family,
    father_name: state?.applicant_info?.father_name,
    birth_date_year: state?.applicant_info?.birth_date_year,
    birth_date_month: state?.applicant_info?.birth_date_month,
    birth_date_day: state?.applicant_info?.birth_date_day,
    marital_status: state?.applicant_info?.marital_status,
    number_of_children: state?.applicant_info?.number_of_children,
    residence_address: state?.applicant_info?.residence_address,
    housing_ownership_status: state?.applicant_info?.housing_ownership_status,
    job: state?.applicant_info?.job,
    work_address: state?.applicant_info?.work_address,
    documented_monthly_income: state?.applicant_info?.documented_monthly_income,
    undocumented_monthly_income: state?.applicant_info?.undocumented_monthly_income,
    repayment_period: state?.installment_info?.repayment_per_month,
    postal_code: state?.applicant_info?.postal_code,
    birth_certificate_code: state?.applicant_info?.birth_certificate_code,
    birth_certificate_issuing_place: state?.applicant_info?.birth_certificate_issuing_place,
    landline_phone_number: state?.applicant_info?.landline_phone_number,
    amount_of_requested_facility: state?.applicant_info?.amount_of_requested_facility,
    workplace_number: state?.applicant_info?.workplace_number,
  };

  return updateInfoFormInitialValues;
};
