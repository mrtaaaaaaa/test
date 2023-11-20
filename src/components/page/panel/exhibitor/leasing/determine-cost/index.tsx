"use client"
"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
import { RiErrorWarningFill } from "react-icons/ri";

export default function CustomerDetermineCost() {
 
  const { id } = useParams();

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col">
      <h1 className="font-bold text-xl mb-4 text-blue border-b border-b-gray-200 pb-4 w-full">
        پرداخت کارمزد توسط خریدار
      </h1>

      <div className="flex items-center gap-1">
        <RiErrorWarningFill color="#EB6E02" />
        <span className="text-sm">
          در این بخش امکان پرداخت کارمزد اُتو که توسط خریدار باید پرداخت از طریق
          درگاه اینترنتی وجود دارد.
        </span>
      </div>

      <span className="bg-white text-blue border border-blue px-20 py-2 rounded-lg mt-4 mx-auto text-sm">
        پرداخت آنلاین
      </span>
      <Link
        href={`/panel/exhibitor/leasing/seller-account-number/${id}`}
        className="bg-blue text-white border border-blue px-20 py-2 rounded-lg mt-4 mx-auto text-sm"
      >
        بعدا پرداخت می‌شود
      </Link>
    </div>
  );
}
