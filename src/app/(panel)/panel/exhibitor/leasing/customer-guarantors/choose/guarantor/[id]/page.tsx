'use client'
import OneGuarantorInfo from "@/page/panel/exhibitor/leasing/customer-guarantors/customer-guarantors-info/one-guarantor";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function page({searchParams}:any) {
  
  const {id} = useParams()
  return (
    <div>
      <OneGuarantorInfo guarantor={searchParams} exhibitor_leasing_id={id}/>
    </div>
  );
}
