import CustomerGuarantorsSelection from "@/page/panel/exhibitor/leasing/customer-guarantors/customer-guarantors-select";
import React from "react";

export default function page({ searchParams }: any) {  
  return (
    <div>
      <CustomerGuarantorsSelection reason={searchParams.reason}/>
    </div>
  );
}
