import VehicleCheckStepsDesktop from "@/assets/images/vehicleCheckSteps/vahicleCheckSteps.png";
import VehicleCheckStepsMobile from "@/assets/images/vehicleCheckSteps/vahicleCheckStepsMobile.png";
import { img } from "@/data";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { TickSquare } from "iconsax-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";

const cards = [
  {
    title: "کارشناسی 1 خودرو",
    desc: " امکانات این پکیج  شامل کارشناسی یک خودرو توسط کارشناسان خبره متاخودرو است. اعتبار استفاده از خدمات کارشناسی  پکیج 21روز است. پس از این بازه، اعتبار پکیج منقضی گردیده و مبلغ باقی مانده قابل استرداد نخواهد بود.",
    off: "",
    listItems: ["ارائه گزارش حرفه‌ای کارشناسی", "ضمانت کارشناسی"],
    id: 1,
  },
  {
    title: "کارشناسی 5 خودرو",
    desc: " امکانات این پکیج  شامل کارشناسی پنج خودرو با تخفیف 35 درصد، توسط کارشناسان خبره متاخودرو است.  اعتبار استفاده از خدمات کارشناسی  پکیج 21روز است. پس از این بازه، اعتبار پکیج منقضی گردیده و مبلغ باقی مانده قابل استرداد نخواهد بود.",
    off: "35",
    listItems: ["تخفیف ویژه", "ضمانت کارشناسی"],
    id: 5,
  },
  {
    title: "کارشناسی 3 خودرو",
    desc: "امکانات این پکیج  شامل کارشناسی سه خودرو با تخفیف 20 درصد، توسط کارشناسان خبره متاخودرو است. اعتبار استفاده از خدمات کارشناسی  پکیج 21روز است.پس از این بازه، اعتبار پکیج منقضی گردیده و مبلغ باقی مانده قابل استرداد نخواهد بود.",
    off: "20",
    listItems: ["ارائه گزارش حرفه‌ای کارشناسی", "ضمانت کارشناسی"],
    id: 3,
  },
];

