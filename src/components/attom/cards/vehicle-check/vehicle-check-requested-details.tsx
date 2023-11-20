import PdfReport from "@/attom/pdf/pdf-report";
import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";
import { useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/redux/auth/auth-Slice";
import Link from "next/link";
import { toast } from "react-toastify";

interface PropTypes {
  vcReq: {
    vehicle_check_id: string | number;
    result: any;
    brand_and_model: string;
    inspector: {
      user_name: string;
    };
  };
}

const VehicleCheckRequestedDetails = ({ vcReq, inspectors }: any) => {
  const { userInfo } = useAppSelector(authSelector);

  const setInspectorHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.target.value.split(",");
    let userData = {
      user_name: value[0],
      first_name: value[1],
      last_name: value[2],
    };

    const postData = new FormData();
    postData.append("user_name", userData.user_name.trim());
    postData.append("first_name", userData.first_name.trim());
    postData.append("last_name", userData.last_name.trim());

    httpService
      .post(
        `${FRONT2MESSAGE}/VehicleCheck/Id/${
          vcReq.vehicle_check_id
            ? vcReq.vehicle_check_id
            : vcReq[0].vehicle_check_id
        }/Set/Inspector`,
        postData
      )
      .then((res) => toast.success("انتخاب کارشناس با موفقیت انجام شد."))
      .catch((err) => toast.error("مشکلی در انتخاب کارشناس بوجود آمده‌است"));
  };

  // Request details
  const reqDetails = [
    {
      title: "برند و مدل",
      amount: vcReq?.brand_and_model && vcReq.brand_and_model,
    },
    {
      title: "سال ساخت",
      amount: vcReq?.year_of_manufacture && vcReq.year_of_manufacture,
    },
    {
      title: "محدوده بازدید",
      amount: vcReq?.vehicle_check_area && vcReq.vehicle_check_area,
    },
  ];

  let result = vcReq?.result;
  let brand_and_model = vcReq?.brand_and_model;

  interface Inspector {
    user_name: string;
    first_name: string;
    last_name: string;
  }
  return (
    <div className="p-4 border-b border-b-gray-lightest">
      {/* Header part */}
      <div className="flex flex-wrap items-center lg:justify-start justify-between gap-2">
        <span className="text-blue  text-lg font-bold">
          درخواست کارشناسی {vcReq?.brand_and_model}
        </span>
        <span className="block text-sm">
          {vcReq?.inspector && (
            <div>
              {!vcReq?.inspector.user_name && "در انتظار تعیین کارشناس"}
              {vcReq?.inspector.user_name &&
                !vcReq.result &&
                "در انتظار بارگذاری نتیجه کارشناسی"}
              {vcReq?.inspector.user_name && vcReq.result && "اتمام فرآیند"}
            </div>
          )}
        </span>
      </div>

      {/* Details */}
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-5 gap-4 items-center">
        {reqDetails?.map(({ title, amount }) => (
          <div>
            <span className="block mb-3 font-medium">{title}</span>
            <span className="block text-sm">{amount}</span>
          </div>
        ))}

        {userInfo?.roles?.includes("User") && vcReq?.inspector.user_name && (
          <div>
            <span className="block mb-3 font-medium">کارشناس خودرو</span>
            <span className="block text-sm">
              {vcReq?.inspector.user_name &&
                `${vcReq?.inspector.first_name} ${vcReq?.inspector.last_name} `}
            </span>
          </div>
        )}

        {/* Select inspector */}
        {userInfo?.roles?.includes("OperationsDirector") && (
          <div>
            <span className="block mb-3 md:hidden  font-medium">
              نام کارشناس
            </span>
            <select
              name="inspector"
              onChange={setInspectorHandler}
              className="rounded-lg border border-blue text-xs px-2 py-2 w-full"
            >
              {vcReq?.inspector &&
                (vcReq?.inspector.user_name ? (
                  <option selected hidden>
                    {vcReq?.inspector.first_name} {vcReq?.inspector.last_name}
                  </option>
                ) : (
                  <option selected hidden>
                    کارشناس را انتخاب کنید
                  </option>
                ))}

              {inspectors?.map((inspector: Inspector) => (
                <option
                  value={`${inspector?.user_name} , ${inspector?.first_name} , ${inspector?.last_name}`}
                >
                  {inspector?.first_name} {inspector?.last_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Vehicle result */}
        <div className="flex flex-col items-center gap-2">
          {/* {result && <PdfReport result={{ result, brand_and_model }} />} */}

          {/* {userInfo?.roles?.includes("OperationsDirector") && vcReq?.inspector.user_name && (
            <Link
              href="/vehicle-check/form"
              className="text-xs flex items-center justify-center text-blue  border border-blue py-2 rounded-lg xl:w-4/5 w-full"
              state={{
                id: vcReq.vehicle_check_id
                  ? vcReq.vehicle_check_id
                  : vcReq[0].vehicle_check_id,
                model: vcReq.brand_and_model
                  ? vcReq.brand_and_model
                  : vcReq[0].brand_and_model,
              }}
            >
              بارگذاری نتیجه
            </Link>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default VehicleCheckRequestedDetails;
