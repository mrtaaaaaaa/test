import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useState } from "react";

const CustomAccordion = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return data.map(({ id, title, description }, index) => <Accordion
      key={id}
      expanded={expanded === index}
      onChange={handleChange(index)}
      style={{
        boxShadow: "none",
        border: "1px solid #C9CBD1",
        padding: "10px",
        borderRadius: "7px",
        marginTop: "10px",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <span className="font-medium">{title}</span>
      </AccordionSummary>
      <AccordionDetails>
        <p className="text-sm border-t border-t-blue-400 pt-4 leading-loose">{description}</p>
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
