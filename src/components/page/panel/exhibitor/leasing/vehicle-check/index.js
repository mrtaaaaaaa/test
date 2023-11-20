import { RiErrorWarningFill } from "react-icons/ri";
import VehicleCheckReqModal from "./components/vehicle-check-req-modal";

export default function VehicleCheckForIntsllment() {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h1 className="font-bold text-xl mb-4 text-blue border-b border-b-gray-200 pb-4 w-full">
        درخواست کارشناسی رسمی قوه قضاییه
      </h1>

      <div className="flex items-center gap-1">
        <RiErrorWarningFill color="#EB6E02" />
        <span className="text-sm">
          در این بخش پس از ثبت درخواست، کارشناس رسمی قوه قضاییه بررسی‌های لازم جهت
          تعیین قیمت دقیق خودرو و تایید اصالت آن را انجام خواهد داد.
        </span>
      </div>

      <div className="mt-4">
        <VehicleCheckReqModal />
      </div>
    </div>
  );
}
