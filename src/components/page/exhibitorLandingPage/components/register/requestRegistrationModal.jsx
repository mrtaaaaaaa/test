import { icons } from "@/data";
import { checkExistWindow } from "@/utils/check-exist-window";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useState } from "react";
import HorizontalLinearStepper from "../stepper/stepper";
import ReactInputVerificationCode from "react-input-verification-code";
import Timer from "@/page/auth/components/timer";
import UserpersonalInfoPass from "./components/userpersonalInfoPass";

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
  handleResendCode,

}) {


  const [timeLeft, setTimeLeft] = useState(120);
  const [otp, setOtp] = useState("")

  const phone_number =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("phone_number") ?? "")


  const handleClose = () => setOpen(false);

  const handleCompleteOTP = (value) => {
    setOtp(value)
  }

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
                  <div className="border-b-gray border-b pb-2 w-fit px-8 mx-auto">
                    <h2 className="font-bold text-xl block text-center">ثبت‌نام</h2>
                    <span className="text-gray-400 text-sm mt-4 ltr block text-center">
                      {phone_number}
                    </span>
                  </div>

                  <Link
                    onClick={handleClose}
                    href="/exhibitors/landing#enter-phone"
                    className="underline text-blue text-xs text-center mt-2 mx-auto block"
                  >
                    اصلاح شماره همراه
                  </Link>
                  <span className="block text-center my-6">
                    کد ارسال شده به
                    <span className="font-bold pr-1">{phone_number}</span> را وارد نمایید:
                  </span>
                  <div className="md:w-2/2 gap-2 md:mx-auto ">
                    <div className="input-validation">
                      <ReactInputVerificationCode
                        value=""
                        autoFocus={true}
                        length={5}
                        placeholder=""
                        type="text"
                        onCompleted={handleCompleteOTP}
                      />
                    </div>

                    <Timer
                      onClickHandler={handleResendCode}
                      timeLeft={timeLeft}
                      setTimeLeft={setTimeLeft}
                    />
                  </div>
                  <UserpersonalInfoPass otp={otp} setShowStepper={setShowStepper} />

                  <span className="mt-5 block text-center text-xs font-light">
                    ثبت نام شما به معنای پذیرش
                    <span className="font-bold text-blue border-b border-blue ">
                      شرایط اُتو
                    </span>
                    است
                  </span>
                </div>
              </div>
              <div className="flex justify-center ">

              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

