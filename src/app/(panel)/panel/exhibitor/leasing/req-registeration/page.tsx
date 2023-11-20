import ReqRegistraionForm from "@/page/panel/exhibitor/leasing/req-registration";
import React from "react";

export default function RegisterPage() {
  return (
    <>
      <h1 className="font-bold text-xl mb-4 text-blue">
        ثبت درخواست خرید اقساطی
      </h1>

      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <ReqRegistraionForm />
      </div>
    </>
  );
}
