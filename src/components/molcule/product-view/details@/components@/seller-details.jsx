import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FRONT2DB, FRONT2MESSAGE } from "@/config/url";
import { TickCircle } from "iconsax-react";
import { useEffect, useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  ADD_AMOUNT,
  ADD_ONE_BRAND,
  CALCULATE_CHECK,
  SET_ADVERTISE_ID,
} from "@/redux/car-installment/car-installment/car-Installment-slice";
// import { NumberSeprator } from "utils";
import InstallmentCalculation from "./installments-calculation";
import httpService from "@/services/http-service";
import { useRouter } from "next/navigation";
import { NumberSeprator } from "@/utils/number-seprator";

const SellerDetails = ({ productData }) => {
  // const navigate = useNavigate();
  const router = useRouter();
  // const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const [sellOption, setSelOption] = useState(0);
  const dispatch = useDispatch();
  let options = [
    "خرید نقدی",
    //  "خرید اقساطی"
  ];
  // State for opening dialog
  const [open, setOpen] = useState(false);

  // State for phoneNumber
  const [phoneNumber, setPhoneNumber] = useState("");

  // Buy product handler
  const handleBuyClick = () => {
    let userInfoLength = Object.entries(userInfo);

    if (userInfoLength.length == 0) {
      router.push("/auth/check");
    } else {
      let data = new FormData();
      data.append("type", "adSale");
      data.append("status", productData.status);
      data.append("user_name", `${userInfo?.phone_number}`);
      data.append("ad_sale_id", productData.advertiser_id);
      data.append("ad_sale_model", productData.brand);
      data.append("ad_sale_brand", productData.brand);
      data.append("ad_sale_type", productData.brand);
      data.append("ad_sale_announced_price", productData.announced_price);

      httpService
        .post(`${FRONT2MESSAGE}/AdBuy`, data)
        .then(() => {
          setOpen(true);
        })
        .catch(() => {
          toast.error("مشکلی در ثبت سفارش بوجود آمده‌است");
        });
    }
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (productData.advertiser_id) {
      if (userInfo?.roles?.includes("OperationsDirector")) {
        httpService
          .get(
            `${FRONT2DB}/AdSale/Get/PhoneNumber/Id/${productData.advertiser_id}`
          )
          .then((res) => {
            setPhoneNumber(res.data.phoneNumber);
          })
          .catch((err) => {});
      }
    }
  }, [productData]);

  useEffect(() => {
    dispatch(ADD_AMOUNT(productData.announced_price));
    dispatch(
      SET_ADVERTISE_ID({
        advertiser_id: productData.advertiser_id,
        ad_code: productData.ad_code,
      })
    );
    dispatch(ADD_ONE_BRAND(productData.model));
    dispatch(CALCULATE_CHECK(productData.announced_price));
  }, [sellOption]);

  const handleOptionClick = (option) => {
    setSelOption(option);
  };

  return (
    <div className="seller-details py-2">
      {userInfo?.roles?.includes("OperationsDirector") ? (
        <>
          <div className="flex gap-4 items-center">
            <span className="font-bold text-xl whitespace-nowrap">
              اطلاعات فروشنده
            </span>
            <div className="border-t border-gray-300 w-full"></div>
          </div>
          <div className="flex gap-2 items-center bg-gray-150 py-1 md:px-3 px-5 rounded-full w-fit mt-4">
            <IoPersonOutline color="#1242E0" />
            <span>نام و نام‌ خانوادگی</span>
            <span className="font-bold">
              {productData.first_name} {productData.last_name}
            </span>
          </div>
          <div className="flex gap-4 items-center mt-2 bg-gray-150 py-1 md:px-3 px-5 rounded-full w-fit">
            <div className="flex gap-2 items-center">
              <BsTelephone color="#1242E0" />
              <span className="">شماره تماس</span>
            </div>
            <span className="text-blue ">{phoneNumber}</span>
          </div>
        </>
      ) : (
        <div>
          <div className="bg-white border xl:w-3/4 lg:w-full md:w-1/2 w-full border-blue  mx-auto rounded-lg my-4">
            <div className=" grid grid-cols-1 w-full border-b">
              {options.map((item, index) => {
                return (
                  <span
                    className={`text-center flex justify-center items-center  p-4 text-lg ${
                      index == sellOption &&
                      "border-t-4 rounded-tr-lg font-bold text-blue text-base rounded-tl-lg border-blue"
                    }`}
                    style={{
                      background:
                        index == sellOption ? "rgba(37, 109, 133, 0.2)" : "",
                    }}
                    onClick={() => handleOptionClick(index)}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
            {sellOption == 0 ? (
              <div className="flex flex-col gap-6 p-4">
                <span className="text-gray-700 text-sm block font-medium">
                  قیمت نقدی خودرو
                </span>
                <div className=" text-blue mr-auto">
                  <span className="block font-bold text-2xl text-blue">
                    {NumberSeprator(productData.announced_price)}{" "}
                    <span className="font-medium text-sm">تومان</span>
                  </span>
                </div>
                <button
                  className="bg-blue text-white rounded-md py-3 xl:w-1/2 lg:w-full md:w-2/3 w-full font-light flex justify-center items-center mx-auto"
                  onClick={handleBuyClick}
                >
                  ثبت درخواست خرید خودرو
                </button>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center md:pb-8">
                <InstallmentCalculation />
              </div>
            )}
          </div>

          <div>
            <Dialog open={open} keepMounted onClose={handleClose}>
              <DialogTitle sx={{ display: "flex", justifyContent: "center" }}>
                <div>
                  <TickCircle size="35" color="#258574" variant="Bold" />
                </div>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <span className="block font-bold text-green text-center mb-3 text-lg">
                    درخواست خرید شما ثبت شد
                  </span>
                  <span className="block text-center">
                    کارشناسان ما به زودی با شما تماس خواهند گرفت.
                  </span>
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDetails;
