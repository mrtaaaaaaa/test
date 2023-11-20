import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import httpService from "services/httpService";
import { FRONT2MESSAGE } from "config/url";
import { useFormik } from "formik";
import { UseGetStaticData } from "hooks/getStaticDatas";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "react-router";
import { toast } from "react-toastify";
import {
  ADD_CAR_MODEL,
  SET_IS_MULTIPLE,
} from "redux/brandModel/brandModelSlice";
import * as Yup from "yup";
import DynamicBrandModal from "@/attom/modals/brand-model-of-car/dynamic-brand-modal";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";

export default function VipSaleModal() {
  const { data: areas, isLoading } = UseGetStaticData("areas", "/Area/Get/All");
  const { userInfo } = useSelector((state) => state.auth);
  const navigat = useRouter();

  const handleOpen = () => {
    let userInfoLength = Object.entries(userInfo);

    if (userInfoLength.length == 0) {
      navigat("/auth/check");
    } else {
      setOpen(true);
    }
  };
  const { vipCarSale } = useSelector((state) => state.brandModel);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const initialValues = {
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    contact_phone_number: userInfo.phone_number,
    model: "",
    brand: "",
    type: "",
    mileage: "",
    status: "",
    review_location: "",
    brand: "",
    carBrandModel: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("درج نام الزامی است."),
    last_name: Yup.string("").required("درج نام‌خانوادگی الزامی است."),
    first_name: Yup.string().required("درج نام الزامی است."),
    last_name: Yup.string("").required("درج نام‌خانوادگی الزامی است."),
    contact_phone_number: Yup.string()
      .required("شماره تماس الزامی است")
      .matches(/^[0-9]+$/, "فرمت وارد شده صحیح نیست")
      .min(11, "شماره تماس صحیح نیست")
      .max(11, "شماره تماس صحیح نیست"),
    mileage: Yup.number("")
      .typeError("کارکرد خودرو الزامی است")
      .required("کارکرد خودرو الزامی است"),
    // status: Yup.string().required("وضعی"),
    review_location: Yup.string().required("انتخاب موقعیت مکانی الزامی است"),
    brand: Yup.string().required("انتخاب  برند و مدل خودرو الزامی است"),
  });

  const onSubmit = (values) => {
    let data = new FormData();

    data.append("first_name", values.first_name);
    data.append("last_name", values.last_name);
    data.append("contact_phone_number", values.contact_phone_number);
    data.append("model", values.brand);
    data.append("brand", values.brand);
    data.append("type", values.brand);
    data.append("mileage", values.mileage);
    data.append("status", "ثبت اولیه فروش ویژه");
    data.append("review_location", values.review_location);

    httpService({
      method: "post",
      url: `${FRONT2MESSAGE}/AdSale/Vip`,
      data: data,
    })
      .then((res) => {
        toast.success("درخواست شما با موفقیت ثبت شد");
        setOpen(false);
        formik.setValues({
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          contact_phone_number: userInfo.phone_number,
          model: "",
          brand: "",
          type: "",
          mileage: "",
          status: "",
          review_location: "",
          brand: "",
          carBrandModel: "",
        });
      })
      .catch(() => {
        toast.error("مشکلی در ثبت درخواست بوجود آمده‌است");
        setOpen(false);
        formik.setValues({
          first_name: userInfo.first_name,
          last_name: userInfo.last_name,
          contact_phone_number: userInfo.phone_number,
          model: "",
          brand: "",
          type: "",
          mileage: "",
          status: "",
          review_location: "",
          brand: "",
          carBrandModel: "",
        });
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    // enableReinitialize: true,
    validateOnMount: true,
  });

  const handleClose = () => {
    setOpen(false);
    formik.setValues({
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      contact_phone_number: userInfo.phone_number,
      model: "",
      brand: "",
      type: "",
      mileage: "",
      status: "",
      review_location: "",
      brand: "",
      carBrandModel: "",
    });
  };
  useEffect(() => {
    dispatch(SET_IS_MULTIPLE(false));
  }, []);

  const customHandleChange = (e) => {
    let name = e.target.name;
    formik.setValues({
      ...formik.initialValues,
      [name]: e.target.value,
    });
    dispatch(ADD_CAR_MODEL({ name: "vipCarSale", value: e.target.value }));
  };
  return (
    <div className="flex justify-center">
      <button
        onClick={handleOpen}
        className="bg-blue  p-2 text-white rounded w-[12rem] mx-auto mt-2 text-center whitespace-nowrap"
      >
        درخواست فروش ویژه
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
            p: 4,
            outline: "none",
            height: "auto",
            maxHeight: "90%",
            overflowY: "auto",
            width: { xs: "90%", md: "auto" },
          }}
        >
          <div className="lg:px-28 px-5">
            <div className="mb-6 text-center">
              <span className="font-bold text-lg block">درخواست فروش ویژه</span>
              <span className="text-center block mt-2">
                فروش خودرو خود را به ما بسپارید!
              </span>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-6 mb-8">
                <FormInput
                  defaultValue={
                    userInfo?.first_name || userInfo?.user?.first_name
                  }
                  value={userInfo?.first_name || userInfo?.user?.first_name}
                  formik={formik}
                  label="نام"
                  name="first_name"
                  placeholder="امیررضا"
                />
                <FormInput
                  defaultValue={
                    userInfo?.last_name || userInfo?.user?.last_name
                  }
                  value={userInfo?.last_name || userInfo?.user?.last_name}
                  formik={formik}
                  label="نام‌خانوادگی"
                  name="last_name"
                  placeholder="سیفی"
                />
                <FormInput
                  defaultValue={
                    userInfo?.phone_number || userInfo?.user?.phone_number
                  }
                  value={userInfo?.phone_number || userInfo?.user?.phone_number}
                  formik={formik}
                  label="شماره تلفن هماهنگی"
                  name="contact_phone_number"
                  placeholder="۰۹۱۹۰۹۵۹۵۸۸"
                  type="tel"
                />
                <FormInput
                  formik={formik}
                  label="کارکرد خودرو (کیلومتر)"
                  name="mileage"
                  placeholder="480"
                  type="number"
                  showEndAdorMent={true}
                  showEndAdorMentValue="کیلومتر"
                />

                <div className="mt-2">
                  <label className="font-medium">محدوده بازدید</label>
                  <select
                    onChange={formik.handleChange}
                    name="review_location"
                    className="bg-gray-150 text-right mt-2 rounded py-[10px] px-2 w-full  text-sm cursor-pointer flex justify-between outline-none"
                  >
                    <option hidden selected>
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

                  {formik.errors.review_location &&
                    formik.touched.review_location && (
                      <span className="text-[#d32f2f] text-xs">
                        {formik.errors.review_location}
                      </span>
                    )}
                </div>

                <div>
                  <label className="text-grey block font-medium">
                    برند و مدل
                  </label>

                  <DynamicBrandModal
                    customHandleChange={customHandleChange}
                    defaultValue={vipCarSale}
                  />

                  {formik.errors.brand && formik.touched.brand && (
                    <span className="text-[#d32f2f] text-xs">
                      {formik.errors.brand}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue  px-4 text-white mx-auto flex py-2 rounded"
              >
                ثبت درخواست فروش ویژه
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
