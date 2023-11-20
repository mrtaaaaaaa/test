"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { AddSquare, MinusSquare } from "iconsax-react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const FAQ = ({ accordionValue, isMore }: { accordionValue: any[] }) => {
  const [expanded, setExpanded] = useState<number | boolean>(-1);
  const [isExpanded, setIsExpanded] = useState<number | boolean>(false);

  const handleChange = (panel: number) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
    setIsExpanded(panel);
  };

  return (
    <div className="mt-20 lg:w-1/2 md: w-[100vw - 40px] mx-auto ">
      <span className="font-bold tablet:text-2xl p-5 text-xl mt-14 mb-6 text-center block bg-dark-d_2 text-white">
        سوالات متداول
      </span>
      <div className="mx-auto pb-20">
        {accordionValue?.map((item, index) => {
          return (
            <>
              <Accordion
                style={{ margin: "16px 0px" }}
                expanded={expanded === index}
                onChange={handleChange(index)}
                className="custom-accordion py-5 bg-[#fff] border border-[#E0E0E2] m-0"
              >
                <AccordionSummary
                  expandIcon={
                    isExpanded === index && expanded === index ? (
                      <MinusSquare size="16" color="#3A3D42" />
                    ) : (
                      <AddSquare size="16" color="#3A3D42" />
                    )
                  }
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className="text-[#151618] font-bold">
                    {item.title}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails className="car-order-acc">
                  {item.mainTitle && (
                    <h2 className="text-center mb-5">{item.mainTitle}</h2>
                  )}
                  {item.desc.map(
                    ({
                      paragraph,
                    }: {
                      paragraph: {
                        title: string;
                        desc: string;
                        component: string;
                      };
                    }) => (
                      <>
                        <p className="text-justify text-[#7B808C] leading-relaxed mb-2">
                          {paragraph.title && (
                            <span className="font-medium text-[#5A6276] ">
                              {paragraph.title}
                            </span>
                          )}
                          <div
                            dangerouslySetInnerHTML={{ __html: paragraph.desc }}
                            className="border-solid border-0 border-r-2 border-[#E0E0E2] pr-2"
                          />
                        </p>
                        {paragraph.component}
                      </>
                    )
                  )}
                </AccordionDetails>
              </Accordion>
            </>
          );
        })}
        {isMore && (
          <div className="flex gap-2 items-center justify-center">
            <p>
              <IoIosArrowDown />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
