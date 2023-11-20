"use client";

import { PostExhibitorLeasingContractImages } from "@/apis/panel/admin";
import {
  GetExhibitorData,
  PostExhibitorLeasingChangeStatus,
} from "@/apis/panel/exhibitor";
import ExhibitorStatusAlert from "@/attom/alerts/exhibitor-status-alert";
import { LinearProgress } from "@mui/material";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import ImageUploader from "../req-registration/components/form/image-uploader";
import WordTemplate from "./components/word-tepmlate";

const CustomerOnlineContract = () => {
  const [contractImg, setContractImg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: "",
    status: "",
    title: "",
  });

  const [state, setState] = useState({});
  const { id } = useParams();

  function fetchData() {
    GetExhibitorData(id).then((res) => {
      setState(res);
    });
  }
  useEffect(() => {
    fetchData();
  }, []);

  // Formik initialValues
  const initialValues = {
    exhibitor_leasing_id: id,
    images: 0,
  };

  // Formik onSubmit
  const onSubmit = (values) => {
    setLoading(true);

    const postData = new FormData();

    const valuesObject = Object.entries(values).map(([key, value]) =>
      postData.append([key], value)
    );

    PostExhibitorLeasingContractImages(postData)
      .then((res) => {
        const changeStatusData = new FormData();

        changeStatusData.append(
          "exhibitor_leasing_id",
          state?.exhibitor_leasing_id
        );
        changeStatusData.append("reason", "");
        changeStatusData.append("condition", "در انتظار بستن پرونده");

        PostExhibitorLeasingChangeStatus(changeStatusData)
          .then(() => {
            setShowAlert({
              show: true,
              status: true,
              title: "تصویر قرارداد آنلاین با موفقیت بارگذاری شد.",
            });
            setLoading(false);
          })
          .catch(() => {
            setShowAlert({
              show: true,
              status: false,
              title: "متاسفانه خطایی رخ داده است.",
            });
            setLoading(false);
          });
      })
      .catch(() => {
        setShowAlert({
          show: true,
          status: false,
          title: "متاسفانه خطایی رخ داده است.",
        });
        setLoading(false);
      });
  };

  // Formik
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <>
      <div className="border border-gray-200 rounded-lg p-4">
        <h1 className="font-bold text-xl mb-4 text-blue border-b border-b-gray-200 pb-4 w-full">
          ارسال قرارداد آنلاین
        </h1>

        <div className="border-b border-b-gray-200 pb-8">
          <div className="flex items-center gap-1">
            <RiErrorWarningFill color="#EB6E02" />
            <span className="text-sm">
              برای ارسال قرارداد، ابتدا از این قسمت فایل قرارداد را دانلود کنید.
            </span>
          </div>

          <div className="flex justify-center items-center">
            <WordTemplate />
          </div>
        </div>

        <form className="my-4 flex flex-col" onClick={formik.handleSubmit}>
          <div className="flex items-center gap-1">
            <RiErrorWarningFill color="#EB6E02" />
            <span className="text-sm">
              فایل قرارداد را پرینت نموده و با دقت مطالعه نمایید. پس از تایید و
              امضا، تصویر قرارداد امضا شده را بارگذاری کنید.
            </span>
          </div>

          <div className="flex justify-center items-center mt-4">
            <div className="lg:w-2/3 w-full">
              <ImageUploader
                imgsSrc={contractImg}
                setImgsSrc={setContractImg}
                title="بارگذاری تصویر قرارداد امضا شده"
                imageCount={10}
                formik={formik}
                name="images"
              />
            </div>
          </div>

          <button
            className={`bg-blue text-white py-2 px-16 rounded-lg mx-auto mt-8 text-sm ${
              loading && "cursor-not-allowed"
            }`}
            type="submit"
          >
            تایید اطلاعات و مرحله بعد
            {loading && <LinearProgress />}
          </button>
        </form>
      </div>
      {showAlert.show && (
        <ExhibitorStatusAlert
          open={showAlert.show}
          setOpen={setShowAlert}
          status={showAlert.status}
          title={showAlert.title}
        />
      )}
    </>
  );
};

export default CustomerOnlineContract;
