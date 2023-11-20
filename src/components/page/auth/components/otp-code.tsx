import { sendCode } from "@/redux/auth/auth-actions";
import { checkExistWindow } from "@/utils/check-exist-window";
import { useState } from "react";
import ReactInputVerificationCode from "react-input-verification-code";
import { useDispatch } from "react-redux";
import Timer from "./timer";

const OTPCode = ({ setOtp }) => {
  const phone_number =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("phone_number") ?? "");

  const [timeLeft, setTimeLeft] = useState(120);
  const dispatch = useDispatch();

  //   پر کردن فیلد OTP
  const handleCompleteOTP = (value) => {
    setOtp(value);
  };

  // ارسال مجدد کد
  const sendCodeHandler = () => {
    dispatch(
      sendCode({
        phone_number: phone_number,
      })
    );
    setTimeLeft(120);
  };

  return (
    <>
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
          onClickHandler={sendCodeHandler}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
        />
      </div>
    </>
  );
};

export default OTPCode;
