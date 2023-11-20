import { useSelector } from "react-redux";
import { useState } from "react";
import ChoosenInsurance from "@/attom/insurance@/choosen-insurance";
import Insurance from "@/attom/insurance@/insurance";

const InsurancesCarSale = () => {
  const { insurances } = useSelector((state) => state.insurance);

  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    setOpen(true);
  };

  return (
    <div className="lg:col-span-4 md:col-span-3 col-span-1 border-t border-b border-gray-200 py-8 flex flex-col">
      <span className="text-blue block mb-4 font-bold text-xl">
        {/* اطلاعات بیمه */}
      </span>
      {insurances?.length > 0 && <ChoosenInsurance handleOpen={handleOpen} />}
      <Insurance open={open} setOpen={setOpen} handleOpen={handleOpen} />
    </div>
  );
};

export default InsurancesCarSale;
