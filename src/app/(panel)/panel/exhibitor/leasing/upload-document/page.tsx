"use client";

import CustomerFlowSteps from "@/page/panel/exhibitor/leasing/upload-document";

export default function UploadDocumentPage({ searchParams }: any) {
  return (
    <CustomerFlowSteps
      exhibitor_leasing_id={searchParams.exhibitor_leasing_id}
      reason={searchParams.reason}
    />
  );
}
