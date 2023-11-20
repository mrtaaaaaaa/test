import httpService from "@/services/http-service";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { B64toBlob } from "utils";
import UploadNationalCard from "./upload-national-card";
import { FRONT2MESSAGE } from "@/config/url";
import { B64toBlob } from "@/utils/b64-to-blob";

const NationalCard = ({ setActiveStep, handleClose }) => {
  const [postalCardFront, setPostalCardFront] = useState("");
  const [postalCardBack, setPostalCardBack] = useState("");
  const { data } = useSelector((state) => state.editPersonalInfo);
  const carInstallment = useSelector((state) => state.carInstallment);

  const handleClick = () => {
    let formData = new FormData();

    if (postalCardFront.length == 1 && postalCardBack.length == 1) {
      const images = [
        B64toBlob(postalCardFront[0].src),
        B64toBlob(postalCardBack[0].src),
      ];

      images.map((item) => formData.append("files", item));

      // upload new document => navigate from userPanel for uploading new images
      if (carInstallment.leasing_id) {
        formData.append("leasing_id", carInstallment.leasing_id);
        httpService
          .post(`${FRONT2MESSAGE}/Leasing/UpdateDocuments`, formData)
          .then(() => handleClose())
          .catch((err) => console.log(err));
      } else {
        const brandModels = Object.values(carInstallment.brand_models).map(
          (item) => {
            return { brand: item, model: item };
          }
        );

        formData.append("family", data.last_name);
        formData.append("name", data.first_name);
        formData.append(
          "installments_duration",
          +carInstallment.installments_duration
        );

        formData.append("advertiser_id", carInstallment.advertiser_id);
        formData.append("ad_code", carInstallment.ad_code);
        formData.append("model", carInstallment.model);
        formData.append("brand", carInstallment.brand);

        formData.append("brand_models", JSON.stringify(brandModels));
        formData.append("loan_amount", Math.round(carInstallment.loan_amount));
        formData.append(
          "installments_monthly",
          +carInstallment.installments_duration
        );
        formData.append(
          "loan_advance",
          Math.round(carInstallment.loan_advance)
        );
        formData.append(
          "refund_total",
          Math.round(carInstallment.refund_total)
        );
        formData.append("status", "ثبت اولیه");

        httpService
          .post(`${FRONT2MESSAGE}/Leasing`, formData)
          .then((res) => {
            handleClose();
            toast.success("درخواست شما با موفقیت ثبت شد");
          })
          .catch((err) => console.log(err));
      }
    } else {
      toast.error("عکس الزامی است");
    }
  };

  return (
    <div className="p-4">
      <span className="block font-bold border-b border-b-gray-200 my-4 py-3 text-xl text-blue">
        احراز هویت
      </span>

      <div className="flex flex-col">
        <h2 className="font-bold text-lg p-6 text-center">
          بارگذاری تصویر کارت ملی
        </h2>

        <div className="flex flex-col gap-3 items-center">
          <UploadNationalCard
            imgsSrc={postalCardFront}
            setImgsSrc={setPostalCardFront}
            classes="h-full"
          />

          <UploadNationalCard
            imgsSrc={postalCardBack}
            setImgsSrc={setPostalCardBack}
            classes="h-full"
          />
          <button
            className="bg-blue text-white font-bold rounded-lg px-5 py-3 mt-10 w-96"
            onClick={handleClick}
          >
            ثبت تصاویر
          </button>
        </div>
      </div>
    </div>
  );
};

export default NationalCard;
