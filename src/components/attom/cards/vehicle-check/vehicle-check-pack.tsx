import { useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/redux/auth/auth-Slice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useState } from "react";
import VehicleCheckRequestedDetails from "./vehicle-check-requested-details";

interface PackArray extends Array<PackObject> {}

interface PackObject {
  user_name: string;
  [name: string]: any;
}

type Pack = PackObject | PackArray;

interface IPropTypes {
  index: number | string | boolean;
  pack: Pack;
  inspectors?: any;
}

const VehicleCheckPack = ({ index, pack, inspectors }: IPropTypes) => {
  const { userInfo } = useAppSelector(authSelector);

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = (panel: any) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === index}
      onChange={handleChange(index)}
      sx={{
        boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.09)",
        border: "none",
        marginTop: "1rem",
        borderRadius: ".5rem",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div>
          <span className="md:text-lg font-medium">
            پکیج کارشناسی {pack.length} خودرو
          </span>
          {userInfo?.roles?.includes("OperationsDirector") && (
            <span className="md:text-md text-sm">
              {" "}
              - {Array.isArray(pack) ? pack[0].user_name : pack.user_name}
            </span>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-5 mb-10">
          {/* <PaymentDetails pack={pack} /> */}
          {pack.length > 1 ? (
            pack.map((vcReq: Pack) => (
              <VehicleCheckRequestedDetails
                vcReq={vcReq}
                inspectors={inspectors}
              />
            ))
          ) : (
            <VehicleCheckRequestedDetails
              vcReq={Array.isArray(pack) && pack[0]}
              inspectors={inspectors}
            />
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default VehicleCheckPack;
