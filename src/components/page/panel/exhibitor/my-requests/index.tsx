"use client";

import { postAuthPhoneNumberExhibitorUpdateCompletionAPI } from "@/apis/panel/exhibitor";
import { FormInput } from "@/attom/form@/components@/inputs/form-input";
import { useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/redux/auth/auth-Slice";
import { regexPersianCharacter, regexPhoneNumber } from "@/utils/regex";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ImageUploader from "../leasing/req-registration/components/form/image-uploader";
import LinkUploader from "./components/linkUploader";
import LocationSquad from "./components/locationSquad";

export default function ContinueExhibitionRegister() {
  const [loading, setLoading] = useState(false);
  const [boardImg, setBoardImg] = useState([]);
  const [licenseImg, setLicenseImg] = useState([]);
  const [logoImg, setLogoImg] = useState([]);
  const [bannerImg, setBannerImg] = useState([]);
  const router = useRouter();

  const { userInfo } = useAppSelector(authSelector);

  // Formik initialValue
  let initialValues = {
    exhibition_name: "",
    exhibition_phone_number: "",
    exhibition_account_number: "",
    exhibition_location_lat: "",
    exhibition_location_long: "",
    exhibition_board_image: "",
    exhibition_license_image: "",
    exhibition_promotional_video: "",
    exhibition_promotional_video_url: "",
    exhibition_logo_image: "",
    exhibition_banner_image: "",
  };

  // Formik validationSchema
  const validationSchema = Yup.object({
    exhibition_name: Yup.string()
      .required("نام نمایشگاه الزامی است.")
      .matches(regexPersianCharacter, "مقدار وارد شده صحیح نیست."),
    exhibition_phone_number: Yup.string()
      .required("شماره تماس الزامی است.")
      .matches(regexPhoneNumber, "شماره تماس صحیح نیست"),

    exhibition_account_number: Yup.string().required(
      "شماره حساب صاحب کسب الزامی است."
    ),
    exhibition_location_lat: Yup.string().required(
      "محدوده جغرافیایی الزامی است."
    ),
    exhibition_location_long: Yup.string().required(
      "محدوده جغرافیایی الزامی است."
    ),
    exhibition_board_image: Yup.string().required(
      "تصویر تابلو نمایشگاه الزامی است."
    ),
    exhibition_license_image: Yup.string().required(
      "تصویر جواز کسب الزامی است."
    ),
    exhibition_promotional_video_url: Yup.string().required(
      "لینک ویدئو آپارات الزامی است."
    ),
    exhibition_logo_image: Yup.string().required("تصویر لوگو الزامی است."),
    exhibition_banner_image: Yup.string().required("تصویر بنر الزامی است."),
  });

  // Fomik submit handler
  const onSubmit = (values) => {
    setLoading(true);
    const postData = new FormData();

    Object.entries(values).map(([key, value]) => postData.append([key], value));
 
    postAuthPhoneNumberExhibitorUpdateCompletionAPI({
      phone_number: userInfo.phone_number,
      postData: postData,
    })
      .then((res) => {
        toast.success("اطلاعات کاربری با موفقیت ثبت شد.");
        setLoading(false);
        router.push("/panel/exhibitor/leasing/customers-req");
      })
      .catch((err) => {
        toast.error("متاسفانه خطایی رخ داده است.");
        setLoading(false);
      });
  };

  // UseFormik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="border border-gray-150 p-4 rounded-lg">
      <h1 className="font-bold text-xl mb-4 text-blue border-b border-b-gray-200 pb-4 w-full">
        ادامه فرآیند ثبت نمایشگاه
      </h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-6">
          <FormInput
            formik={formik}
            name="exhibition_name"
            label="نام نمایشگاه"
            placeholder="نمایشگاه"
            type="text"
          />
          <FormInput
            formik={formik}
            name="exhibition_phone_number"
            label="شماره تماس"
            placeholder="021088459678"
            classNames="text-left ltr"
          />
          <FormInput
            formik={formik}
            classNames="md:col-span-2 "
            name="exhibition_account_number"
            label="شماره حساب صاحب کسب"
            placeholder=""
            type="number"
          />
        </div>

        <h2 className="font-bold text-xl mt-8 mb-4 text-blue border-b border-b-gray-200 pb-4 w-full">
          بارگذاری
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          <ImageUploader
            imgsSrc={boardImg}
            setImgsSrc={setBoardImg}
            title="تصویر تابلو نمایشگاه را بارگذاری کنید."
            imageCount={1}
            formik={formik}
            name="exhibition_board_image"
          />

          <ImageUploader
            imgsSrc={licenseImg}
            setImgsSrc={setLicenseImg}
            title="تصویر جواز کسب را بارگذاری کنید."
            imageCount={1}
            formik={formik}
            name="exhibition_license_image"
          />
          <ImageUploader
            imgsSrc={logoImg}
            setImgsSrc={setLogoImg}
            title="تصویر لوگو را بارگذاری کنید."
            imageCount={1}
            formik={formik}
            name="exhibition_logo_image"
          />
          <ImageUploader
            imgsSrc={bannerImg}
            setImgsSrc={setBannerImg}
            title="تصویر بنر را بارگذاری کنید."
            imageCount={1}
            formik={formik}
            name="exhibition_banner_image"
          />

          <LinkUploader
            formik={formik}
            name="exhibition_promotional_video_url"
          />
        </div>

        <LocationSquad
          formik={formik}
          name={{
            lat: "exhibition_location_lat",
            long: "exhibition_location_long",
          }}
        />

        <button
          type="submit"
          className={`bg-blue flex flex-col px-12 py-3 m-auto text-white rounded-lg text-sm font-light mt-8 ${
            loading && "cursor-not-allowed"
          }`}
        >
          <div className="flex gap-2 items-center">
            <BsCheckCircle />
            ثبت نهایی درخواست
          </div>
          {loading && <LinearProgress sx={{ color: "#fff" }} />}
        </button>
      </form>
    </div>
  );
}
