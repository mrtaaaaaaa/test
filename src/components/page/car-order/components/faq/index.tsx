import FAQ from "@/attom/faq/faq";
import React from "react";
import { data } from "./car-order-faq";

const CarOrderFAQ = () => {
  const accordionValue = [
    {
      title: data.q1.title,
      desc: [
        {
          paragraph: {
            desc: data.q1.content,
          },
        },
      ],
      open: true,
    },
  ];
  return (
    <div>
      <FAQ accordionValue={accordionValue} />
    </div>
  );
};

export default CarOrderFAQ;
