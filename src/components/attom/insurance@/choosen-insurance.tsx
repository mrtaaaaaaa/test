import { REMOVE_INSURNCE } from "@/redux/insurance/insurance-slice";
import { Edit, Trash } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";

const ChoosenInsurance = ({ handleOpen }) => {
  const { insurances } = useSelector((state) => state.insurance);
  const dispatch = useDispatch();

  const handleClick = (e, type) => {
    dispatch(REMOVE_INSURNCE(type));
  };

  return (
    <div className="bg-gray-150 pt-3 p-1 rounded-lg flex flex-col gap-2">
      <div className="grid grid-cols-4 ">
        <span className="block px-3 py-2 font-bold">نوع بیمه</span>
        <span className="block px-3 py-2 font-bold">شرکت بیمه</span>
        <span className="block px-3 py-2 font-bold"> مدت زمان باقی مانده</span>
      </div>
      {insurances.map(({ provider, type, expireDate }, index) => {
        return (
          <div className="grid grid-cols-4 bg-white rounded-md p-1 items-center">
            <span className="px-3 py-2">{provider}</span>
            <span className="px-3 py-2">{type}</span>
            <span className="px-3 py-2">{expireDate}</span>
            <div className="px-3 py-2 flex justify-end gap-2">
              <button
                type="button"
                className="border flex gap-2 md:py-[.3rem] text-sm border-blue p-1 px-2 text-blue items-center rounded-md"
                onClick={handleOpen}
              >
                <Edit size={15} />
              </button>
              <button
                type="button"
                onClick={(e) => handleClick(e, type)}
                className="border flex gap-2 md:py-[.3rem] text-sm border-blue md:px-3 p-1 text-blue items-center rounded-md"
              >
                {<Trash size={15} />}
                <span className="md:block hidden">حذف</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChoosenInsurance;
