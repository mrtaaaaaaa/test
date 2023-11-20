import { staticData } from "@/data";

interface StaticData {
  [name: string]: any;
}

// @@@___________________ Formik initial Values ___________________@@@
export let uploadDocumentInitValue: StaticData = {
    average_bank_account_grade: "",
    business_license: "",
    sana_document: "",
    marital_status: "",
};

