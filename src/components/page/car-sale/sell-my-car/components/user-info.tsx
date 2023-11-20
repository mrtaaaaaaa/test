import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "src/hooks/redux-hooks";

const UserInfo = ({ formik }: { formik: any }) => {
  const { userInfo } = useAppSelector((state) => state.auth);

  const fetchUserInfo = () => {
    let formikValue = formik.values;
    if (formik.values.first_name) {
      formik.setValues({
        ...formikValue,
        first_name: formik.values.first_name,
        last_name: formik.values.last_name,
      });
    } else {
      httpService
        .get(`${AUTH_URL}/Auth/User/${userInfo?.phone_number}`)
        .then((res) => {
          formik.setValues({
            ...formikValue,
            first_name: res.data.users.first_name,
            last_name: res.data.users.last_name,
          });
        })
        .catch(() => {
          toast.error("متاسفانه خطایی پیش‌ آمده‌است");
          return;
        });
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [formik.values.first_name]);

  return (
    <div className="border-t border-grey-border mt-8">
      <h2 className="text-blue  font-bold text-xl my-4">اطلاعات فردی</h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 items-start">
        <FormInput formik={formik} label="نام" name="first_name" />
        <FormInput formik={formik} label="نام‌خانوادگی" name="last_name" />
      </div>
    </div>
  );
};

export default UserInfo;
