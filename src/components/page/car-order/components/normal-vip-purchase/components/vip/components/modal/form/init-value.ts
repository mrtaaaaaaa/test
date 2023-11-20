import { useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/redux/auth/auth-Slice";

export const VipBuyModalFormInitialValues = () => {
  const { userInfo } = useAppSelector(authSelector);

  let initValue;

  return (initValue = {
    first_name: userInfo?.first_name,
    last_name: userInfo?.last_name,
    contact_phone_number: userInfo?.phone_number,
    model: "",
    brand: "",
    type: "",
    budget: "",
    status: "ثبت اولیه خرید ویژه",
  });
};
