import newCarSale1 from "@/assets/images/newCarSale1.jpg";
import VipSaleModal from "@/components/common/common/Modals/vipModals/VipSaleModal";

const CardCarVipInfo = () => {
  const description = [
    "کاملا رایگان",
    "پشتیبانی 24 ساعته",
    "بازدید آگهی توسط هزاران خریدار در روز",
  ];
  return (
    <div className="flex md:flex-row flex-col-reverse custom-shadow rounded-lg lg:w-full md:w-fit w-full mx-auto">
      <div className="md:px-5 px-2 py-5 flex flex-col justify-between xl:mr-8 lg:mr-4 md:mr-2 w-full">
        <div>
          <div className="mb-2">
            <span className="text-blue block font-bold xl:text-xl lg:text-lg mb-5">
              فروش ویژه
            </span>
            <span className="font-medium xl:text-lg lg:text-md  border-blue border-b-2 w-fit">
              فروش ویژه خودرو خود را به ما بسپارید!
            </span>
          </div>

          <ul className="list-disc mr-5">
            {description.map((item) => {
              return (
                <li className="py-3" key={item}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>

        <VipSaleModal />
      </div>
      <img
        loading="lazy"
        src={newCarSale1.src}
        alt="car"
        className="rounded-tl-lg md:rounded-tr-none rounded-tr-lg md:rounded-bl-lg rounded-bl-none md:w-1/3 w-full md:h-auto h-56 object-cover object-bottom	"
      />
    </div>
  );
};

export default CardCarVipInfo;
