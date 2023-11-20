import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 500, xs: "95%" },
  bgcolor: "background.paper",
  border: "0",
  boxShadow: 24,
  borderRadius: 3,
  outline: 0,
};

const LinkUploader = ({ formik, name }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    link: "",
  };

  const onSubmit = (values) => {
    formik.setFieldValue(name, values.link);
    setOpen(false)
  };

  const validationSchema = Yup.object({
    link: Yup.string().required("لینک آپارت الزامی است."),
  });

  const formikChild = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div className="border w-full justify-center border-gray-dark border-dashed flex flex-col items-center rounded-md p-5 bg-white relative h-full">
      {/* <img src={img.linkImg} alt="video" className="w-20" /> */}
      <span className="flex justify-center items-center gap-1 font-bold text-center text-sm">
        <span className="text-red-500">ویدئو</span>
        <span>نمایشگاه</span>
      </span>

      <p className="text-xs text-gray-700 text-center mt-2 font-light">
        ابتدا <span className="text-red-500">ویدئو</span> نمایشگاه را در آپارات
        بارگذاری کنید و سپس برای نمایش به کاربران، لینک ویدئو در آپارات را در
        این قسمت وارد نمایید.
      </p>
      <button
        onClick={handleOpen}
        type="button"
        className="bg-blue text-white px-10 py-2 text-sm rounded-lg mx-auto mt-6"
      >
        لینک ویدئو آپارات
      </button>

      {formik && formik.errors[name] && formik.touched[name] && (
        <span className="text-red-500 text-xs block lg:text-right text-center mt-2">
          {formik.errors[name]}
        </span>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span className="font-bold text-lg border-b border-b-gray-200 w-full p-4 block">
            لینک ویدئو بارگذاری شده در آپارات
          </span>
          <form className="block p-4 mt-2" onSubmit={formikChild.handleSubmit}>
            <FormInput
              formik={formikChild}
              name="link"
              label="لینک ویدئو آپارات"
              classNames="w-full"
            />
            <div className="flex mt-4 justify-end gap-4">
              <button
                className="bg-white py-2 px-8 text-gray-900 border-gray-900 border rounded-lg text-sm"
                onClick={handleClose}
                type="button"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="bg-blue py-2 px-8 text-white rounded-lg text-sm font-light"
              >
                تایید
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default LinkUploader;
