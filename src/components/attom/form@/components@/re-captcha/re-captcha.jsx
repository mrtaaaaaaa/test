import { Refresh } from "iconsax-react";

const Recaptcha = ({ recaptcha, captchaValue, onChange, refreshCaptcha }) => {
  return (
    <div className="flex flex-col w-full mt-2">
      <div className="flex justify-between items-center pr-4">
        <button onClick={refreshCaptcha}>
          <Refresh size="20" color="#1242E0" />
        </button>
        <img src={recaptcha?.img} alt="Recaptch image" />
      </div>
      <input
        className="bg-gray-150 text-right my-2 rounded py-3 px-2 w-full text-sm outline-none"
        value={captchaValue}
        onChange={onChange}
      />
      {captchaValue === "error" && (
        <span className="text-red-500 text-xs -mt-1">
          پر کردن این فیلد الزامی‌ست
        </span>
      )}
    </div>
  );
};

export default Recaptcha;
