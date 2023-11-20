import VehicleCheckResultForm from "@/page/panel/technical-car-body-expert/form";
import React from "react";

const FormPage = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div>
      <VehicleCheckResultForm search={searchParams} params={params} />
    </div>
  );
};

export default FormPage;
