import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { icons } from "@/data";
import { useState } from "react";
import ReactInputVerificationCode from "react-input-verification-code";
import { toast } from "react-toastify";
import Timer from "@/page/auth/components/timer";
import httpService from "@/services/http-service";
import { AUTH_URL } from "@/config/url";
import HorizontalLinearStepper from "../stepper/stepper";
import { postAuthLoginRequest } from "@/apis/authentication@";
import OTPCode from "@/page/auth/components/otp-code";
import RegisterForm from "@/page/auth/register/components/register-form";
import { checkExistWindow } from "@/utils/check-exist-window";
import { useAppSelector } from "@/hooks/redux-hooks";
import { useRouter } from "next/router";
import { registerSelector } from "@/redux/auth/register/register-slice";
import Link from "next/link"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 700,
  width: { md: '100%', xs: "95%" },
  height: { lg: "max-content", sx: "100%" },
  maxHeight: "90%",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "0",
  outline: 'none',
  boxShadow: 24,
  borderRadius: 4,
  p: 2,
};

export default function RequestRegistrationModal({
  setShowStepper,
  showStepper,
  open,
  setOpen,
  phone,

}) {

  const [verifactionCode, setVerifactionCode] = useState("");
  const [otp, setOtp] = useState(false)

  // @@@___________________ phone_number ___________________@@@
  const phone_number =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("phone_number") ?? "");





  const handleClose = () => setOpen(false);

 


  return (
    <div className="rounded-lg">
      <Modal open={open} onClose={handleClose} sx={{ overFlow: 'auto' }}>
        <Box sx={style}>
          {showStepper ? (
            <HorizontalLinearStepper />
          ) : (
            <>
              <div className="md:w-2/3 w-full mx-auto px-4 py-8">
                <Typography>
                  <div className="flex justify-center ">
                    <img src={icons.logo_blue.src} alt="logo" />
                  </div>
                </Typography>

                <div className="w-full flex flex-col justify-center items-center mb-5">
                  <div className="border-b-gray border-b pb-2 w-fit px-8">
                    <h2 className="font-bold text-xl block text-center mt-4">
                      ثبت درخواست
                    </h2>

                  </div>
                  <div className="border-b-gray border-b pb-2 w-fit px-8 mx-auto">
                    <h2 className="font-bold text-xl block text-center">ثبت‌نام</h2>
                    <span className="text-gray-400 text-sm mt-4 ltr block text-center">
                      {phone_number}
                    </span>
                  </div>

                  <Link
                    href="/auth/check"
                    className="underline text-blue text-xs text-center mt-2 mx-auto block"
                  >
                    اصلاح شماره همراه
                  </Link>

              

                  <span className="mt-5 block text-center text-xs font-light">
                    ثبت نام شما به معنای پذیرش{" "}
                    <span className="font-bold text-blue border-b border-blue">
                      شرایط اُتو
                    </span>{" "}
                    است
                  </span>
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

