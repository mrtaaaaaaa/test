import serghati from "@/assets/images/serghati.svg";
import trustShop from "@/assets/images/trustShop.svg";
import farayandKharid from "@/assets/images/farayandKharid.png";

const Card = ({ img, hint, title }) => {
  return (
    <div className="flex flex-col items-center justify-center border border-grey-400 rounded-lg px-8 py-5">
      <img src={img} alt="image" className="lg:w-auto w-1/3" />
      <span className="text-center block font-bold text-lg mt-4">{title}</span>
      <span className="text-center block text-grey-500 mt-2">{hint}</span>
    </div>
  );
};

export default function CardHelpBuyUsedCar() {
  const usedCars = [
    {
      title: "چگونه خودرو سرقتی نخریم؟",
      hint: "راهنمای خرید خودرو سرقتی",
      img: serghati,
    },
    {
      title: "چگونه خرید مطمئن داشته باشیم؟",
      hint: "راهنمای خرید مطمئن",
      img: trustShop,
    },
    {
      title: "فرآیند خرید در متاخودرو",
      hint: "راهنمای خرید",
      img: farayandKharid,
    },
  ];

  return (
    <div>
      <h4 className="font-bold text-center text-xl">
        راهنمای خرید خودرو دست دوم
      </h4>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 px-10 mt-10">
        {usedCars.map(({ title, hint, img }) => (
          <Card img={img} hint={hint} title={title} />
        ))}
      </div>
    </div>
  );
}
