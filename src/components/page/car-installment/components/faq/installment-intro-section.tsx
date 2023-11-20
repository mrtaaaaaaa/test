import { TbDiscountCheckFilled } from "react-icons/tb";

export const InstallmentIntroSection = ({ title, menu, img }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white shadow-light mt-8 rounded-2xl h-fit w-full">
        <p className="bg-[#376BFA] text-center text-white w-full p-3 rounded-t-2xl text-xl">
          {title}
        </p>
        <ul className="flex flex-col p-8 gap-6">
          {menu.map((text) => (
            <li className="flex gap-4">
              <span className="block w-4 h-4">
                {" "}
                <TbDiscountCheckFilled color="#B1C8FD" size={20} />
              </span>
              <span className="text-gray-900 text-base leading-loose text-justify">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <img src={img} alt="leasingFlow" />
    </div>
  );
};

export const InstallmentIntroV2 = ({ title, menu }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white shadow-light mt-8 rounded-2xl h-fit w-full">
        <div className="flex bg-[#376BFA] rounded-t-2xl  ">
          {title.map((txt) => (
            <span className="text-start text-white w-full lg:px-12 px-6 py-4 lg:text-xl text-md">
              {txt}
            </span>
          ))}
        </div>
        <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
          <ul className="flex flex-col p-6 gap-6">
            {menu[0].map((text, index) => (
              <li key={index} className="flex  items-center  gap-4">
                <span className=" h-8 w-8 flex items-center justify-center shadow-[#cbc5c5] text-center shadow-md rounded-full bg-white ">
                  {++index}
                </span>
                <span className="text-gray-900 text-sm leading-loose text-justify">
                  {text}
                </span>
              </li>
            ))}
          </ul>
          <ul className="flex  flex-col p-6 gap-6">
            {menu[1].map((text, index) => (
              <li key={index} className="flex items-center gap-4">
                <span className=" h-8 w-8 flex items-center justify-center shadow-[#cbc5c5] text-center shadow-md rounded-full bg-white ">
                  {++index}
                </span>
                <span className="text-gray-900 text-sm leading-loose text-justify">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
