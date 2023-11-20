import { PostExhibitorLeasingDocuments } from "@/apis/panel/exhibitor";
import ExhibitorStatusAlert from "@/attom/alerts/exhibitor-status-alert";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import ImageUploader from "../../../req-registration/components/form/image-uploader";
import { uploadDocumentInitValue } from "./form/initial-value";
import { uploadDocumentValidationSchema } from "./form/validation-schema";

const UploadDocument = ({ setActiveStep, exhibitor_leasing_id, reason }) => {
  // State for loading button
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: "",
    status: "",
    title: "",
  });
  // document images state
  const [imgAverageBankAccountGrade, setImgAverageBankAccountGrade] = useState(
    []
  );
  const [imgBuisnessLicense, setImgBuisnessLicense] = useState([]);
  const [imgSanaDocument, setImgSanaDocument] = useState([]);
  const [imgMaritalStatus, setImgMaritalStatus] = useState([]);

  // Formik onSubmit
  const onSubmit = (values) => {
    setLoading(true);

    const postData = new FormData();

    const valuesObject = Object.entries(values).map(([key, value]) =>
      postData.append([key], value)
    );

    postData.append("exhibitor_leasing_id", exhibitor_leasing_id);

    PostExhibitorLeasingDocuments(postData)
      .then((res) => {
        setLoading(false);
        setActiveStep(1);
      })
      .catch(() => {
        setShowAlert({
          show: true,
          status: false,
          title: "متاسفانه خطایی رخ داده است.",
        });
        setLoading(false);
      });
  };

  // Formik
  const formik = useFormik({
    initialValues: uploadDocumentInitValue,
    onSubmit,
    validationSchema: uploadDocumentValidationSchema,
  });

  return (
    <div>
      <div className="flex gap-4 items-center border-b border-b-gray-200 pb-4 mt-8 w-full mb-4">
        <h2 className="font-bold text-xl  text-blue">بارگذاری مدارک</h2>
        {reason && (
          <span className="text-sm text-orange font-medium bg-orange-100 px-6 py-2 rounded-md">
            {reason}
          </span>
        )}
      </div>
      <span className="text-sm">
        مدارک متقاضی دریافت تسهیلات برای خرید اقساطی را بارگذاری کنید.
      </span>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-8">
          <ImageUploader
            title="بارگذاری پرینت میانگین (معدل) حساب با مُهر بانک"
            imgsSrc={imgAverageBankAccountGrade}
            setImgsSrc={setImgAverageBankAccountGrade}
            formik={formik}
            name="average_bank_account_grade"
            imageCount={1}
          />

          <ImageUploader
            title="بارگذاری اشتغال به کار یا جواز کسب"
            optional={true}
            imgsSrc={imgBuisnessLicense}
            setImgsSrc={setImgBuisnessLicense}
            formik={formik}
            name="business_license"
            imageCount={1}
          />

          <ImageUploader
            title="بارگذاری برگه سامانه ثنا"
            imgsSrc={imgSanaDocument}
            setImgsSrc={setImgSanaDocument}
            formik={formik}
            name="sana_document"
            imageCount={1}
          />

          <ImageUploader
            title="بارگذاری وضعیت تملک (مستاجر،مالک)"
            optional={true}
            imgsSrc={imgMaritalStatus}
            setImgsSrc={setImgMaritalStatus}
            formik={formik}
            name="marital_status"
            imageCount={1}
          />
        </div>

        <button
          className={`bg-blue text-white w-60 py-2 rounded-md flex flex-col items-center mx-auto mt-4 justify-center outline-none ${
            loading && "cursor-not-allowed"
          }`}
          type="submit"
          disabled={loading ? true : false}
        >
          <span className="flex items-center gap-4">
            ثبت و ادامه
            <FiArrowLeft />
          </span>
          {loading && <LinearProgress sx={{ color: "#FFF", width: "100%" }} />}
        </button>
      </form>

      {showAlert.show && (
        <ExhibitorStatusAlert
          open={showAlert.show}
          setOpen={setShowAlert}
          status={showAlert.status}
          title={showAlert.title}
        />
      )}
    </div>
  );
};

export default UploadDocument;