export const CardsVehicleCheck = () => {
  const [isGray, setIsGray] = useState(5);

  const navigate = useRouter();

  const handleClick = (id) => {
    navigate.push(`/vehicle-check/${id}`);
  };

  const handleMouseEnter = (id) => {
    setIsGray(id);
  };

  return (
    <div className="md:flex hidden  tablet:h-[30rem] h-fit justify-center items-end">
      <div className="grid tablet:grid-cols-3 md:grid-cols-2 grid-cols-2 xl:w-4/5 md:px-0 px-8 m-auto lg:gap-8 gap-4 items-end ">
        {cards.map(({ title, desc, off, id }) => {
          return (
            <div
              className={`border flex flex-col justify-between transition-all	duration-200 px-2 pb-6 rounded-lg  corner-ribbon relative h-fit ${
                isGray == id
                  ? "bg-blue text-white pt-32"
                  : "bg-blue-100 text-gray pt-20 "
              } ${off == 35 && isGray == 5 && "bg-blue text-white"} ${
                id == 5 &&
                "tablet:order-1 md:order-first tablet:col-span-1 md:col-span-2 tablet:mt-0 md:mt-8"
              }`}
              onMouseEnter={() => handleMouseEnter(id)}
              onMouseLeave={() => setIsGray(5)}
            >
              {off && (
                <div className="left-[0] absolute top-0 h-[8rem] w-[8rem] overflow-hidden">
                  <div
                    class={`corner-ribbon__ribbon transition-all	duration-100 text-sm absolute left-[0.4rem] top-[2.5rem] h-[1.5rem] w-[10rem] text-center  ${
                      isGray == id ? "bg-white text-blue" : "bg-blue text-white"
                    }`}
                  >
                    <span>
                      {" "}
                      <b>{off}٪</b> تخفیف
                    </span>
                  </div>
                </div>
              )}

              <span
                className={`block font-bold text-center transition-all duration-200  ${
                  isGray == id ? "text-xl text-white" : "text-lg text-gray"
                }`}
              >
                {title}
              </span>

              <p className="text-justify p-3 text-sm font-light">{desc}</p>
              <button
                className={`border px-4 py-2 rounded transition-all	duration-200 w-4/5 mx-auto ${
                  isGray == id
                    ? "bg-white text-blue"
                    : "bg-white text-blue border border-blue"
                }`}
                onClick={() => handleClick(id)}
              >
                درخواست کارشناسی
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function MobileAccordion() {
  const [expanded, setExpanded] = React.useState(5);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const navigate = useRouter();

  const handleClick = (id) => {
    navigate.push(`/vehicle-check/${id}`);
  };

  return (
    <div className="md:hidden flex flex-col gap-5">
      {cards.map(({ title, desc, off, listItems, id }) => (
        <Accordion
          expanded={expanded === id}
          onChange={handleChange(id)}
          sx={{
            boxShadow: "none",
            border: "1px solid #C9CBD1",
            background: "rgba(37, 109, 133, 0.05)",
            borderRadius: "10px!important",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{ padding: ".7rem" }}
          >
            <div className="flex gap-10 pr-2">
              <span className="font-bold">{title}</span>
              {off && (
                <span className="text-xs bg-blue text-white font-bold px-2 py-1 rounded-lg">
                  {off}% تخفیف
                </span>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={`border flex flex-col justify-between transition-all	duration-500 px-2 pt-20 pb-6 rounded-lg corner-ribbon relative h-fit bg-blue text-white`}
            >
              {off && (
                <div className="left-[0] absolute top-0 h-[8rem] w-[8rem] overflow-hidden">
                  <div className="corner-ribbon__ribbon transition-all	duration-100 text-sm absolute left-[0.4rem] top-[2.5rem] h-[1.5rem] w-[10rem] text-center bg-white text-blue">
                    <span>
                      {" "}
                      <b>{off}٪</b> تخفیف
                    </span>
                  </div>
                </div>
              )}

              <span className="block text-lg font-bold text-center title text-white">
                {title}
              </span>

              <p className="text-justify p-3 text-sm font-light">{desc}</p>
              <button
                className="border px-4 py-2 rounded transition-all	duration-200 w-4/5 mx-auto bg-white text-blue"
                onClick={() => handleClick(id)}
              >
                درخواست کارشناسی
              </button>

              <div className="mt-8 pl-0 px-6 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <TickSquare size="18" />
                  <span>{title}</span>
                </div>
                {listItems.map((item) => (
                  <div className="flex items-center gap-2">
                    <TickSquare size="18" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export const AdvantagesOfAutomotive = () => {
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

export const WhyVehicleCheckWithUs = () => {
  const tipBoxes = [
    {
      title: "آرامش خاطر",
      img: img.peace_of_mind.src,
      desc: "با استفاده از کارشناسی متاخودرو، نسبت به سلامت فنی و بدنه خودرو اطمینان حاصل خواهید کرد",
    },
    {
      title: "بهترین قیمت",
      img: img.trade.src,
      desc: "متاخودرو سعی می‌کند ارزش‌گذاری واقعی و منصفانه از قیمت خودرو به شما ارائه دهد",
    },
    {
      title: "ضمانت‌نامه",
      img: img.for_you.src,
      desc: "متاخودرو نتیجه بررسی فنی و بدنه خودرو را پس از کارشناسی به دو صورت آنلاین و نسخه چاپی به شما ارائه می‌دهد",
    },
  ];

  return (
    <div className="">
      <div className="flex flex-wrap gap-1 font-bold justify-center md:text-2xl text-xl mb-8">
        <span>چرا</span>
        <span className="text-blue whitespace-nowrap">کارشناسی خودرو</span>
        <span className="font-bold whitespace-nowrap">با متاخودرو؟</span>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7">
        {tipBoxes.map(({ title, desc, img }) => {
          return (
            <div>
              <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-lg ">
                <img src={img} />
                <span className="font-bold block text-lg">{title}</span>
                <p className="text-center text-sm">{desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const VehicleCheckSteps = () => {
  const vehicleCheckStepsItems = [
    {
      title: "خرید پکیج کارشناسی خودرو",
      desc: " کارشناسان متاخودرو، با حضور در قرار بازدید، مسائل فنی و حقوقی معامله‌ را تضمین می‌کنند.",
    },
    {
      title: "ثبت درخواست کارشناسی خودرو",
      desc: " کارشناسان متاخودرو، با حضور در قرار بازدید، مسائل فنی و حقوقی معامله‌ را تضمین می‌کنند.",
    },
    {
      title: "هماهنگی قرار کارشناسی",
      desc: " کارشناسان متاخودرو، با حضور در قرار بازدید، مسائل فنی و حقوقی معامله‌ را تضمین می‌کنند.",
    },
    {
      title: "حضور تیم کارشناسی متاخودرو",
      desc: " کارشناسان متاخودرو، با حضور در قرار بازدید، مسائل فنی و حقوقی معامله‌ را تضمین می‌کنند.",
    },

    {
      title: "ارزیابی تخصصی خودرو",
      desc: " کارشناسان متاخودرو، با حضور در قرار بازدید، مسائل فنی و حقوقی معامله‌ را تضمین می‌کنند.",
    },
  ];
  return (
    <div className="flex flex-col gap-6  justify-center">
      <div className="text-center xl:text-2xl text-xl md:flex hidden justify-center items-center font-bold">
        <span className="">مراحل درخواست </span>
        <span className="text-blue ">کارشناسی خودرو</span>
      </div>
      <img
        className="w-11/12 mx-auto md:block hidden"
        src={img.vahicle_check_steps.src}
      />
      <div className="mx-auto md:hidden flex">
        <img className="" src={VehicleCheckStepsMobile} />
        <div className="flex flex-col justify-between mt-3">
          <span className="text-lg font-bold">
            مراحل درخواست <span className="text-blue">کارشناسی خودرو</span>
          </span>
          {vehicleCheckStepsItems.map(({ title, desc }) => (
            <div>
              <span className="text-blue font-medium text-sm">{title}</span>
              <p className="font-normal text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
