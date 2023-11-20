import AdminExhibitorRequestTable from "@/page/panel/admin/exhibitor/requests/table";
import React from "react";

export default function Page() {
  return (
    <>
      <h1 className="font-bold text-xl mb-4 text-blue">
        درخواست‌های نمایشگاه‌داران
      </h1>

      <AdminExhibitorRequestTable />
    </>
  );
}
