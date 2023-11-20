"use client";
import HorizontalLinearStepper from "@/attom/stepper@/vehicle-check/stepper";

const VehicleCheckResultForm = ({ search }: { [name: string]: any }) => {
  const { id, model } = search;

  return (
    <div>
      <HorizontalLinearStepper model={model} id={id} />
    </div>
  );
};

export default VehicleCheckResultForm;
