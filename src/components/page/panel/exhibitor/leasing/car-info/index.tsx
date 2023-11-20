import CustomerCarInfoForm from "./components/customer-car-info-form";

export default function CustomerCarInfo() {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h1 className="font-bold text-xl mb-4 text-blue border-b border-b-gray-200 pb-4 w-full">
        ثبت اطلاعات خودرو
      </h1>

      <span className="text-sm font-bold">
        اطلاعات خودروی موردنظر خریدار را وارد کنید.
      </span>

      <CustomerCarInfoForm  />
    </div>
  );
}
