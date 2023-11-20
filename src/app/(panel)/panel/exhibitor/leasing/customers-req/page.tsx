import { IoAdd } from "react-icons/io5";
import Link from "next/link"
import React from "react";
import { CustomerFileStatusTable } from "@/page/panel/exhibitor/leasing/customer-file-status/table";

export default function CustomersReq() {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-xl text-gray">وضعیت پرونده متقاضیان</h1>

        <Link
          href="/panel/exhibitor/leasing/req-registeration"
          className="bg-blue text-white px-4 py-2 rounded-lg text-sm font-light flex items-center gap-2"
        >
          <IoAdd size={16} />
          افزودن متقاضی جدید
        </Link>
      </div>

      <CustomerFileStatusTable />
    </div>
  );
}
