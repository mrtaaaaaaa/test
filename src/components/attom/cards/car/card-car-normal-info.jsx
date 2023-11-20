import newCarSale2 from "@/assets/images/newCarSale2.jpg";
import { useSelector } from "react-redux";

const CardCarNormalInfo = () => {
  const description = [
    "فروش خودرو شما در کمترین زمان",
    "مشاوره اختصاصی فروش خودرو شما",
    "عقد قرارداد در محل",
    "بدون نیاز به پاسخگویی شما به تماس خریداران",
  ];

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useRouter();
  const location = useLocation();
  const handleAddAdClick = () => {
    let userInfoLength = Object.entries(userInfo);

    if (userInfoLength.length == 0) {
      navigate.push("/auth/check");
    } else {
      navigate.push("/car-sale/sell-my-car");
    }
  };

  return (
    <div className="flex md:flex-row flex-col custom-shadow rounded-lg lg:w-full md:w-fit w-full mx-auto">
      <img
        loading="lazy"
        src={newCarSale2.src}
        alt="car"
        className="rounded-tr-lg md:rounded-tl-none rounded-tl-lg md:rounded-br-lg rounded-br-none md:w-1/3 w-full md:h-auto h-56 object-cover"
      />
      <div className="md:px-5 px-2 py-5 flex flex-col justify-between w-full xl:mr-8 lg:mr-4 md:mr-2">
        <div>
          <div className="mb-2">
            <span className="text-blue  font-bold xl:text-xl lg:text-lg mb-5 block">
              فروش عادی
            </span>
            <span className="font-medium xl:text-lg lg:text-md">
              یک آگهی رایگان در متاخودرو ثبت کنید!
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

        <button
          className="bg-blue  p-2 text-white rounded w-[10rem] mx-auto mt-2 text-center "
          onClick={handleAddAdClick}
        >
          ثبت آگهی
        </button>
      </div>
    </div>
  );
};

export default CardCarNormalInfo;
