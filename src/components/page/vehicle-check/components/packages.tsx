"use client";
import { checkExistWindow } from "@/utils/check-exist-window";
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

export default function VehicleCheckPacks() {
  const [isGray, setIsGray] = useState(5);

  const navigate = useRouter();

  const handleClick = (id: number) => {
    const auth = checkExistWindow()
      ? Boolean(localStorage.getItem("userToken"))
      : "";
    if (auth) {
      navigate.push(`/vehicle-check/${id}`);
    } else {
      navigate.push("/auth/check");
    }
  };

  const handleMouseEnter = (id: number) => {
    setIsGray(id);
  };

  return (
    <div className="md:flex hidden  tablet:h-[30rem] h-fit justify-center items-end">
      <div className="grid tablet:grid-cols-3 md:grid-cols-2 grid-cols-2 xl:w-4/5 m-auto lg:gap-8 gap-4 items-end ">
        {cards.map(({ title, desc, off, id, listItems }) => {
          return (
            <div
              className={`border flex flex-col justify-between transition-all	duration-200 px-2 pb-6 rounded-lg  corner-ribbon relative h-fit ${
                isGray == id
                  ? "bg-blue text-white pt-32"
                  : "bg-blue-100 text-gray pt-20 "
              } ${off == 35 && isGray == 5 && "bg-blue text-white "}`}
              onMouseEnter={() => handleMouseEnter(id)}
              onMouseLeave={() => setIsGray(5)}
            >
              {off && (
                <div class="left-[0] absolute top-0 h-[8rem] w-[8rem] overflow-hidden">
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

              {/* <div className="mt-8 pl-0 px-6 flex flex-col gap-2">
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
                </div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function VehicleCheckPacksMobile() {
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
                <div class="left-[0] absolute top-0 h-[8rem] w-[8rem] overflow-hidden">
                  <div class="corner-ribbon__ribbon transition-all	duration-100 text-sm absolute left-[0.4rem] top-[2.5rem] h-[1.5rem] w-[10rem] text-center bg-white text-blue">
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
