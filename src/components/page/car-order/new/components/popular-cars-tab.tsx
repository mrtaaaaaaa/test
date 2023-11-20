"use client";
import { img } from "@/data";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import * as React from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <span>{children}</span>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PopularCarsTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const carTypes = [
    {
      title: "داخلی",
      data: [
        { img: img.car_206_img.src, name: "206" },
        { img: img.car_quik_img.src, name: "کوئیک" },
        { img: img.car_tiba_img.src, name: "تیبا" },
        { img: img.car_dena_img.src, name: "دنا پلاس" },
      ],
    },
    {
      title: "خارجی",
      data: [
        { img: img.car_serato_img.src, name: "سراتو آپشنال" },
        { img: img.car_mazda_img.src, name: "مزدا۳" },
        { img: img.car_206_img.src, name: "جکS5" },
        { img: img.car_haima_img.src, name: "هایما ۷" },
      ],
    },
    {
      title: "وارداتی",
      data: [
        { img: img.car_Santafe_img.src, name: "هیوندای سانتافه" },
        { img: img.car_tucson_img.src, name: "توسان" },
        { img: img.car_Seratovaredati_img.src, name: "سراتو وارداتی" },
        { img: img.car_optima_img.src, name: "اپتیما" },
      ],
    },
  ];

  return (
    <div>
      <span className="block text-center font-bold tablet:text-2xl text-xl mb-6">
        خودروهای محبوب خریداران
      </span>
      <Box sx={{ width: "100%" }}>
        <Box>
          <Tabs
            className="car-brands-tab"
            value={value}
            onChange={handleChange}
            centered
            sx={{ "& .MuiTabs-indicator": { display: "none" }, all: "unset" }}
          >
            {carTypes.map(({ title }, index) => (
              <Tab
                label={title}
                {...a11yProps(index)}
                sx={{ all: "unset" }}
              ></Tab>
            ))}
          </Tabs>
        </Box>
        {carTypes.map(({ data }, index) => (
          <TabPanel value={value} index={index}>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
              {data.map((data) => (
                <div className="relative">
                  <img src={data.img} alt={data.name} className="lg:h-56" />
                  <span className="absolute text-white font-bold bottom-5 text-center text-lg m-auto left-0 right-0">
                    {data.name}
                  </span>
                </div>
              ))}
            </div>
          </TabPanel>
        ))}
      </Box>
    </div>
  );
}
