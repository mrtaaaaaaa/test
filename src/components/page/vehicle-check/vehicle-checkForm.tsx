"use client";
import NotFound from "@/attom/errors/not-found";
import { useAppDispatch } from "@/hooks/redux-hooks";
import CardVehicleCheckPack from "@/organism/vehicle-check/card-vehicle-check-pack";
import { REMOVE_VEHICLE_CHECKS } from "@/redux/vehicle-check/vehicle-check-slice";
import { useEffect, useState } from "react";
import VehicleCheckFactor from "./vehicle-check-factor";
import { useParams } from "next/navigation";

interface Proptypes {
  models: {
    brandModelTypes: any[];
  };
  areas: {
    areas: any[];
  };
}

const VehicleCheckForm = ({ models, areas = [] }: Proptypes) => {
  const [notFound, setNotFound] = useState(false);
  const params = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(params.vehicle_check_id);

    if (
      params.vehicle_check_id === "1" ||
      params.vehicle_check_id === "3" ||
      params.vehicle_check_id === "5"
    ) {
      dispatch(REMOVE_VEHICLE_CHECKS());
    } else {
      setNotFound(true);
    }
  }, []);

  if (notFound) {
    return <NotFound />;
  }

  return (
    <>
      <div className="flex flex-col gap-6 mt-4">
        {Array.from(Array(+params?.vehicle_check_id))?.map((x, index) => (
          <CardVehicleCheckPack
            key={index}
            indexOfBox={index}
            models={models?.brandModelTypes}
            areas={areas}
          />
        ))}

        <VehicleCheckFactor />
      </div>
    </>
  );
};

export default VehicleCheckForm;
