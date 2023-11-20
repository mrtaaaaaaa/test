import ExhibitorStatusAlert from "@/attom/alerts/exhibitor-status-alert";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { useState } from "react";
import { ChangeStatusInitialValues } from "./form/init-values";
import { ChangeStatusValidationSchema } from "./form/validation-schema";
import { PostExhibitorLeasingChangeStatus } from "@/apis/panel/exhibitor";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0",
  boxShadow: 24,
  borderRadius: 3,
};

const ChangeStatus = ({
  exhibitor_leasing_id,
  confirmCondition,
  declineCondition,
}) => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: "",
    status: "",
    title: "",
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  //   change Status
  const changeStatusHandler = () => {
    const changeStatusData = new FormData();

    changeStatusData.append("exhibitor_leasing_id", exhibitor_leasing_id);
    changeStatusData.append("reason", "");
    changeStatusData.append("condition", confirmCondition);

    PostExhibitorLeasingChangeStatus(changeStatusData)
      .then(() => {
        setShowAlert({
          show: true,
          status: true,
          title: "اطلاعات با موفقیت تایید شد.",
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
  };

  const handleEdit = () => {
    setOpen(true);
  };

  const onSubmit = (values) => {
    const changeStatusData = new FormData();

    changeStatusData.append("exhibitor_leasing_id", exhibitor_leasing_id);
    changeStatusData.append("reason", values.reason);
    changeStatusData.append("condition", declineCondition);

    PostExhibitorLeasingChangeStatus(changeStatusData)
      .then(() => {
        setShowAlert({
          show: true,
          status: true,
          title: "اطلاعات با موفقیت رد شد.",
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
  };

  const formik = useFormik({
    initialValues: ChangeStatusInitialValues,
    onSubmit,
    validationSchema: ChangeStatusValidationSchema,
  });

  return (
    <div className="flex justify-center gap-4 items-center mt-8">
      <button
        className="bg-blue text-white py-2 px-12 rounded-lg w-fit text-sm"
        onClick={changeStatusHandler}
        disabled={loading}
      >
        تایید اطلاعات
      </button>

      {declineCondition && (
        <button
          className="border border-blue text-blue bg-white py-2 px-12 rounded-lg w-fit text-sm"
          onClick={handleEdit}
        >
          درخواست ویرایش
        </button>
      )}

      {showAlert.show && (
        <ExhibitorStatusAlert
          open={showAlert.show}
          setOpen={setShowAlert}
          status={showAlert.status}
          title={showAlert.title}
        />
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span className="font-bold p-4 border-b border-b-gray-150 block w-full text-gray-900">
            دلیل درخواست ویرایش
          </span>

          <form className="p-4" onSubmit={formik.handleSubmit}>
            <CustomTextarea
              formik={formik}
              name="reason"
              label="توضیحات"
              customClass="w-full"
              row={3}
            />

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                className="rounded-lg text-sm px-4 py-1 font-light border border-gray-400"
                onClick={handleClose}
              >
                انصراف
              </button>
              <button
                type="submit"
                className="rounded-lg text-sm px-4 py-1 font-light bg-blue text-white"
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

export default ChangeStatus;
