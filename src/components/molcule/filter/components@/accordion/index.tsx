import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionType } from "./type";

export default function SimpleAccordion({ title, children }: AccordionType) {
  return (
    <div>
      <Accordion
        sx={{
          background: "#F9F9F9",
          boxShadow: "none",
          borderRadius: "6px!important",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontFamily: "IranSans-Medium", color: "#2E2E2E" }}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "5px 5px 10px 5px" }}>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
