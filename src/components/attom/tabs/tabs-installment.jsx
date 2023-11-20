import { useState } from "react";

const TabsInstallment = () => {
  const [tabClick, setTabClick] = useState("");

  const tabs = [
    {
      title: "مدارک مورد نیاز",
    },
    {
      title: "ضامن‌ها",
    },
    {
      title: "مدارک مورد نیاز ضامن ",
    },
  ];

  const firstTabItems = [
    "برگه عضویت سامانه ثنا",
    "چک صیاد بنفش رنگ ثبتی",
    "اصل مدارک هویتی",
    "اسناد مثبته شغلی",
    "پرینت میانگین و معدل حساب",
    "اجاره نامه ی ا کپی سند مسکونی",
  ];

  const secondTabItems = [
    {
      title: "تا سقف مبلغ 300 ملیون وام",
      zamen: "بدون ضامن",
    },
    {
      title: "مبلغ 300 تا 600 ملیون وام نیازمند",
      zamen: "یک ضامن",
    },
    {
      title: "مبلغ 600 ملیون تا 1 میلیارد تومان نیازمند",
      zamen: "دو ضامن",
    },
  ];

  const thirdTabItems = [
    "چک صیاد بنفش رنگ ثبتی",
    "برگه سامانه ثنا و مدارک شناسایی ",
    "پرینت حساب",
    "اجاره نامه یا کپی سند مسکونی",
  ];

  const handleClick = (position) => {
    setTabClick(position);
  };

  return (
    <div
      className="flex flex-col mt-10"
      style={{
        background:
          " linear-gradient(264.65deg, #1242E0 4.15%, rgba(37, 109, 133, 0.8) 113.26%)",
      }}
    >
      <h1 className="text-white text-center my-8 text-xl font-bold">
        شرایط و مدارک موردنیاز برای خرید اقساطی{" "}
      </h1>
      <div className="flex bg-blue-600 justify-center lg:gap-10 md:gap-4 gap-2 md:py-6 py-2 md:px-4 px-2">
        {tabs.map((item, index) => {
          return (
            <div
              onClick={() => handleClick(index)}
              className={`max-w-[200px] md:w-full w-fit h-10 px-3 cursor-pointer md:py-2 py-1 border md:text-base text-sm ${
                tabClick == index
                  ? "text-blue bg-gray-150 font-medium"
                  : "bg-blue font-light text-white"
              } border-white rounded-full flex transition-all justify-center items-center hover:bg-white hover:text-blue`}
              key={index}
            >
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>
      <div className="md:h-[16rem] h-[24rem] flex gap-4 justify-center items-center py-4 px-6">
        {tabClick == 0 ? (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {firstTabItems.map((item) => {
              return (
                <div className="flex items-center gap-2">
                  <div className="rounded-full w-10 h-10 bg-blue-200"></div>
                  <p className="text-white font-medium" key={item}>
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        ) : tabClick == 1 ? (
          <ul className="text-white font-light flex flex-col gap-4 mx-auto md:list-disc list-none">
            {secondTabItems.map(({ title, zamen }) => {
              return (
                <li className="font-light">
                  {title} <span className="font-medium underline">{zamen}</span>
                </li>
              );
            })}{" "}
          </ul>
        ) : (
          <ul className="text-white flex flex-col gap-4 list-disc">
            {thirdTabItems.map((item) => (
              <li className="font-medium">{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TabsInstallment;
