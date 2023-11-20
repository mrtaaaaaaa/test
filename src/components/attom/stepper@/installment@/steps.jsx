import Box from "@mui/material/Box";
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import PersonalInfoForm from "./personal-info";
import NationalCard from "./national-card";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    backgroundColor:"#1242E0",
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#1242E0',
 
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    backgroundColor:"#1242E0",
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#1242E0',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === '#1242E0' ? theme.palette.grey[800] : '#eaeaf0',
    
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));


const steps = [
  "درخواست خرید اقساطی",
  "اطلاعات فردی ",
  "احراز هویت",
  "ثبت نهایی درخواست ",
];

export default function Steps({handleClose, activeStep, setActiveStep, }) {
  
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  return (
    <Box sx={{ width: "100%",padding:"0 2rem 0 2rem" }}>
      <div className="mt-14"></div>
      <Stepper activeStep={activeStep} alternativeLabel sx={{display: activeStep == 4 ? 'none': 'flex' }}  connector={<QontoConnector />}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel sx={{whiteSpace:"nowrap"}} {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
   

      <React.Fragment>
        {activeStep == 1 && <PersonalInfoForm  activeStep={activeStep} setActiveStep={setActiveStep}/>}
        {activeStep == 2 && <NationalCard   setActiveStep={setActiveStep} handleClose={handleClose} />}
  
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            pt: 2,
            justifyContent: "center",
          }}
        >
        </Box>
      </React.Fragment>
    </Box>
  );
}
