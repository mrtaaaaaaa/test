"use client";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import * as React from "react";
import Result from "./result";
import CarEngine from "./steps-content/car-engine";
import Carfuselage from "./steps-content/car-fuselage";
import CarInnerSystem from "./steps-content/car-inner-system";
import CarSuspensionSystem from "./steps-content/car-suspension-system";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1242E0",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1242E0",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const steps = [
  "بدنه و لاستیک  ",
  "سیستم برقی و داخلی   ",
  "موتور  ",
  "سیستم تعلیق",
];

export default function HorizontalLinearStepper({ id, model }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped?.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <div className="mt-5 mb-10">
        <h1 className="text-xl font-bold text-blue  text-center mb-2">
          ثبت نتیجه کارشناسی خودرو - {model}
        </h1>
        <span className="block text-center text-sm font-medium">
          {activeStep == 4
            ? `نتیجه کارشناسی خودرو ${model} را می‌توانید مشاهده کنید`
            : `اطلاعات مربوط به کارشناسی خودرو ${model} را وارد کنید`}
        </span>
      </div>

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ display: activeStep == 4 ? "none" : "flex" }}
        connector={<QontoConnector />}
      >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <React.Fragment>
        {activeStep == 0 && (
          <Carfuselage handleNext={handleNext} handleBack={handleBack} />
        )}
        {activeStep == 1 && (
          <CarInnerSystem handleNext={handleNext} handleBack={handleBack} />
        )}
        {activeStep == 2 && (
          <CarEngine handleNext={handleNext} handleBack={handleBack} />
        )}
        {activeStep == 3 && (
          <CarSuspensionSystem
            handleNext={handleNext}
            handleBack={handleBack}
            id={id}
          />
        )}
        {activeStep == 4 && <Result setActiveStep={setActiveStep} />}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: 2,
            justifyContent: "center",
          }}
        ></Box>
      </React.Fragment>
    </Box>
  );
}
