import { staticData } from "@/data";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useState } from "react";
import CustomSwitch from "../switch/switch";

const AccordionCarInfoDetails = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange(1)}
      style={{
        boxShadow: "none",
        padding: "2px",
        borderTop: "none",
        borderRadius: "7px",
        border: "1px solid #C4C4C4",
      }}
      sx={{
        "&:before": {
          opacity: "0!important",
        },
      }}
      className="p-2 rounded-xl lg:col-span-4 md:col-span-2"
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <span className="font-medium text-gray-700 text-sm">
          وضعیت بدنه را انتخاب کنید
        </span>
      </AccordionSummary>
      <AccordionDetails>
        <div className="grid tablet:grid-cols-2 grid-cols-1 gap-4">
          {staticData.pricing_list_items.map(({ name, en }) => (
            <CustomSwitch label={name} name={en} />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionCarInfoDetails;
