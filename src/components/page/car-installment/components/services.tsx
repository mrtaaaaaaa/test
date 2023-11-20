import { img } from "@/data";

const Servicess = () => {
  const detail = [
    {
      title: "کمترین پیش پرداخت",
      descrption: `تنها با ‌پرداخت 40 درصد قیمت خودرو
      مالک خودرو شوید`,
      icon: img.info_cards_1.src,
    },
    {
      title: "کمترین کارمزد",
      descrption: `
     در بازار فروش اقساطی خودرو، ما کمترین کارمزد رو دریافت می‌کنیم.
      `,
      icon: img.info_cards_2.src,
    },
    {
      title: "کمترین مدارک",
      descrption: `
       با ارائه کارت‌ملی و برگه سامانه ثنا،
تسهیلات خرید خودرو دریافت کنید
      `,
      icon: img.info_cards_3.src,
    },
    {
      title: "کمترین زمان",
      descrption: `
      خرید اقساطی خودروی مورد نظرتان را در سریع‌ترین زمان تجربه کنید
      `,
      icon: img.info_cards_4.src,
    },
  ];

  return (
    <>
      <div className="grid lg:gap-8 gap-4 grid-cols-2 md:grid-cols-4 md:mt-24 mt-16">
        {detail.map((item, index) => {
          return (
            <div
              style={{
                borderImage: " linear-gradient(to right, #E0EBFF, #F3F7FF) 1",
              }}
              className="flex flex-col lg:h-[22rem]  bg-gradient-to-br from-[#F7FEFE]  to-[#EBF1F9] gap-3 lg:p-8 p-4 justify-center items-center rounded-3xl"
              key={index}
            >
              <img src={item.icon} />
              <h4 className="font-bold font-bols text-lg text-center">
                {item.title}
              </h4>
              <p className="text-center leading-relaxed md:text-base text-sm">
                {item.descrption}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Servicess;
