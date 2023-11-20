import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  ADD_INSURNCE,
  insuranceSelector,
} from "@/redux/insurance/insurance-slice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useFormik } from "formik";
import { TickSquare } from "iconsax-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TimeData } from "src/data/static-data/insurance";
import * as Yup from "yup";
import GetStaticDatasNotSSRAPI from "@/apis/static-datas/get-static-datas-not-ssr.api";
import SelectCustom from "../form@/components@/select@/select-custom";

const style = {
  boxShadow: "none",
  background: "#FAFAFA",
  margin: "15px 0",
  "&:before": {
    backgroundColor: "transparent !important",
  },
  borderRadius: "10px",
  padding: "10px",
};

const InsuranceItem = ({ title }: { title: string }) => {
  const [insuranceList, setInsuranceList] = useState([]);

  useEffect(() => {
    (async () => {
      const { insurances } = await GetStaticDatasNotSSRAPI({
        endPoint: "/Insurance/Get/All",
      });
      setInsuranceList(insurances);
    })();
    // GetStaticDataAPI({ endPoint: "/Insurance/Get/All" })
    //   .then((res) => setInsuranceList(res.insurances))
    //   .catch((err) => toast.error("متاسفانه خطایی رخ داده است."));
  }, []);

  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const { insurances } = useAppSelector(insuranceSelector);
  const index = insurances?.findIndex((object) => {
    return object.type === title;
  });

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  const currentInsurance = insurances?.filter((item) => item.type == title);

  const initialValues = {
    type: title,
    provider:
      currentInsurance && currentInsurance[0]?.provider
        ? currentInsurance && currentInsurance[0]?.provider
        : "",
    expireDate:
      currentInsurance && currentInsurance[0]?.expireDate
        ? currentInsurance[0]?.expireDate
        : "",
  };

  const onSubmit = (values) => {
    dispatch(ADD_INSURNCE(values));
    setExpanded(false);
  };

  const validationSchema = Yup.object({
    provider: Yup.string()
      .required("انتخاب شرکت بیمه الزامی است")
      .matches(/^[\u0600-\u06FF\s]+$/, "مقدار وارد شده صحیح نیست."),
    expireDate: Yup.string()
      .required("انتخاب مدت باقی‌مانده الزامی است")
      .matches(/^[\u0600-\u06FF\s]+$/, "مقدار وارد شده صحیح نیست."),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <Accordion
      expanded={expanded === "panel"}
      onChange={handleChange("panel")}
      sx={style}
    >
      <AccordionSummary
        expandIcon={<KeyboardArrowDownIcon />}
        sx={{
          background: "#fff",
          ".muirtl-o4b71y-MuiAccordionSummary-content": {
            margin: "0!important",
          },
          borderRadius: "8px",
        }}
      >
        <div className="flex items-center gap-4">
          {index === -1 ? (
            <span className="border border-gray-500 w-[20px] h-[20px] rounded m-[2px]"></span>
          ) : (
            <span>
              <TickSquare size="22" color="#1242E0" variant="Bold" />
            </span>
          )}
          <span className="font-medium">{title}</span>
        </div>
      </AccordionSummary>

      <AccordionDetails sx={{ padding: "0" }}>
        <form
          className="bg-[#D4E1E5] w-full p-5 mt-2 rounded flex flex-col justify-center items-center"
          // onSubmit={}
        >
          <div className="w-full flex flex-col gap-4">
            <SelectCustom
              options={insuranceList}
              formik={formik}
              name="provider"
              label="شرکت بیمه"
            />

            <SelectCustom
              options={TimeData}
              formik={formik}
              name="expireDate"
              label="مدت باقی‌مانده اعتبار بیمه"
            />
          </div>

          <button
            className="bg-blue text-white py-2 rounded-lg mx-auto w-fit px-6 mt-8"
            type="button"
            onClick={formik.handleSubmit}
          >
            ثبت اطلاعات
          </button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default InsuranceItem;
