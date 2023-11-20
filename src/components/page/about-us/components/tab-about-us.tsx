"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import PropTypes from "prop-types";
import * as React from "react";
import Tab1 from "./tab1";
import Tab4 from "./tab4";
import Tab6 from "./tab6";


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

const TabAboutUs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabsTitle = [
    {
      title: "درباره ما",
      a11yProps: 0,
      content: <Tab1 />,
    },
    {
      title: "ارزش‌های سازمانی",
      a11yProps: 1,
      content: <Tab4 />,
    },
    {
      title: "تماس با ما",
      a11yProps: 2,
      content: <Tab6 />,
    },
  ];

  return (
    <Box sx={{ width: "100%", marginTop: "1rem" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: { xs: 320, sm: 400, md: "fit-content" },
          margin: "auto",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: { backgroundColor: "#1242E0", color: "#1242E0" },
          }}
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs example"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0 },
            },
          }}
        >
          {TabsTitle.map((tab) => (
            <Tab
              label={tab.title}
              {...a11yProps(tab.a11yProps)}
              sx={{
                fontSize: "1.01rem",
                margin: { sm: "0 .5rem", md: "0 1rem" },
              }}
            />
          ))}
        </Tabs>
      </Box>
      {TabsTitle.map(({ content, a11yProps }) => (
        <TabPanel value={value} index={a11yProps}>
          {content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default TabAboutUs;
