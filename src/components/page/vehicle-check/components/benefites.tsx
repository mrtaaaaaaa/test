const Benefites = () => {
  const blueBoxes = [
    {
      title: "بررسی و ارزیابی تخصصی خودرو",
    },
    {
      title: "تشخیص خودروهای سرقتی",
    },
    {
      title: "اطلاع از بدهی‌های پرداخت نشده خودرو",
    },
  ];

  return (
    <div className="rounded-lg w-full p-10">
      <div className="flex gap-1 justify-center pb-10  md:text-xl text-lg">
        <span className="text-blue">مزایای کارشناسی خودرو</span>
      </div>

      <div className="flex flex-wrap justify-center lg:gap-28 gap-16">
        {blueBoxes.map(({ title }, index) => {
          return (
            <div className="py-3 relative">
              <div className=" bg-white border border-blue  z-10 relative rounded-xl w-44 h-44 flex items-center justify-center">
                <h2 className={`text-blue  p-3 px-4 text-center font-bold `}>
                  {title}
                </h2>
              </div>
              <div className="bg-blue-200 absolute top-4 rounded-xl w-44 h-44 rotate-12 opacity-20"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Benefites;
