import { carSaleRequestStatus } from "src/data/static-data/types/car-sale-request-status";
import Logo from "@/assets/images/Logo.svg";
import { httpService } from "@/services/http-service";
import { FRONT2DB, FRONT2MESSAGE } from "@/config/url";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { Puff } from "react-loading-icons";
import { useRouter } from "react-router";
import { toast } from "react-toastify";
import { NumberSeprator } from "@/utils/number-seprator";

const CardAd = ({ product }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");
  const [showStatus, setShowStatus] = useState(true);
  const {
    advertiser_id,
    image_guids,
    name,
    announced_price,
    brand,
    year_of_manufacture,
    mileage,
    color,
    first_name,
    last_name,
    status,
  } = product;
  const navigate = useRouter();

  useEffect(() => {
    var config = {
      responseType: "blob",
    };

    let arrayImage = null;

    if (image_guids?.length > 0) {
      arrayImage = image_guids?.split(",");
    }

    if (arrayImage?.length > 0 && typeof window !== "undefined") {
      httpService
        .get(`${FRONT2DB}/Images/Id/${arrayImage[0]}`, config)
        .then((res) => {
          setData([
            ...data,
            ...(checkExistWindow()
              ? [window.URL.createObjectURL(res.data)]
              : []),
          ]);
          setLoading(false);
        });
    }

    if (arrayImage == null) {
      setLoading(false);
    }
  }, []);

  const changeShowStatus = (e, id) => {
    e.stopPropagation();
    setShowStatus(false);
  };

  let initialValues = {
    adStatus: "",
  };

  const onSubmit = (values) => {
    let data = new FormData();
    data.append("adId", advertiser_id);
    data.append("new_status", values.adStatus);

    if (values.adStatus == "انتشار آگهی") {
      httpService
        .all([
          httpService.get(
            `${FRONT2MESSAGE}/AdSale/Id/${advertiser_id}/Publish`
          ),
          httpService.post(`${FRONT2MESSAGE}/AdSale/ChangeStatus`, data),
        ])
        .then(() => {
          toast.success(`آگهی با نام "${name}" مورد تایید شما قرار گرفت`);
          setShowStatus(true);
        })
        .catch(() => {
          toast.error("ثبت آگهی با خطا مواجه شد");
        });
    } else if (values.adStatus == "لغو درخواست") {
      httpService
        .all([
          httpService.get(
            `${FRONT2MESSAGE}/AdSale/Id/${advertiser_id}/UnPublish`
          ),
          httpService.post(`${FRONT2MESSAGE}/AdSale/ChangeStatus`, data),
        ])
        .then(() => {
          toast.error(`آگهی با نام ${name} توسط شما رد شد`);
          setShowStatus(true);
        })
        .catch(() => {
          toast.error("ثبت آگهی با خطا مواجه شد");
        });
    } else {
      httpService({
        method: "post",
        url: `${FRONT2MESSAGE}/AdSale/ChangeStatus`,
        data: data,
      })
        .then(() => {
          toast.success("وضعیت آگهی با موفقیت ثبت شد");
          setShowStatus(true);
        })
        .catch(() => {
          toast.error("تغییر وضعیت آگهی با خطا مواجه شد");
        });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const handleNavigateClick = () => {
    navigate.push(`/product/${advertiser_id}`);
  };

  const changeStatusHandler = (e) => {
    e.stopPropagation();
    setShowStatus(true);
  };

  return (
    <div
      className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 custom-shadow rounded-md"
      onClick={handleNavigateClick}
    >
      {loading && (
        <div className="p-4 object-cover rounded flex flex-col items-center justify-center text-blue ">
          <Puff stroke="#1242E0" strokeOpacity={0.125} speed={0.75} />
        </div>
      )}

      {!loading && data && (
        <img
          src={data}
          alt="product"
          className="object-cover rounded-tr-md md:rounded-br-md md:rounded-tl-none rounded-tl-md w-full lg:h-[14.5rem] md:h-full h-56 object-bottom"
        />
      )}

      {image_guids?.length == 0 && (
        <div className="p-4 w-full lg:h-full h-52 rounded-tr-md rounded-br-md object-cover flex flex-col items-center justify-center">
          <img src={Logo} alt="logo" />
        </div>
      )}

      <div className="lg:col-span-3 md:col-span-2 p-4 flex flex-col gap-2">
        <div className="flex gap-3">
          <span className="font-bold">{name}</span>
          <span className="text-blue  font-bold">
            {NumberSeprator(announced_price)}
            <span className="text-sm font-light mr-1">تومان</span>
          </span>
        </div>

        <div className="grid lg:grid-cols-4 grid-cols-2 bg-grey-50 py-3 px-4 rounded-md lg:gap-0 gap-2">
          <div className="flex-col">
            <span className="block text-grey-400 font-medium text-sm">
              برند و مدل
            </span>
            <span className="block font-medium">{brand}</span>
          </div>
          <div className="flex-col">
            <span className="block text-grey-400 font-medium text-sm">
              سال ساخت
            </span>
            <span className="block font-medium">{year_of_manufacture}</span>
          </div>
          <div className="flex-col">
            <span className="block text-grey-400 font-medium text-sm">
              کارکرد خودرو
            </span>
            <span className="block font-medium">{mileage}</span>
          </div>
          <div className="flex-col">
            <span className="block text-grey-400 font-medium text-sm">رنگ</span>
            <span className="block font-medium">{color}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-0 gap-2 lg:border-t lg:border-grey-300 pt-2">
          <div className="lg:border-l lg:border-grey-300 px-2">
            <span className="text-blue ">مشخصات فروشنده</span>
            <div className="flex items-center justify-between mt-2">
              <span className="font-bold">
                {first_name} {last_name}
              </span>
              <div className="flex font-light bg-purple-500 text-white px-3 rounded-full gap-1 text-sm items-center"></div>
            </div>
          </div>
          <div className="px-2 lg:border-0 border-t border-grey-300 lg:pt-0 pt-2">
            <span className="text-blue ">وضعیت درخواست فروش</span>
            <div className="flex justify-between mt-2">
              {showStatus ? (
                <>
                  <span className="font-bold">{status}</span>
                  <button
                    className="text-blue flex gap-1 border-b border-blue text-sm items-center"
                    onClick={(e) => changeShowStatus(e, advertiser_id)}
                  >
                    ویرایش وضعیت
                    <MdModeEdit />
                  </button>
                </>
              ) : (
                <>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="flex justify-between items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        className="bg-gray-lightest py-1 px-2"
                        value={formik.values.adStatus}
                        onChange={formik.handleChange}
                        name="adStatus"
                        defaultValue={status}
                      >
                        {carSaleRequestStatus.map((item) => (
                          <option value={item.label}>{item.label}</option>
                        ))}
                      </select>

                      {/* <SelectBox
                                                formik={formik}
                                                options={carSaleRequestStatus}
                                                name="adStatus"
                                                // label="وضعیت"
                                                classes="bg-gray-lightest -mt-3"
                                                selectedValue={status}
                                            /> */}
                      <button className="text-green flex gap-1 border-b border-green text-sm items-center">
                        ثبت وضعیت
                      </button>
                    </div>
                  </form>
                  <button
                    className="text-blue  mr-3"
                    onClick={(e) => changeStatusHandler(e)}
                  >
                    <CiCircleRemove size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAd;
