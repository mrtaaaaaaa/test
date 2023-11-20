import car2 from "@/assets/images/newCarSale2.jpg";
import VipBuyModal from "@/page/car-order/components/normal-vip-purchase/components/vip/components/modal";


const CardCarOrderVipInfo = () => {
  const description = [
    "خرید خودرو دلخواه‌تان در کمترین زمان",
    "مشاوره اختصاصی خرید",
    "انجام کارشناسی خودرو و عقد قرارداد در محل",
  ];





  return (
    <div className="flex md:flex-row flex-col-reverse custom-shadow rounded-lg w-full mx-auto">
      <div className="md:px-5 px-2 py-5 flex flex-col justify-between  xl:mr-8 lg:mr-4 md:mr-2 w-full">
        <div>
          <span className="text-blue font-bold xl:text-xl lg:text-lg mb-5">
            خرید ویژه
          </span>

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

        <VipBuyModal  title="درخواست فروش ویژه" />
      </div>
      <img
        loading="lazy"
        alt="car"
        src={car2}
        className="rounded-tl-lg md:rounded-tr-none rounded-tr-lg md:rounded-bl-lg rounded-bl-none md:w-1/3 w-full md:h-auto h-56 object-cover object-bottom	"
      />
    </div>
  );
};

export default CardCarOrderVipInfo;
