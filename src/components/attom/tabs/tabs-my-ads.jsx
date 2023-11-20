import Tab from "@mui/material/Tab";
import Tabs, { tabsClasses } from "@mui/material/Tabs";

import httpService from "@/services/http-service";
import { FRONT2DB } from "@/config/url";
import moment from "jalali-moment";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import Alert from "../alerts/alert";
import { Loading } from "../loading/loading";
import CardMyAd from "../cards/panel@/card-my-ad/card-my-ad";
import CustomSelectBox from "../form@/components@/select@/custom-select-box";

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
      {value === index && <div className="mt-8">{children}</div>}
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

export default function TabsMyAds({ setDataFetching, dataFetching }) {
  const { userInfo } = useSelector((state) => state.auth);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const unixTimestamp = (days) =>
    Math.floor(
      new Date(moment().subtract(days, "days").format("YYYY/MM/DD")).getTime() /
        1000
    );

  let timeFiltering = [
    { name: "3 روز گذشته", value: unixTimestamp(3) },
    { name: "7 روز گذشته", value: unixTimestamp(7) },
    { name: "ماه گذشته", value: unixTimestamp(30) },
    { name: "نمایش همه آگهی‌ها", value: -1 },
  ];

  const changeSelectBoxHandler = (e) => {
    setDataFetching({
      ...dataFetching,
      isLoading: true,
    });
    let data = {
      start_time: e.target.value,
      end_time: -1,
      ascending: true,
    };

    const postData = new FormData();
    postData.append("start_time", data.start_time);
    postData.append("end_time", data.end_time);
    postData.append("ascending", data.ascending);

    httpService
      .post(`${FRONT2DB}/AdSale/Get/User/${userInfo?.phone_number}`, postData)
      .then((res) => {
        setDataFetching({
          ...dataFetching,
          isLoading: false,
          data: res.data.ads,
        });
      })
      .catch((err) => console.log(err));
  };

  const data = dataFetching.data;

  let isWaitToConfirm =
    data?.length &&
    data.filter((product) => product.publication_status == "waitToConfirm");
  let isLive =
    data?.length &&
    data.filter((product) => product.publication_status == "live");
  let isSoonToExpire =
    data?.length &&
    data.filter((product) => product.publication_status == "soonToExpire");
  let isExpired =
    data?.length &&
    data.filter((product) => product.publication_status == "expired");

  return (
    <div>
      <div className="flex items-center lg:flex-row flex-col lg:border-b lg:border-gray-200 justify-between">
        <div className="w-[-webkit-fill-available] md:w-full sm:w-[400px] lg:border-0 border-b border-gray-200">
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
            <Tab
              label="در انتظار تایید"
              {...a11yProps(0)}
              sx={{ minHeight: "53px", fontSize: { sm: "16px", xs: "12px" } }}
            />
            <Tab
              label="منتشر شده"
              {...a11yProps(1)}
              sx={{ minHeight: "53px" }}
            />
            <Tab
              label=" نزدیک به انقضا"
              {...a11yProps(2)}
              sx={{ minHeight: "53px" }}
            />
            <Tab
              label=" منقضی شده "
              {...a11yProps(3)}
              sx={{ minHeight: "53px" }}
            />
          </Tabs>
        </div>

        <div className="pb-3 lg:w-[15rem] lg:text-md text-sm lg:mt-0 mt-2 mr-auto">
          <CustomSelectBox
            normalData={true}
            data={timeFiltering}
            onChange={changeSelectBoxHandler}
            title="فیلتر بازه زمانی"
            customStyle={" border px-3 rounded-lg"}
          />
        </div>
      </div>

      {dataFetching.isLoading ? (
        <Loading />
      ) : dataFetching.isError ? (
        <Alert type="error" title="متاسفانه خطایی رخ داده است" />
      ) : dataFetching.data == null ? (
        <Alert type="error" title="آگهی ثبت نشده است" />
      ) : (
        <>
          <TabPanel value={value} index={0}>
            {isWaitToConfirm.length ? (
              isWaitToConfirm.map((product) => (
                <CardMyAd key={product.advertiser_id} product={product} />
              ))
            ) : (
              <Alert type="error" title=" آگهی در انتظار تایید ندارید" />
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {isLive.length ? (
              isLive.map((product) => (
                <CardMyAd key={product.advertiser_id} product={product} />
              ))
            ) : (
              <Alert type="error" title=" آگهی منتشر شده‌ای ندارید" />
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {isSoonToExpire.length ? (
              isSoonToExpire.map((product) => (
                <CardMyAd key={product.advertiser_id} product={product} />
              ))
            ) : (
              <Alert type="error" title=" آگهی در حال انقضا ندارید" />
            )}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {isExpired.length ? (
              isExpired.map((product) => (
                <CardMyAd key={product.advertiser_id} product={product} />
              ))
            ) : (
              <Alert type="error" title=" آگهی منقضی شده ندارید" />
            )}
          </TabPanel>
        </>
      )}
    </div>
  );
}
