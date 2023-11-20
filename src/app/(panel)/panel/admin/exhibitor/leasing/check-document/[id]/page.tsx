"use client";
import AdminExhibitorLeasingCheckDocument from "@/page/panel/admin/exhibitor/leasing/check-document";
import { useParams } from "next/navigation";

import React from "react";

export default function CheckDocumentPage() {
  const searchParams = useParams();

  return (
    <AdminExhibitorLeasingCheckDocument
      exhibitor_leasing_id={searchParams.id}
    />
  );
}
