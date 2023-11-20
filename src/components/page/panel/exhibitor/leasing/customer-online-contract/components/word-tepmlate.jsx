import React from "react";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Num2persian } from "@/utils/num2persian";
import { GetExhibitorData, postConvertDoxcToPdf } from "@/apis/panel/exhibitor";
import { useParams } from "next/navigation";

import wordTemplate0 from "./template0.docx";
import wordTemplate1 from "./template1.docx";
import wordTemplate2 from "./template2.docx";

import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";

let PizZipUtils = null;
if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

function WordTemplate() {

  const [state, setState] = useState([]);
  const { id } = useParams();

  function fetchData() {
    GetExhibitorData(id).then((res) => {
      setState(res);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const facility_amount = state?.installment_info?.facility_amount;

  const [downloadStatus, setDownloadStatus] = useState({
    fileFormat: "",
    status: false,
  });

  const checks_list = [
    state?.installment_info?.checks?.map((check, index) => ({
      number: index + 1,
      check_no: check?.check_no,
      date_in_number: check?.date_in_number,
      amount_in_number: check?.amount_in_number,
      amount_in_letters: Num2persian(check?.amount_in_number),
      bank: check?.bank,
      bank_branch: check?.bank_branch,
    })),
  ];

  const guarantors_checks_list = [
    state?.installment_info?.guarantors_checks?.map((check, index) => ({
      number: index + 1,
      check_no: check?.check_no,
      date_in_number: check?.date_in_number,
      amount_in_number: check?.amount_in_number,
      amount_in_letters: Num2persian(check?.amount_in_number),
      bank: check?.bank,
      bank_branch: check?.bank_branch,
    })),
  ];

  const data0 = {
    // Applicant info
    applicant_info_name: state?.applicant_info?.name,
    applicant_info_family: state?.applicant_info?.family,
    applicant_info_father_name: state?.applicant_info?.father_name,
    applicant_info_birth_certificate_issuing_place:
      state?.applicant_info?.birth_certificate_issuing_place,
    applicant_info_birth_certificate_code:
      state?.applicant_info?.birth_certificate_code,
    applicant_info_national_code: state?.applicant_info?.national_code,

    applicant_info_birth_date_day: state?.applicant_info?.birth_date_day,
    applicant_info_birth_date_month: state?.applicant_info?.birth_date_month,
    applicant_info_birth_date_year: state?.applicant_info?.birth_date_year,

    applicant_info_mobile_number: state?.applicant_info?.mobile_number,
    applicant_info_landline_phone_number:
      state?.applicant_info?.landline_phone_number,
    applicant_info_residence_address: state?.applicant_info?.residence_address,
    applicant_info_postal_code: state?.applicant_info?.postal_code,

    // Vehicle Info
    vehicle_info_type_vehicle_info_model: state?.vehicle_info?.type
      ? state?.vehicle_info?.type
      : state?.vehicle_info?.model,
    vehicle_info_color: state?.vehicle_info?.color,
    vehicle_info_year_of_manufacture_display:
      state?.vehicle_info?.year_of_manufacture_display,
    vehicle_info_engin_number: state?.vehicle_info?.engin_number,
    vehicle_info_chassis_number: state?.vehicle_info?.chassis_number,

    vehicle_info_vehicle_amount_in_number:
      state?.vehicle_info?.vehicle_amount_in_number,
    // vehicle_info_vehicle_amount_in_letters: state?.vehicle_info.vehicle_amount_in_letters,
    vehicle_info_vehicle_amount_in_letters: Num2persian(
      state?.vehicle_info?.vehicle_amount_in_number
    ),

    // Installment Info
    installment_info_repayment_per_month:
      state?.installment_info?.repayment_per_month,

    contract_date_day: state?.contract_date_day,
    contract_date_month: state?.contract_date_month,
    contract_date_year: state?.contract_date_year,

    installment_info_check_templates_last_index_date_in_number:
      state?.installment_info?.check_templates[
        state?.installment_info?.check_templates.length - 1
      ].date_in_number,

    installment_info_total_amount_in_number:
      state?.installment_info?.total_amount_in_number,
    installment_info_total_amount_in_letters: Num2persian(
      state?.installment_info?.total_amount_in_number
    ),

    installment_info_prepaid_amount_in_number:
      state?.installment_info?.prepaid_amount_in_number,
    installment_info_prepaid_amount_in_letters: Num2persian(
      state?.installment_info?.prepaid_amount_in_number
    ),

    installment_info_refund_amount_in_number:
      state?.installment_info?.refund_amount_in_number,
    installment_info_refund_amount_in_letters:
      state?.installment_info?.refund_amount_in_letters,
    installment_info_refund_amount_in_letters: Num2persian(
      state?.installment_info?.refund_amount_in_number
    ),

    installment_info_checks_number: state?.installment_info?.checks?.length,

    installment_info_check_templates_zero_amount_in_number:
      state?.installment_info?.check_templates[0]?.amount_in_number,
    installment_info_check_templates_zero_amount_in_letters: Num2persian(
      state?.installment_info?.check_templates[0]?.amount_in_number
    ),
    installment_info_check_templates_zero_date_in_number:
      state?.installment_info?.check_templates[0]?.date_in_number,

    installment_info_checks_number_minus_two:
      state?.installment_info?.check_templates?.length - 2,

    installment_info_check_templates_last_index_amount_in_number:
      state?.installment_info?.check_templates[
        state?.installment_info.check_templates?.length - 1
      ].amount_in_number,
    installment_info_check_templates_last_index_amount_in_letters: Num2persian(
      state?.installment_info?.check_templates[
        state?.installment_info.check_templates.length - 1
      ].amount_in_number
    ),

    checks_list: checks_list[0],
    guarantors_checks_list: guarantors_checks_list[0],
  };

  const data1 = {
    // Applicant info
    applicant_info_name: state?.applicant_info?.name,
    applicant_info_family: state?.applicant_info?.family,
    applicant_info_father_name: state?.applicant_info?.father_name,
    applicant_info_birth_certificate_issuing_place:
      state?.applicant_info?.birth_certificate_issuing_place,
    applicant_info_birth_certificate_code:
      state?.applicant_info?.birth_certificate_code,
    applicant_info_national_code: state?.applicant_info?.national_code,

    applicant_info_birth_date_day: state?.applicant_info?.birth_date_day,
    applicant_info_birth_date_month: state?.applicant_info?.birth_date_month,
    applicant_info_birth_date_year: state?.applicant_info?.birth_date_year,

    applicant_info_mobile_number: state?.applicant_info?.mobile_number,
    applicant_info_landline_phone_number:
      state?.applicant_info?.landline_phone_number,
    applicant_info_residence_address: state?.applicant_info?.residence_address,
    applicant_info_postal_code: state?.applicant_info?.postal_code,

    // Guarantors
    // First Guarantor
    applicant_info_guarantors_0_name: state?.applicant_info?.guarantors[0]?.name,
    applicant_info_guarantors_0_family:
      state?.applicant_info?.guarantors[0]?.family,
    applicant_info_guarantors_0_father_name:
      state?.applicant_info?.guarantors[0]?.father_name,
    applicant_info_guarantors_0_birth_certificate_code:
      state?.applicant_info?.guarantors[0]?.birth_certificate_code,
    applicant_info_guarantors_0_birth_certificate_issuing_place:
      state?.applicant_info?.guarantors[0]?.birth_certificate_issuing_place,
    applicant_info_guarantors_0_national_code:
      state?.applicant_info?.guarantors[0]?.national_code,
    applicant_info_guarantors_0_birth_date_year:
      state?.applicant_info?.guarantors[0]?.birth_date_year,
    applicant_info_guarantors_0_birth_date_month:
      state?.applicant_info?.guarantors[0]?.birth_date_month,
    applicant_info_guarantors_0_birth_date_day:
      state?.applicant_info?.guarantors[0]?.birth_date_day,
    applicant_info_guarantors_0_mobile_number:
      state?.applicant_info?.guarantors[0]?.mobile_number,
    applicant_info_guarantors_0_landline_phone_number:
      state?.applicant_info?.guarantors[0]?.landline_phone_number,
    applicant_info_guarantors_0_residence_address:
      state?.applicant_info?.guarantors[0]?.residence_address,
    applicant_info_guarantors_0_postal_code:
      state?.applicant_info?.guarantors[0]?.postal_code,

    // Second Guarantor
    applicant_info_guarantors_1_name:
      state?.applicant_info?.guarantors[1]?.name,
    applicant_info_guarantors_1_family:
      state?.applicant_info?.guarantors[1]?.family,
    applicant_info_guarantors_1_father_name:
      state?.applicant_info?.guarantors[1]?.father_name,
    applicant_info_guarantors_1_birth_certificate_code:
      state?.applicant_info?.guarantors[1]?.birth_certificate_code,
    applicant_info_guarantors_1_birth_certificate_issuing_place:
      state?.applicant_info?.guarantors[1]?.birth_certificate_issuing_place,
    applicant_info_guarantors_1_national_code:
      state?.applicant_info?.guarantors[1]?.national_code,
    applicant_info_guarantors_1_birth_date_year:
      state?.applicant_info?.guarantors[1]?.birth_date_year,
    applicant_info_guarantors_1_birth_date_month:
      state?.applicant_info?.guarantors[1]?.birth_date_month,
    applicant_info_guarantors_1_birth_date_day:
      state?.applicant_info?.guarantors[1]?.birth_date_day,
    applicant_info_guarantors_1_mobile_number:
      state?.applicant_info?.guarantors[1]?.mobile_number,
    applicant_info_guarantors_1_landline_phone_number:
      state?.applicant_info?.guarantors[1]?.landline_phone_number,
    applicant_info_guarantors_1_residence_address:
      state?.applicant_info?.guarantors[1]?.residence_address,
    applicant_info_guarantors_1_postal_code:
      state?.applicant_info?.guarantors[1]?.postal_code,

    // Vehicle Info
    vehicle_info_type_vehicle_info_model: state?.vehicle_info?.type
      ? state?.vehicle_info?.type
      : state?.vehicle_info?.model,
    vehicle_info_color: state?.vehicle_info?.color,
    vehicle_info_year_of_manufacture_display:
      state?.vehicle_info?.year_of_manufacture_display,
    vehicle_info_engin_number: state?.vehicle_info?.engin_number,
    vehicle_info_chassis_number: state?.vehicle_info?.chassis_number,

    vehicle_info_vehicle_amount_in_number:
      state?.vehicle_info?.vehicle_amount_in_number,
    // vehicle_info_vehicle_amount_in_letters: state?.vehicle_info.vehicle_amount_in_letters,
    vehicle_info_vehicle_amount_in_letters: Num2persian(
      state?.vehicle_info?.vehicle_amount_in_number
    ),

    // Installment Info
    installment_info_repayment_per_month:
      state?.installment_info?.repayment_per_month,

    contract_date_day: state?.contract_date_day,
    contract_date_month: state?.contract_date_month,
    contract_date_year: state?.contract_date_year,

    installment_info_check_templates_last_index_date_in_number:
      state?.installment_info?.check_templates[
        state?.installment_info.check_templates?.length - 1
      ].date_in_number,

    installment_info_total_amount_in_number:
      state?.installment_info?.total_amount_in_number,
    installment_info_total_amount_in_letters: Num2persian(
      state?.installment_info?.total_amount_in_number
    ),

    installment_info_prepaid_amount_in_number:
      state?.installment_info?.prepaid_amount_in_number,
    installment_info_prepaid_amount_in_letters: Num2persian(
      state?.installment_info?.prepaid_amount_in_number
    ),

    installment_info_refund_amount_in_number:
      state?.installment_info?.refund_amount_in_number,
    installment_info_refund_amount_in_letters:
      state?.installment_info?.refund_amount_in_letters,
    installment_info_refund_amount_in_letters: Num2persian(
      state?.installment_info?.refund_amount_in_number
    ),

    installment_info_checks_number: state?.installment_info?.checks?.length,

    installment_info_check_templates_zero_amount_in_number:
      state?.installment_info?.check_templates[0]?.amount_in_number,
    installment_info_check_templates_zero_amount_in_letters: Num2persian(
      state?.installment_info?.check_templates[0]?.amount_in_number
    ),
    installment_info_check_templates_zero_date_in_number:
      state?.installment_info?.check_templates[0]?.date_in_number,

    installment_info_checks_number_minus_two:
      state?.installment_info?.check_templates?.length - 2,

    installment_info_check_templates_last_index_amount_in_number:
      state?.installment_info?.check_templates[
        state?.installment_info.check_templates?.length - 1
      ]?.amount_in_number,
    installment_info_check_templates_last_index_amount_in_letters: Num2persian(
      state?.installment_info?.check_templates[
        state?.installment_info.check_templates?.length - 1
      ]?.amount_in_number
    ),

    checks_list: checks_list[0],
    guarantors_checks_list: guarantors_checks_list[0],
  };

  const docNumber = () => {

    let docInfo;
    if (facility_amount < 300000000) {
      // مبلغ تسهیلات بین ۰ تا ۳۰۰
      docInfo = {
        data: data0,
        docNum: wordTemplate0,
      };
    } else if (facility_amount > 300000000 && facility_amount < 600000000) {
      // مبلغ تسهیلات بین ۳۰۰ تا ۶۰۰
      docInfo = {
        data: data1,
        docNum: wordTemplate1,
      };
    } else {
      // مبلغ تسهیلات بین ۶۰۰ تا ۱ میلیارد
      docInfo = {
        data: data1,
        docNum: wordTemplate2,
      };
    }

    return docInfo;
  };
 
  const generateDocument = (fileFormat) => {

    setDownloadStatus({
      status: true,
      fileFormat: fileFormat,
    });

    loadFile(docNumber().docNum, function (error, content) {

      if (error) {
        throw error;
      }

      const zip = new PizZip(content);
      const doc = new Docxtemplater().loadZip(zip);

      doc.render({ ...docNumber().data });

      const out = doc.getZip().generate({
        type: "blob",
        mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      if (fileFormat === "word") {
        //Download docx File 👇
        saveAs(out, "document.docx");
        setDownloadStatus({
          status: false,
          fileFormat: "",
        });
      } else if (fileFormat === "pdf") {
        //Convert Doxc To PDF And Download 👇
        const wordFormData = new FormData();
        wordFormData.append("word", out);

        postConvertDoxcToPdf(wordFormData).then((response) => {
          const blob = new Blob([response], { type: "application/pdf" });
          const blobURL = URL.createObjectURL(blob);

          const tempLink = document.createElement("a");
          tempLink.style.display = "none";
          tempLink.href = blobURL;
          tempLink.setAttribute("download", `document.pdf`);
          tempLink.click();

          toast.success("فایل PDF قرارداد با موفقیت بارگیری شد.");
        })
        .catch((err) => {
          toast.error("دانلود PDF قرارداد با خطا مواجه شد.");
        })
        .finally(() => {
          setDownloadStatus({
            status: false,
            fileFormat: "",
          });
        });
      }

      saveAs(blob, "output.docx");
    });
  };

  return (
    <Box
      display="flex"
      gap="10px"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
    >
      <button
        onClick={() => generateDocument("pdf")}
        className={`border border-blue text-blue rounded-lg py-2 px-16 text-sm mt-4 w-[300px] ${
          downloadStatus.status && "disabled:opacity-25"
        }`}
        disabled={downloadStatus.status}
      >
        {downloadStatus.fileFormat === "pdf" && (
          <svg
            aria-hidden="true"
            role="status"
            class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            ></path>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            ></path>
          </svg>
        )}
        <Typography
          display="inline-block"
          pl={
            downloadStatus.status && downloadStatus.fileFormat === "pdf"
              ? "10px"
              : 0
          }
        >
          دانلود PDF قرارداد
        </Typography>
      </button>
      <button
        onClick={() => generateDocument("word")}
        className={`border border-blue text-blue rounded-lg py-2 px-16 text-sm mt-4 w-[300px] ${
          downloadStatus.status && "disabled:opacity-25"
        }`}
        disabled={downloadStatus.status}
      >
        {downloadStatus.fileFormat === "word" && (
          <svg
            aria-hidden="true"
            role="status"
            class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            ></path>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            ></path>
          </svg>
        )}
        <Typography
          display="inline-block"
          pl={
            downloadStatus.status && downloadStatus.fileFormat === "word"
              ? "10px"
              : 0
          }
        >
          دانلود WORD قرارداد
        </Typography>
      </button>
    </Box>
  );
}

export default WordTemplate;
