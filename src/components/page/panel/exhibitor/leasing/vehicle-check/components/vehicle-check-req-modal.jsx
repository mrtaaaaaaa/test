"use client";

import {
  GetExhibitorData,
  PostExhibitorLeasingChangeStatus,
  postExhibitorLeasingVehicleCheck,
} from "@/apis/panel/exhibitor";
import GetStaticDatasNotSSRAPI from "@/apis/static-datas/get-static-datas-not-ssr.api";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";
import ExhibitorStatusAlert from "@/attom/alerts/exhibitor-status-alert";
import PreviewDetail from "@/attom/exhibitors/preview-detail";
import { SET_IS_MULTIPLE } from "@/redux/brand-model/brand-model-slice";
import { LinearProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

export default function VehicleCheckReqModal() {
  const [state, setState] = useState([]);

  const { id } = useParams();

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: "",
    status: "",
    title: "",
  });
  const [loading, setLoading] = useState(false);
  const [areas, setAreas] = useState([]);

  // Formik initialValue
  let initialValues = {
    vehicle_check_area: "",
    vehicle_check_address: "",
    exhibitor_leasing_id: id,
  };

  async function fetchData() {
    GetExhibitorData(id).then((res) => {
      setState(res);
    });
    let postedData = {
      page_number: 1,
      page_size: 200,
    };
  }
  useEffect(() => {
    GetStaticDatasNotSSRAPI({
      endPoint: "/Area/Get/All",
    }).then((res) => {
      setAreas(res);
    });
    fetchData();
  }, []);

  // ValidationShema
  const validationSchema = Yup.object({
    vehicle_check_area: Yup.string().required(
      "انتخاب  محدوده بازدید الزامی است"
    ),
  });

  // Submit formik
  const onSubmit = (values) => {
    setLoading(true);
    let data = new FormData();

    Object.entries(values).map((item) => {
      data.append(item[0], item[1]);
    });

    postExhibitorLeasingVehicleCheck(data)
      .then((res) => {
        setLoading(false);
        const changeStatusData = new FormData();

        changeStatusData.append("exhibitor_leasing_id", id);
        changeStatusData.append("reason", "");
        changeStatusData.append("condition", "در انتظار اعزام کارشناس خودرو");

        PostExhibitorLeasingChangeStatus(changeStatusData)
          .then(() => {
            setOpen(false);
            setShowAlert({
              show: true,
              status: true,
              title: "درخواست شما برای کارشناسی رسمی قوه قضاییه ثبت شد.",
            });

            setLoading(false);
          })
          .catch(() => {
            setShowAlert({
              show: true,
              status: false,
              title: "متاسفانه خطایی رخ داده است.",
            });
            setLoading(false);
          });
      })
      .catch((err) => {
        setShowAlert({
          show: true,
          status: false,
          title: "درخواست شما ثبت نشد. چند لحظه دیگر مجدد امتحان کنید.",
        });
        setLoading(false);
      });
  };

  // Formik config
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    // enableReinitialize: true,
    validateOnMount: true,
  });

  // Close Modal
  const handleClose = () => {
    setOpen(false);
  };

  // UseEffect
  useEffect(() => {
    dispatch(SET_IS_MULTIPLE(false));
  }, []);
  
  return (
    <div className="flex justify-center">
      <button
        className="border  text-blue border-blue px-5 py-2 w-[25rem] rounded-lg"
        onClick={handleOpen}
      >
        ثبت درخواست{" "}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "10px",
            boxShadow: 24,
            outline: "none",
            height: "auto",
            maxHeight: "90%",
            overflowY: "auto",
            width: { xs: "90%", md: "60%", lg: 500 },
          }}
        >
          <div className="flex justify-between items-center  mb-2 border-b p-3">
            <span className="font-bold text-blue p-2">
              ثبت درخواست کارشناسی رسمی قوه قضاییه
            </span>
            <span onClick={handleClose} className="cursor-pointer">
              <AiOutlineClose color="rgba(153, 156, 160, 1)" />
            </span>
          </div>

          <form className="p-6" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-6 ">
              <PreviewDetail
                label={"برند و مدل"}
                value={`${state.vehicle_info?.brand} - ${
                  state.vehicle_info?.model
                }  ${state.vehicle_info?.type && state.vehicle_info?.type}`}
              />
              <PreviewDetail
                label={"سال ساخت"}
                value={state.vehicle_info?.year_of_manufacture_display}
              />

              <div>
                <div className="relative border border-[#C4C4C4] rounded-lg h-[43px] pt-2">
                  <span
                    className="absolute right-3 -top-2 bg-white pr-2 pl-6 text-gray"
                    style={{ fontSize: "12px" }}
                  >
                    محدوده بازدید
                  </span>
                  <select
                    onChange={formik.handleChange}
                    name="vehicle_check_area"
                    className=" text-right mt-2 px-2 w-full  text-xs cursor-pointer flex justify-between outline-none"
                  >
                    <option hidden selected style={{ fontSize: "10px" }}>
                      محدوده مورد نظر را انتخاب کنید
                    </option>
                    {areas?.areas?.map((item) => {
                      return (
                        <>
                          <option
                            value={item.area_category}
                            disabled="disabled"
                            style={{ background: "#D3D3D3" }}
                          >
                            {item.area_cat}
                          </option>
                          {item.areas.map((area) => (
                            <option value={area}>{area}</option>
                          ))}
                        </>
                      );
                    })}
                  </select>
                </div>
                {formik.errors.vehicle_check_area &&
                  formik.touched.vehicle_check_area && (
                    <span className="text-[#d32f2f] text-xs mt-1">
                      {formik.errors.vehicle_check_area}
                    </span>
                  )}
              </div>
              <div className="lg:col-span-3 md:col-span-2 col-span-1">
                <CustomTextarea
                  formik={formik}
                  label="آدرس "
                  name="vehicle_check_address"
                  placeholder="در صورت تمایل آدرس دقیق خود را وارد کنید."
                  customClass="w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`bg-blue mt-4 w-full justify-center px-4 text-white mx-auto flex py-2 rounded-lg ${
                loading && "cursor-not-allowed"
              }`}
              disabled={loading}
            >
              ثبت درخواست
              {loading && <LinearProgress />}
            </button>
          </form>
        </Box>
      </Modal>
      {showAlert.show && (
        <ExhibitorStatusAlert
          open={showAlert.show}
          setOpen={setShowAlert}
          status={showAlert.status}
          title={showAlert.title}
        />
      )}
    </div>
  );
}
