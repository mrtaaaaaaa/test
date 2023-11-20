import GetStaticDatasNotSSRAPI from "@/apis/static-datas/get-static-datas-not-ssr.api";
import Step from "@mui/material/Step";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import BrandModel from "../brand-model";
import DocumentForm from "./components/document-form";
// import CustomerDocumentBrandModel from "../customerInfo/customerDocumentBrandModel";
// import CustomerDocumentForm from "../customerInfo/customerDocumentForm";
// import { useLocation } from "react-router";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    backgroundColor: "#1242E0",
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1242E0",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    backgroundColor: "#1242E0",
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1242E0",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "#1242E0" ? theme.palette.gray[800] : "#eaeaf0",

    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const steps = [
  "بارگذاری مدارک",
  "انتخاب برند و مدل ",
  "در انتظار تایید کارشناس خودرو",
];

export default function CustomerFlowSteps({
  exhibitor_leasing_id,
  reason,
}: any) {
  const [activeStep, setActiveStep] = useState(0);
  const [brandModel, setBrandModel] = useState([]);

  let postedData = {
    page_number: 1,
    page_size: 200,
  };

  useEffect(() => {
    (async () => {
      const data = await GetStaticDatasNotSSRAPI({
        endPoint: "/BrandModelType/Get/All",
        data: postedData,
        method: "post",
      });

      setBrandModel(data.brandModelTypes || []);
    })();
  }, []);

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ display: activeStep == 4 ? "none" : "flex" }}
        connector={<QontoConnector />}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <DocumentForm
        setActiveStep={setActiveStep}
        exhibitor_leasing_id={exhibitor_leasing_id}
        reason={reason}
      />

      {activeStep == 1 && (
        <BrandModel
          exhibitor_leasing_id={exhibitor_leasing_id}
          brandModel={brandModel}
        />
      )}
    </div>
  );
}
