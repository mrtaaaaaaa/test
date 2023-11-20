import { staticData } from "@/data";

interface StaticData {
  [name: string]: any;
}

// @@@___________________ Formik initial Values ___________________@@@
export let reqRegistrationInitValue: StaticData = {
  guarantors: [
    {
      name: "",
      family: "",
      national_code: "",
      mobile_number: "",
      relative: "",
      job: "",
      father_name: "",
      birth_certificate_issuing_place: "",
      birth_certificate_code: "",
      birth_date_year: "",
      birth_date_month: "",
      birth_date_day: "",
      landline_phone_number: "",
      residence_address: "",
      postal_code: "",
      workplace_number: "",
    },
    {
      name: "",
      family: "",
      national_code: "",
      mobile_number: "",
      relative: "",
      job: "",
      father_name: "",
      birth_certificate_issuing_place: "",
      birth_certificate_code: "",
      birth_date_year: "",
      birth_date_month: "",
      birth_date_day: "",
      landline_phone_number: "",
      residence_address: "",
      postal_code: "",
      workplace_number: "",
    },
  ],
};

(() => {
  staticData.req_registration_form_data.forEach(({ name }: { name: string }) => {
    reqRegistrationInitValue[name] = name == "number_of_children" ? 0 : "";
  });
})();