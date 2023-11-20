"use client";
import { useAppSelector } from "@/hooks/redux-hooks";
import OTPCode from "@/page/auth/components/otp-code";
import RegisterForm from "@/page/auth/register/components/register-form";
import { registerSelector } from "@/redux/auth/register/register-slice";
import { checkExistWindow } from "@/utils/check-exist-window";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const RegisterPage = () => {
  // @@@___________________ phone_number ___________________@@@
  const phone_number =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("phone_number") ?? "");

  // @@@___________________ RegisterSelector ___________________@@@
  const { register_success } = useAppSelector(registerSelector);

  // @@@___________________ use State ___________________@@@
  const [otp, setOtp] = useState("");

  // @@@___________________ use Router ___________________@@@
  const router = useRouter();

  useEffect(() => {
    if (register_success) {
      router.push("/");
    }
  }, [register_success]);

  return (
    <>
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

      {/* @@@___________________ OTP form ___________________@@@ */}
      <OTPCode setOtp={setOtp} />

      {/* @@@___________________ Register form (first_name, last_name, password) ___________________@@@ */}
      <RegisterForm otp={otp} />

      <span className="mt-5 block text-center text-xs font-light">
        ثبت نام شما به معنای پذیرش{" "}
        <span className="font-bold text-blue border-b border-blue">
          شرایط اُتو
        </span>{" "}
        است
      </span>
    </>
  );
};

export default RegisterPage;
