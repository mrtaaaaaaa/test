import { useAppSelector } from "@/hooks/redux-hooks";
import { SendCodeSelector } from "@/redux/auth/send-code/send-code-slice";
import { useEffect } from "react";
import { RxCountdownTimer } from "react-icons/rx";

function Timer({ onClickHandler, timeLeft, setTimeLeft }) {
  const { verifaction_error } = useAppSelector(SendCodeSelector);

  useEffect(() => {
    if (verifaction_error) {
      toast.error("متاسفانه خطایی رخ داده است.");
    }
  }, [verifaction_error]);

  useEffect(() => {
    // create an interval that decrements the timeLeft state every second
    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    // clear the interval when the timeLeft reaches 0
    if (timeLeft === 0) {
      clearInterval(intervalId);
    }

    // clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // convert timeLeft to minutes and seconds
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // format the minutes and seconds with leading zeros
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return timeLeft > 0 ? (
    <div className="flex justify-center gap-2 items-center my-5">
      <RxCountdownTimer className="text-blue" />
      <span className="block text-sm text-blue font-bold">
        {formattedMinutes}:{formattedSeconds}
      </span>
      <span className="font-light text-sm">مانده تا دریافت مجدد کد</span>
    </div>
  ) : (
    <button
      className="my-5 text-sm font-ligth text-blue text-center block mx-auto underline"
      onClick={onClickHandler}
      type="button"
      name="timer"
    >
      دریافت مجدد کد
    </button>
  );
}

export default Timer;
