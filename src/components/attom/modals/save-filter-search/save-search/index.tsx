import { PostFilterSave } from "@/apis/filter-save";
import { SelectBox } from "@/attom/form@/components@/select@/select-box";
import { Loading } from "@/attom/loading/loading";
import { staticData } from "@/data";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/redux/auth/auth-Slice";
import {
  ADD_CAR_MODEL,
  SET_IS_MULTIPLE,
} from "@/redux/brand-model/brand-model-slice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { Edit2 } from "iconsax-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import DynamicBrandModal from "@/attom/modals/brand-model-of-car/dynamic-brand-modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 450 },
  height: "fit-content",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
  border: "none",
  outline: "none",
  padding: "24px",
};

export default function ModalSaveSearch({
  cities,
  loading,
  setShowAlert,
  open,
  setOpen,
  handleOpen,
  defaultValues,
  models,
}: any) {
  // UserInfo
  const { userInfo } = useAppSelector(authSelector);
  const { editSaveSearch } = useAppSelector((state) => state.brandModel);

  // Formik initialValues
  const initialValues = {
    brands: defaultValues?.brand,
    models: defaultValues?.model,
    min_price:
      defaultValues?.min_price == -1 ? -1 : defaultValues?.min_price / 1000000,
    max_price:
      defaultValues?.max_price == -1 ? -1 : defaultValues?.max_price / 1000000,
    city: defaultValues?.city ? defaultValues?.city : "",
    notification_type: "SMS",
    user_name: userInfo?.phone_number,
  };

  useEffect(() => {
    dispatch(SET_IS_MULTIPLE(false));
  }, []);

  const dispatch = useAppDispatch();

  // Close modal handler
  const handleClose = () => setOpen(false);

  // Formik Submit
  const onSubmit = (values: any) => {
    const postData = {
      brands: values.brands,
      models: values.models,
      min_price: values.min_price !== -1 ? values.min_price * 1000000 : -1,
      max_price: values.max_price !== -1 ? values.max_price * 1000000 : -1,
      city: values.city,
      notification_type: "SMS",
      user_name: userInfo.phone_number,
    };

    PostFilterSave(postData)
      .then(() => {
        toast.success("جستجو با موفقیت ذخیره شد");

        if (setShowAlert) {
          setShowAlert(true);
        }
        handleClose();
      })
      .catch((err) => {
        toast.error("مشکلی در ذخیره جستجو پیش آمده‌است");
        handleClose();
      });
  };

  // UseFormik
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  // MaxPrice for max_price select box
  const maxPrice = staticData.prices.filter((p) => {
    return p.value > formik?.values?.min_price;
  });

  const customHandleChange = (
    e: any,
    index: any,
    category: any,
    brandOfCar: any,
    model: any,
    type: any
  ) => {
    formik.setValues({
      ...formik.initialValues,
      brands: brandOfCar,
      models: type ? type : model,
    });

    dispatch(ADD_CAR_MODEL({ name: "editSaveSearch", value: e.target.value }));
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex items-center flex-col">
            <button
              className="bg-gray-150 p-2 cursor-pointer rounded-lg"
              onClick={handleOpen}
            >
              <Edit2 color="#1242E0" size="16" />
            </button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ border: "none" }}
          >
            <Box sx={style}>
              <div className="flex flex-col">
                <span className="text-blue text-lg font-bold pb-3 border-b border-b-gray-300 mb-4 block">
                  خودرو مدنظر خود را پیدا کنید!
                </span>
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-6"
                >
                  <DynamicBrandModal
                    selectedValue={
                      defaultValues?.brands ? defaultValues?.brands : ""
                    }
                    customHandleChange={customHandleChange}
                    defaultValue={editSaveSearch}
                    models={models}
                  />

                  <SelectBox
                    placeholder="حداقل قیمت"
                    formik={formik}
                    options={staticData.prices}
                    name="min_price"
                    label="حداقل قیمت (میلیون تومان)"
                    selectedValue={
                      defaultValues?.min_price ? defaultValues?.min_price : ""
                    }
                  />

                  <SelectBox
                    placeholder="حداکثر قیمت"
                    formik={formik}
                    options={maxPrice}
                    name="max_price"
                    label="حداکثر قیمت (میلیون تومان)"
                    selectedValue={
                      defaultValues?.max_price ? defaultValues?.max_price : ""
                    }
                  />

                  <SelectBox
                    placeholder="استان"
                    formik={formik}
                    options={cities}
                    name="city"
                    label="استان"
                    selectedValue={
                      defaultValues?.city ? defaultValues?.city : ""
                    }
                  />

                  <button
                    className="bg-blue text-white rounded-md px-4 py-2 w-11/12 font-light mx-auto"
                    type="submit"
                  >
                    ذخیره جستجو
                  </button>
                </form>
              </div>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
}
