import car1 from "@/assets/images/newCarSale1.jpg";
import { Link } from "next/link";

const CardCarOrderNormalInfo = ({ link }) => {
  const description = [
    "خرید خودرو دلخواه‌تان در کمترین زمان",
    "انتخاب از میان هزاران خودرو موجود",
    "خرید بدون واسطه",
  ];

  return (
    <div className="flex md:flex-row flex-col custom-shadow rounded-lg  w-full mx-auto">
      <img
        loading="lazy"
        src={car1}
        alt="car"
        className="rounded-tr-lg md:rounded-tl-none rounded-tl-lg md:rounded-br-lg rounded-br-none md:w-1/3 w-full md:h-auto h-56 object-cover"
      />
      <div className="md:px-5 px-2 py-5 flex flex-col justify-between w-full xl:mr-8 lg:mr-4 md:mr-2">
        <div className="mb-2">
          <h1 className="text-blue  font-bold xl:text-xl lg:text-lg mb-5">
            خرید عادی
          </h1>

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

        <Link
          href={link && link}
          className="bg-blue  p-2 text-white rounded w-[10rem] mx-auto mt-2 text-center"
        >
          خرید خودرو
        </Link>
      </div>
    </div>
  );
};

export default CardCarOrderNormalInfo;
