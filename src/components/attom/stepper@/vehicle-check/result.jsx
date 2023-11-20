import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import PdfComponent from "@/attom/pdf/report-temlate";
import VahicleResultChart from "@/attom/chart/vahicle-result-chart";
import CarFaselagecategoryTab from "./steps/car-fuselage-tab";
import CarEngineTab from "./steps/car-engine-tab";
import CarSuspensionsTab from "./steps/car-suspensions-tab";
import CarInnerSystemTab from "./steps/car-inner-system-tab";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Result = ({ setActiveStep }) => {
  const [value, setValue] = React.useState(0);

  const editButtonHandler = () => {
    setActiveStep(0);
  };

  //score of step levels
  const carFuselageScore = useSelector((state) => state.carFuselage);
  const carInnerSystemScore = useSelector((state) => state.carInnerSystem);
  const carEngineScore = useSelector((state) => state.carEngine);
  const carSuspensionsSystemScore = useSelector(
    (state) => state.carSuspensionsSystem
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const categories = [
    {
      label: "بدنه و لاستیک  ",
      content: <CarFaselagecategoryTab />,
      score: carFuselageScore.score,
      total: 362,
    },
    {
      label: "سیستم برقی و داخلی   ",
      content: <CarInnerSystemTab />,
      score: carInnerSystemScore.score,
      total: 49,
    },
    {
      label: "موتور  ",
      content: <CarEngineTab />,
      score: carEngineScore.score,
      total: 163,
    },
    {
      label: "سیستم تعلیق",
      content: <CarSuspensionsTab />,
      score: carSuspensionsSystemScore.score,
      total: 45,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="grid md:grid-cols-4 grid-cols-2 mt-10">
          {categories.map((category, index) => (
            <div
              className={`flex flex-col items-center justify-center gap-4 ${
                index !== 3 && "md:border-l md:border-grey-disabled"
              }`}
            >
              <span className="block text-center font-bold md:text-lg">
                امتیاز {category.label}
              </span>
              <VahicleResultChart
                scoreData={[
                  Math.floor((category.score * 100) / category.total),
                ]}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mx-auto gap-5">
          <PdfComponent
            carFuselageScore={carFuselageScore}
            carInnerSystemScore={carInnerSystemScore}
            carEngineScore={carEngineScore}
            carSuspensionsSystemScore={carSuspensionsSystemScore}
          />
          <button
            className="text-grey border border-blue text-sm px-5 py-2 rounded-lg flex gap-2"
            onClick={editButtonHandler}
          >
            ویرایش اطلاعات
          </button>
        </div>

        <Box sx={{ width: "100%" }}>
          <Box>
            <Tabs
              variant="scrollable"
              scrollButtons
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                style: { backgroundColor: "#1242E0", borderBottom: "1" },
              }}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                minHeight: "auto",
              }}
              centered
            >
              {categories.map((category, index) => (
                <Tab
                  sx={{
                    borderBottom: "#818181 2px solid",
                    background: "#FAFAFA",
                    margin: { xs: "0 .5em", md: "0 auto" },
                    borderRadius: "5px 5px 0 0",
                    fontSize: { xs: "15px", md: "18px" },
                    padding: {
                      xs: ".5em 1em",
                      md: ".5rem 1rem",
                      lg: "1rem 2rem",
                    },
                    fontWeight: "bold",
                    color: "#000",
                    width: { xs: "auto", md: "20%" },
                    minHeight: "auto",
                  }}
                  label={category.label}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
          {categories.map((category, index) => (
            <TabPanel value={value} index={index}>
              {category.content}
            </TabPanel>
          ))}
        </Box>
      </div>
    </>
  );
};

export default Result;
