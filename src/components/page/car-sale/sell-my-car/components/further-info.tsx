import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import KeyWord from "@/attom/form@/components@/key-word/key-word";
import { SelectBox } from "@/attom/form@/components@/select@/select-box";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";
import { staticData } from "@/data";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import * as React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ExpireDate from "./expire-date";
import InsurancesCarSale from "./insurances-car-sale";
import ImageUploader from "@/attom/form@/components@/file-uploader/file-uploader";

interface FurtherInfoProps {
  formik: object;
  showSearched: any;
  setShowSearched: React.Dispatch<React.SetStateAction<string>>;
  imgsSrc: string;
  setImgsSrc: React.Dispatch<React.SetStateAction<string>>;
}

const FurtherInfo = ({
  formik,
  showSearched,
  setShowSearched,
  imgsSrc,
  setImgsSrc,
}: FurtherInfoProps) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel: string) => (event, isExpanded) => {
    event.preventDefault();
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <div className="my-8 pb-6 border-b border-b-gray-150">
        <h2 className="text-blue font-bold text-xl">
          اطلاعات تکمیلی آگهی خودرو
        </h2>

        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          sx={{ all: "unset" }}
        >
          <AccordionSummary>
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-4 items-center justify-between w-full">
              <span className="block mt-2 font-medium">
                تکمیل این اطلاعات، کیفیت آگهی را افزایش داده و باعث اعتماد
                خریدار و بالا رفتن شانس فروش شما می‌شود.
              </span>
              <button className="text-xs bg-blue text-white px-6 py-3 rounded-lg font-light flex items-center gap-4">
                اطلاعات تکمیلی خودرو را وارد کنید
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 items-start mb-10 mx-auto">
              <SelectBox
                formik={formik}
                options={staticData.gearbox_type}
                name="gear_box_type"
                label="گیربکس"
              />

              <SelectBox
                formik={formik}
                options={staticData.car_chassis_damaged_type}
                name="car_chassis_damaged"
                label="وضعیت شاسی"
              />
              <SelectBox
                formik={formik}
                options={staticData.car_madeaboard_Type}
                name="is_car_made_aboard"
                label="نوع تولید"
              />

              <SelectBox
                formik={formik}
                options={staticData.fuel_types}
                name="fuel_type"
                label="نوع سوخت"
              />
              <SelectBox
                formik={formik}
                options={staticData.technical_diagnosis_type}
                name="technical_diagnosis"
                label="معاینه فنی"
              />
              <FormInput
                formik={formik}
                label="درصد سلامت لاستیک"
                name="tire_health_percentage"
                placeholder="1"
                type="number"
                showEndAdorMent={true}
                showEndAdorMentValue="٪"
              />
            </div>

            {/* اطلاعات بیمه */}
            <InsurancesCarSale />

            {/* افزودن کلیدواژه */}
            <KeyWord
              showSearched={showSearched}
              setShowSearched={setShowSearched}
            />

            {/* مدت زمان اعتبار هر آگهی */}
            <ExpireDate formik={formik} />

            {/* توضیحات و بارگذاری عکس */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8 my-8 border-t border-t-gray-200 pt-8">
              <CustomTextarea
                formik={formik}
                label="توضیحات"
                name="description"
                placeholder="توضیحات"
                row={14}
              />

              <ImageUploader
                title="عکس‌های مورد نظر خود را بارگذاری کنید"
                imgsSrc={imgsSrc}
                setImgsSrc={setImgsSrc}
                imageCount="20"
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default FurtherInfo;
