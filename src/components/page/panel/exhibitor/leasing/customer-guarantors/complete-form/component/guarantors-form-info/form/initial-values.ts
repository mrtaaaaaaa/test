


let guarantorsFormInfoInitialValues;

// @@@___________________ Formik initial Values ___________________@@@
export let GuarantorsFormInfoInit = (state: any) => {
    guarantorsFormInfoInitialValues = {
    name1: state?.applicant_info?.guarantors[0]?.name,
    family1: state?.applicant_info?.guarantors[0]?.family,
    relative1: state?.applicant_info?.guarantors[0]?.relative,
    mobile_number1: state?.applicant_info?.guarantors[0]?.mobile_number,
    national_code1: state?.applicant_info?.guarantors[0]?.national_code,
    job1: state?.applicant_info?.guarantors[0]?.job,
    father_name1: state?.applicant_info?.guarantors[0]?.father_name,
    residence_address1: state?.applicant_info?.guarantors[0].residence_address,
    workplace_number1: state?.applicant_info?.guarantors[0].workplace_number,
    postal_code1: state?.applicant_info?.guarantors[0]?.postal_code,
    landline_phone_number1:
      state?.applicant_info?.guarantors[0]?.landline_phone_number,
    birth_date_day1: state?.applicant_info?.guarantors[0]?.birth_date_day,
    birth_date_month1: state?.applicant_info?.guarantors[0]?.birth_date_month,
    birth_date_year1: state?.applicant_info?.guarantors[0]?.birth_date_year,
    birth_certificate_code1:
      state?.applicant_info?.guarantors[0]?.birth_certificate_code,
    birth_certificate_issuing_place1:
      state?.applicant_info?.guarantors[0]?.birth_certificate_issuing_place,
    sana_document1:
      state?.applicant_info?.guarantors[0]?.sana_document_image_id,
    "national-document1":
      state?.applicant_info?.guarantors[0]?.national_image_id,
    birth_certificate1:
      state?.applicant_info?.guarantors[0]?.birth_certificate_image_id,

    name2: state?.applicant_info?.guarantors[1]?.name,
    family2: state?.applicant_info?.guarantors[1]?.family,
    relative2: state?.applicant_info?.guarantors[1]?.relative,
    mobile_number2: state?.applicant_info?.guarantors[1]?.mobile_number,
    national_code2: state?.applicant_info?.guarantors[1]?.national_code,
    job2: state?.applicant_info?.guarantors[1]?.job,
    father_name2: state?.applicant_info?.guarantors[1]?.father_name,
    residence_address2: state?.applicant_info?.guarantors[1].residence_address,
    workplace_number2: state?.applicant_info?.guarantors[1].workplace_number,
    postal_code2: state?.applicant_info?.guarantors[1]?.postal_code,
    landline_phone_number2:
      state?.applicant_info?.guarantors[1]?.landline_phone_number,
    birth_date_day2: state?.applicant_info?.guarantors[1]?.birth_date_day,
    birth_date_month2: state?.applicant_info?.guarantors[1]?.birth_date_month,
    birth_date_year2: state?.applicant_info?.guarantors[1]?.birth_date_year,
    birth_certificate_code2:
      state?.applicant_info?.guarantors[1]?.birth_certificate_code,
    birth_certificate_issuing_place2:
      state?.applicant_info?.guarantors[1]?.birth_certificate_issuing_place,
    sana_document2:
      state?.applicant_info?.guarantors[1]?.sana_document_image_id,
    "national-document2":
      state?.applicant_info?.guarantors[1]?.national_image_id,

    birth_certificate2:
      state?.applicant_info?.guarantors[1]?.birth_certificate_image_id,

    exhibitor_leasing_id: state?.exhibitor_leasing_id,
  };
  return guarantorsFormInfoInitialValues
};
