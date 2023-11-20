'use client'

import AdminExhibitorsLeasingCustomersReq from "@/page/panel/admin/exhibitor/leasing/customers-req/table";

export default function CustomersReq() {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-xl text-gray">درخواست‌های اقساطی متقاضیان</h1>
      </div>

      <AdminExhibitorsLeasingCustomersReq />
    </div>
  );
}
