
const ExhibitorsList = () => {
  const list = [
    {
      img: "",
      name: "نمایشگاه پرویز",
      enName: "Parviz",
    },
    {
      img: "",
      name: "نمایشگاه پرویز",
      enName: "Parviz",
    },
    {
      img: "",
      name: "نمایشگاه پرویز",
      enName: "Parviz",
    },
    {
      img: "",
      name: "نمایشگاه پرویز",
      enName: "Parviz",
    },
    {
      img: "",
      name: "نمایشگاه پرویز",
      enName: "Parviz",
    },
    {
      img: "",
      name: "نمایشگاه پرویز",
      enName: "Parviz",
    },
  ];
  return (
    <>
      <div className="tablet tablet:mt-24 mt-16">
        <h2 className="gradient-text font-bold text-center text-2xl mb-8 w-fit mx-auto">
          نمایشگاه‌هایی که به ما پیوستند
        </h2>
        <div className="grid lg:grid-cols-6 grid-cols-3 md:gap-8 gap-4">
          {list.map((item) => (
            <div className="flex flex-col items-center justify-center gap-2">
              {/* <img src={item.img} className="w-32 h-32 rounded-full" alt={item.enName} /> */}
              <div className=" bg-gray-300 w-32 h-32 rounded-full"></div>
              <span className="block text-center font-bold">{item.name}</span>
              <span className="block text-center text-[#444BD3] font-medium">{item.enName}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExhibitorsList;
