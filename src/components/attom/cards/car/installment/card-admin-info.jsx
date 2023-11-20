import { Skeleton } from "@mui/material";
import httpService from "@/services/http-service";
import { FRONT2DB, FRONT2MESSAGE } from "@/config/url";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "next/link";
import { toast } from "react-toastify";
import { SET_CURRENT_STEP } from "@/redux/car-installment/car-installment/car-Installment-slice";

export default function CardAdminInfo() {
  const { car_info, user_info, images, car_installment_info } = useSelector(
    (state) => state.carInstallmentInfo
  );

  useEffect(() => {}, [car_info, user_info, images, car_installment_info]);

  return (
    <div className="mb-16">
      <h2 className="font-bold text-lg mb-4">
        جزئیات درخواست خرید اقساطی {user_info.name}
      </h2>
      <PersonalInfo data={user_info} />
      <CarInfo data={car_info} />
      <NationalCardImage
        images={images}
        id={car_installment_info.leasing_id}
        status={car_installment_info.status}
      />

      <Buttons id={car_installment_info.leasing_id} />
    </div>
  );
}

const PersonalInfo = ({ data }) => {
  // اطلاعات فردی
  const personalInfo = [
    {
      title: "نام و نام‌خانوادگی",
      data: data.name,
    },
    {
      title: "کدملی",
      data: data.national_code,
    },
    {
      title: "نلفن محل سکونت",
      data: data.phone_number,
    },
    {
      title: "کدپستی محل سکونت",
      data: data.postal_code,
    },
    {
      title: "آدرس محل سکونت",
      data: data.address,
    },
  ];

  return (
    <div className="bg-white shadow-md pt-5 px-5 pb-8 rounded-lg my-4">
      <span className="block text-blue font-bold mb-4 mt text-lg">
        اطلاعات فردی
      </span>

      <div className="grid md:grid-cols-4 grid-cols-2 justify-between gap-4">
        {personalInfo.map(({ title, data }, index) => (
          <div className={index == 4 && "md:col-span-4 col-span-2 mt-4"}>
            <span className="text-gray-400 text-xs block mb-1">{title}</span>
            <span className="bock font-medium ">{data}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CarInfo = ({ data }) => {
  return (
    <div className="bg-white shadow-md pt-5 px-5 pb-8 rounded-lg my-4">
      <span className="block text-blue font-bold mb-4 mt text-lg">
        اطلاعات خودرو
      </span>
      <div className="grid md:grid-cols-3 grid-cols-2 justify-between gap-2">
        {/* Check if the leasing is from product detail or its from leasing page */}
        {data.ad_code ? (
          <>
            <div>
              <span className="text-gray-400 text-xs block mb-1">
                برند، مدل
              </span>
              <span className="bock font-medium">
                {data.model} - {data.brand}
              </span>
            </div>

            <div className="flex items-end justify-end col-span-2 ">
              <Link
                href={`/${data?.ad_code}`}
                className="text-sm border border-blue px-3 py-2 text-blue rounded-lg font-medium"
              >
                لینک آگهی
              </Link>
            </div>
          </>
        ) : (
          data.brand_model.map(({ model, brand }) => (
            <div>
              <span className="text-gray-400 text-xs block mb-1">
                برند، مدل
              </span>
              <span className="bock font-medium">
                {model} - {brand}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const NationalCardImage = ({ images, id, status }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData("");
  }, [id]);

  useEffect(() => {
    var config = {
      responseType: "blob",
    };

    let imageArray = null;

    imageArray = images?.split(",");

    imageArray.map((item) => {
      if (item !== "" && typeof window !== "undefined") {
        httpService
          .get(`${FRONT2DB}/Leasing/Get/Id/${id}/Documents/${item}`, config)
          .then((res) => {
            let image =
              typeof window !== "undefined"
                ? window.URL.createObjectURL(res.data)
                : "";
            setData((imageData) => [...imageData, { image }]);
            setLoading(false);
          });
      }
    });

    if (imageArray == null) {
      setLoading(false);
    }

    if (status == "inValid") {
      dispatch(SET_CURRENT_STEP(2));
    }
  }, [id]);

  const confirmHandler = () => {
    httpService
      .get(`${FRONT2MESSAGE}/Leasing/Id/${id}/Approve/Documents`)
      .then(() => {
        toast.success("تصاویر با موفقیت تایید شد");
      })
      .catch((res) => console.log("مشکلی در تایید تصاویر پیش آمده‌است"));
  };

  const declineHandler = () => {
    httpService
      .get(`${FRONT2MESSAGE}/Leasing/Id/${id}/DisApprove/Documents`)
      .then(() => {
        toast.success("تصاویر با موفقیت رد شد");
      })
      .catch((res) => console.log("مشکلی در عدم تایید تصاویر پیش آمده‌است"));
  };

  return (
    <div className="bg-white shadow-md pt-5 px-5 pb-8 rounded-lg my-4">
      <span className="block text-blue font-bold mb-4 mt text-lg">
        تصاویر کارت ملی
      </span>

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
        {loading ? (
          <>
            <Skeleton variant="rounded" sx={{ width: "100%", height: "" }} />
            <Skeleton variant="rounded" sx={{ width: "100%", height: "" }} />
          </>
        ) : (
          data &&
          data.map(({ image }) => (
            <img
              src={image}
              alt="product"
              className=" w-full h-full object-cover rounded-xl"
            />
          ))
        )}

        <div className="flex items-center justify-center">
          <span className="text-sm">{status}</span>
        </div>

        <div className="flex flex-col gap-1 items-end justify-center">
          <button
            className="text-sm font-bold text-green border border-green rounded-lg w-[8rem] py-2"
            onClick={confirmHandler}
          >
            تایید
          </button>
          <button
            className="text-sm font-bold text-red-500 border border-red-500 rounded-lg w-[8rem] py-2"
            onClick={declineHandler}
          >
            عدم تایید
          </button>
        </div>
      </div>
    </div>
  );
};

const Buttons = ({ id }) => {
  let postData = new FormData();

  const confirmHandler = () => {
    postData.append("leasing_id", id);
    postData.append("new_status", "valid");

    httpService
      .post(`${FRONT2MESSAGE}/Leasing/ChangeStatus`, postData)
      .then(() => {
        toast.success("درخواست کارشناسی تایید شد");
      })
      .catch(() => toast.error("خطایی رخ داده است"));
  };

  const declineHandler = () => {
    postData.append("leasing_id", id);
    postData.append("new_status", "inValid");

    httpService
      .post(`${FRONT2MESSAGE}/Leasing/ChangeStatus`, postData)
      .then(() => {
        toast.success("درخواست کارشناسی رد شد");
      })
      .catch(() => toast.error("درخواست کارشناسی رد شد"));
  };

  return (
    <div className="buttons flex justify-center gap-2 mt-5">
      <button
        className="text-sm font-bold text-blue border border-blue rounded-lg lg:px-8 px-3 py-2"
        onClick={confirmHandler}
      >
        تایید نهایی
      </button>

      <button
        className="text-sm font-bold text-red-500 border border-red-500 rounded-lg lg:px-8 px-3 py-2"
        onClick={declineHandler}
      >
        عدم تایید
      </button>
    </div>
  );
};
