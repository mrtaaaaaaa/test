"use client";
import CardVehicleCheckPack from "@/organism/vehicle-check/card-vehicle-check-pack";
import { REMOVE_VEHICLE_CHECKS } from "@/redux/vehicle-check/vehicle-check-slice";

import { useDispatch } from "react-redux";
import VehicleCheckFactor from "./vehicle-check-factor";
import NotFound from "@/attom/errors/not-found";

interface Proptypes {
  models: {
    brandModelTypes: any[];
  };
  areas: {
    areas: any[];
  };
}

const VehicleCheckForm = ({ models, areas = [] }: Proptypes) => {
  let str;

  if (typeof window !== "undefined") {
    str = window.location.pathname;
  }

  let numOfComponents = str?.split("/")[2];

  const dispatch = useDispatch();
  dispatch(REMOVE_VEHICLE_CHECKS());

  return (
    <>
      <div className="flex flex-col gap-6 mt-4">
        {(numOfComponents != undefined && +numOfComponents === 1) ||
        +numOfComponents === 3 ||
        +numOfComponents === 5 ? (
          <>
            {Array.from(Array(+numOfComponents))?.map((x, index) => (
              <CardVehicleCheckPack
                key={index}
                indexOfBox={index}
                models={models?.brandModelTypes}
                areas={areas}
              />
            ))}

            <VehicleCheckFactor />
          </>
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
};

export default VehicleCheckForm;
