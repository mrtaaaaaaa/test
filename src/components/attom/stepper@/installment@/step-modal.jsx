import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import httpService from "@/services/http-service";
import { AUTH_URL } from "@/config/url";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_BRANDMODEL_ERROR } from "@/redux/car-installment/car-installment/car-Installment-slice";
import { SET_DATA } from "@/redux/edit-personal-info/edit-personal-info-slice";
import Steps from "./steps";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  outline: "none",
  height: { xs: "90%", md: "auto", lg: "auto", xl: "auto" },
  width: { xs: "90%", xl: "60rem", lg: "70rem" },
  padding: "1rem",
  overflow: "auto",
};

export default function StepModal({
  open,
  setOpen,
  children,
  inDetailPage,
  current_step = 1,
}) {
  const carInstallment = useSelector((state) => state.carInstallment);
  const [activeStep, setActiveStep] = useState(current_step);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (carInstallment.brand_models.length == 0) {
      e.preventDefault();
      SET_BRANDMODEL_ERROR("true");
    } else {
      httpService
        .get(`${AUTH_URL}/Auth/User/${userInfo.phone_number}`)
        .then((res) => {
          dispatch(SET_DATA(res.data.users));
          setOpen(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!inDetailPage && (
        <button
          onClick={handleClick}
          className="w-11/12 bg-blue text-white rounded-lg mx-auto mt-5 py-2"
        >
          خرید اقساطی خودرو
        </button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Steps
            handleClose={handleClose}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
          {children}
        </Box>
      </Modal>
    </>
  );
}
