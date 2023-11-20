"use client";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import DynamicBrandModal from "@/attom/modals/brand-model-of-car/dynamic-brand-modal";
import { FRONT2DB, FRONT2MESSAGE } from "@/config/url";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/redux/auth/auth-Slice";
import {
  ADD_CAR_MODEL,
  SET_IS_MULTIPLE,
  brandModelSelector,
} from "@/redux/brand-model/brand-model-slice";
import httpService from "@/services/http-service";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import { VipBuyModalFormInitialValues } from "./form/init-value";
import { VipBuyModalFormValidationSchema } from "./form/validation-schema";
import { PostAdBuyVip } from "@/apis/ad-buy";
import { useRequest } from "@/hooks/useRequest";
import { InputNumberSeprator } from "@/attom/form@/components@/inputs/input-number-seprator";

export default function VipBuyModal({ brandModel }: any) {
  const { userInfo } = useAppSelector(authSelector);
  const { vipCarBuy } = useAppSelector(brandModelSelector);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    let userInfoLength = Object.entries(userInfo);
    if (userInfoLength.length == 0) {
      router.push("/auth/check");
    } else {
      setOpen(true);
    }
  };

  const [open, setOpen] = useState(false);

  const onSubmit = (values) => {
    let postData = new FormData();

    const valuesObject = Object.entries(values).map(([key, value]) =>
      postData.append([key], value)
    );

    PostAdBuyVip(postData)
      .then(() => {
        toast.success("درخواست شما با موفقیت ثبت شد.");
        setOpen(false);
      })
      .catch(() => toast.error("متاسفانه خطایی رخ داده است."));
  };

  const formik = useFormik({
    initialValues: VipBuyModalFormInitialValues(),
    validationSchema: VipBuyModalFormValidationSchema,
    onSubmit,
    enableReinitialize: true,
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
      budget: "",
      status: "ثبت اولیه خرید ویژه",
    });
  };

  const customHandleChange = (
    e,
    indexOfBrand,
    category,
    brand,
    model,
    type
  ) => {
    formik.setValues({
      ...formik.values,
      brand: brand,
      model: model,
      type: type,
    });
    dispatch(ADD_CAR_MODEL({ name: "vipCarBuy", value: type ? type : model }));
  };

  useEffect(() => {
    dispatch(SET_IS_MULTIPLE(false));
  }, []);

  return (
    <div className="flex justify-center">
      <button
        onClick={handleOpen}
        className="bg-blue text-white px-24 py-2 rounded font-medium mr-auto flex items-center gap-2"
      >
        خرید ویژه
        <FaChevronLeft />
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
            borderRadius: "4px",
            boxShadow: 24,
            p: 2,
            outline: "none",
            height: "auto",
            maxHeight: "90%",
            overflowY: "auto",
            width: { xs: "90%", md: "24rem" },
          }}
        >
          <>
            <h2 className="font-bold text-lg block text-right mb-6">
              دنبال چه خودرویی هستید؟
            </h2>

            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col gap-6 mb-8">
                <div>
                  <DynamicBrandModal
                    customHandleChange={customHandleChange}
                    defaultValue={vipCarBuy}
                    models={brandModel}
                  />
                  {formik.errors.model && formik.touched.model && (
                    <span className="text-[#d32f2f] text-xs">
                      {formik.errors.model}
                    </span>
                  )}
                </div>

                <FormInput
                  formik={formik}
                  label="شماره تلفن هماهنگی"
                  name="contact_phone_number"
                  placeholder="۰۹۱۹۰۹۵۹۵۸۸"
                  type="tel"
                />

                <InputNumberSeprator
                  formik={formik}
                  label="بودجه مد نظر"
                  name="budget"
                  placeholder="1000000"
                  showEndAdorMent={true}
                  showEndAdorMentValue="تومان"
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    formik={formik}
                    label="نام"
                    name="first_name"
                    placeholder="امیررضا"
                  />
                  <FormInput
                    formik={formik}
                    label="نا‌م‌ خانوادگی"
                    name="last_name"
                    placeholder="سیفی"
                  />
                </div>
              </div>

              <button className="bg-blue px-4 text-white  py-2 rounded w-full text-center block">
                ثبت درخواست
              </button>
            </form>
          </>
        </Box>
      </Modal>
    </div>
  );
}
