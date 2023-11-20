// import DatePickerInput from "Components/form/components@/DatePicker/DatePickerInput";
// import CustomTextarea from "Components/form/components@/Textarea/Textarea";
import httpService from "@/services/http-service";
import { AUTH_URL } from "@/config/url";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SET_MODAL_SITUATION } from "@/redux/edit-personal-info/edit-personal-info-slice";
import * as Yup from "yup";
import CustomTextarea from "@/attom/form@/components@/textarea/txtarea";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";

const PersonalInfoForm = ({ activeStep, setActiveStep }) => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.editPersonalInfo);

  let initialValues = {
    first_name: data.first_name,
    last_name: data.last_name,
    birthday: +data.day_of_birth
      ? `${+data.year_of_birth} /${+data.month_of_birth}/${+data.day_of_birth}`
      : "-",
    national_code: data.national_code,
    phone_number: data.phone_number,
    postal_code: data.postal_code,
    address: data.address,
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("درج نام الزامی است."),
    last_name: Yup.string().required("درج نام خانوادگی الزامی است."),
    birthday: Yup.string().required("درج تاریخ تولد الزامی است."),
    national_code: Yup.string()
      .required("درج کد ملی الزامی است.")
      .length(10, "کد ملی وارد شده صحیح نیست!"),
    phone_number: Yup.string()
      .required("شماره تماس الزامی است.")
      .length(11, "شماره تماس وارد شد صحیح نیست!"),
    postal_code: Yup.string()
      .required("کد پستی الزامی است.")
      .length(10, "کد پستی وارد شده صحیح نیست "),
    address: Yup.string().required("آدرس الزامی است."),
  });

  function validateNationalCode(nationalId) {
    // STEP 0: Validate national Id
    // Check length is 10
    if (nationalId.length == 0) {
      return true;
    } else if (nationalId.length < 8 || 10 < nationalId.length) {
      toast.error("کدملی صحیح نیست");
      return false;
    }

    // Check if all of the numbers are the same
    if (
      nationalId == "0000000000" ||
      nationalId == "1111111111" ||
      nationalId == "2222222222" ||
      nationalId == "3333333333" ||
      nationalId == "4444444444" ||
      nationalId == "5555555555" ||
      nationalId == "6666666666" ||
      nationalId == "7777777777" ||
      nationalId == "8888888888" ||
      nationalId == "9999999999"
    ) {
      return false;
    }

    // STEP 00 : if nationalId.lenght==8 add two zero on the left
    if (nationalId.length < 10) {
      let zeroNeeded = 10 - nationalId.length;

      let zeroString = "";
      if (zeroNeeded == 2) {
        zeroString = "00";
      } else {
        zeroString = "0";
      }

      nationalId = zeroString.concat(nationalId);
    }

    // STEP 1: Sum all numbers
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += nationalId.charAt(i) * (10 - i);
    }

    // STEP 2: MOD ON 11
    let mod = sum % 11;

    // STEP 3: Check with 2
    let finalValue;
    if (mod >= 2) {
      finalValue = 11 - mod;
    } else {
      finalValue = mod;
    }

    // STEP 4: Final Step check with control value
    if (finalValue == nationalId.charAt(9)) {
      return true;
    } else {
      return false;
    }
  }

  const onSubmit = (values) => {
    if (
      validateNationalCode(values.national_code) ||
      values.national_code === ""
    ) {
      let postData = {
        user_name: data.user_name,
        phone_number: values.phone_number,
        first_name: values.first_name,
        last_name: values.last_name,
        gender: data.gender,
        job: data.job,
        year_of_birth: data.year_of_birth ?? 0,
        month_of_birth: data.month_of_birth ?? 0,
        day_of_birth: data.day_of_birth ?? 0,
        email: data.email,
        national_code: String(values.national_code),
        postal_code: values.postal_code,
        address: values.address,
      };

      httpService
        .post(`${AUTH_URL}/Auth/User/Update`, postData)
        .then(() => {
          toast.success("اطلاعات کاربری با موفقیت به روزرسانی شد");
          dispatch(SET_MODAL_SITUATION(false));
          setActiveStep(2);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("کدملی وارد شده صحیح نمیباشد");
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <span className="block font-bold border-b border-b-gray-200 my-4 py-3 text-xl">
        اطلاعات فردی
      </span>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          <FormInput
            defaultValue={data.first_name}
            formik={formik}
            label=" نام"
            name="first_name"
            placeholder="امیررضا "
          />

          <FormInput
            defaultValue={data.last_name}
            formik={formik}
            label=" نام‌خانوادگی"
            name="last_name"
            placeholder="سیفی "
          />

          <FormInput
            defaultValue={data.national_code}
            formik={formik}
            label="کدملی"
            name="national_code"
            placeholder="146082544"
            classes="text-left ltr"
          />

          <FormInput
            defaultValue={data.postal_code}
            formik={formik}
            label=" کدپستی"
            name="postal_code"
            placeholder="146082544"
            classes="text-left ltr"
          />
          {/* <DatePickerInput formik={formik} /> */}

          <FormInput
            defaultValue={data.phone_number}
            formik={formik}
            label="شماره‌تماس"
            name="phone_number"
            placeholder="0912111111"
            classes="text-left ltr"
          />

          <CustomTextarea
            defaultValue={data.address}
            formik={formik}
            label="آدرس محل سکونت"
            name="address"
            placeholder="آدرس"
            formClass="xl:col-span-3 md:col-span-2 col-span-1"
          />
        </div>

        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="bg-blue  rounded-md px-8 py-2 text-white"
          >
            مرحله بعد
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
