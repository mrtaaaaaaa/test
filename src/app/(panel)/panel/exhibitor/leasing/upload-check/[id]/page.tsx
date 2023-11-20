import CustomerUploadCheck from "@/page/panel/exhibitor/leasing/upload-check";
import React from "react";

export default function page({searchParams}:any) {
  return (
    <div>
      <CustomerUploadCheck reason={searchParams.reason}/>
    </div>
  );
}
