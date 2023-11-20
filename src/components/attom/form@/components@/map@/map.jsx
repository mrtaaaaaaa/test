"use client";
import { img } from "@/data";
import { ADD_DISTANCE } from "@/redux/filter/filter-slice";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useAppDispatch } from "src/hooks/redux-hooks";
import MapComponent from "./map-component";
import "leaflet/dist/leaflet.css";
import CustomSelectBox from "../select@/custom-select-box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, md: 500, tablet: 550, lg: 600, xl: 700 },
  bgcolor: "background.paper",
  boxShadow: 15,
  border: 0,
  p: 3,
  borderRadius: "1em",
};

export default function MapModal({
  hasDistance = true,
  inSearch = false,
  classes,
  formik,
  name,
}) {
  const [open, setOpen] = useState(false);
  const [markerPosition, setMarkerPosition] = useState([35.6892, 51.389]);

  let arrayOfDistances = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, "بیشتر از 50"];

  const dispatch = useAppDispatch();

  const handleSelectChange = (e) => {
    dispatch(ADD_DISTANCE(+e.target.value));
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes}>
      <div className="relative h-full">
        <img
          src={img.map_bg.src}
          alt="map"
          className={`w-full ${
            inSearch ? "h-46" : "h-full"
          } rounded-lg cursor-pointer`}
        />
        <button
          type="button"
          className="bg-blue text-white absolute top-0 bottom-0 left-0 right-0 m-auto px-8 py-3 rounded-lg w-fit h-fit text-sm"
          onClick={handleOpen}
        >
          <LocationOnIcon />
          {markerPosition[0] == 35.6892 && markerPosition[1] == 51.389
            ? " ثبت محدوده جغرافیایی"
            : "ویرایش محدوده جغرافیایی"}
        </button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="mb-5">
            <span className="font-bold text-lg w-full block pb-3">
              {hasDistance ? "تعیین محدوده جغرافیایی" : " ثبت موقعیت مکانی"}
            </span>
            <span className="text-sm block text-grey-500">
              {hasDistance
                ? "لطفا ابتدا روی نقشه، منطقه موردنظرتان را برای تعیین محدوده جستجو کنید."
                : " موقعیت مکانی را ثبت کنید"}
            </span>
          </div>

          {hasDistance && (
            <CustomSelectBox
              classes="w-full bg-gray-100 "
              data={arrayOfDistances}
              inMap={true}
              onChange={handleSelectChange}
              title="تعیین فاصله از نقطه انتخابی"
            />
          )}

          <MapComponent
            inSearch={inSearch}
            formik={formik}
            name={name}
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
          />

          <div className="flex">
            <button
              className="bg-blue text-white m-auto px-16 py-3 rounded-lg w-fit h-fit mt-5 mx-auto"
              onClick={handleClose}
            >
              تایید
            </button>
          </div>
        </Box>
      </Modal>

      {formik && formik.errors[name.lat] && formik.touched[name.lat] && (
        <span className="text-red-500 text-xs block lg:text-right text-center mt-2">
          {formik.errors[name.lat]}
        </span>
      )}
    </div>
  );
}
