import { PostPriceForCarsAPI } from "@/apis/panel/admin";
import { InputAdornment, TextField } from "@mui/material";
import moment from "jalali-moment";
import { useState } from "react";
import { toast } from "react-toastify";

interface PropTypes {
  brand: string;
  model: string;
  created_at: any;
  index: number | string;
  price: any;
  type: string;
  vc_price: number | string;
}

const TableItem = ({
  brand,
  model,
  created_at,
  index,
  price,
  type,
  vc_price,
}: PropTypes) => {
  var date = moment.unix(created_at).locale("fa").format("D MMMM YYYY");

  const [changedPrice, setChangedPrice] = useState({
    formattedPrice: price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    price: price,
  });
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleClick = () => {
    setStatus({ ...status, loading: true });
    PostPriceForCarsAPI([
      {
        model: model,
        brand: brand,
        price: Number(changedPrice.price),
        type: type,
        vc_price: vc_price,
      },
    ] )
      .then(() => {
        toast.success(`قیمت خودرو ${model} با موفقیت تغییر کرد`);
        setStatus({ ...status, loading: false });
      })
      .catch(() => {
        toast.error("مشکلی در ثبت قیمت به وجود آمده است");
        setStatus({ loading: false, error: true });
      });
  };

  // Change amount handler
  const changeAmountHandler = (e: any) => {
    const { value } = e.target;

    const sanitizedValue = value.replace(/,/g, "");

    // Format the number with commas
    const formattedValue = Number(sanitizedValue).toLocaleString();
    setChangedPrice({ price: sanitizedValue, formattedPrice: formattedValue });
  };

  return (
    <div className="lg:border-b lg:border-b-gray-200 pb-4 lg:col-span-5 col-span-1 lg:grid lg:grid-cols-5 gap-4  flex flex-col items-center rounded-tr-lg rounded-tl-lg lg:px-6 lg:py-3 p-5 lg:border-0 border border-grey-300 lg:rounded-none rounded-lg">
      <div className="font-medium lg:block hidden  w-full">{index} -</div>

      <div className="lg:block flex justify-between  w-full lg:mb-0 mb-2 lg:col-span-1 items-center">
        <span className="lg:hidden block font-bold">برند و مدل</span>
        <span>{type ? `${type} ` : ` ${model}`}</span>
      </div>

      <div className="lg:block flex justify-between w-full lg:mb-0 mb-2 items-center">
        <span className="lg:hidden block font-bold">
          تاریخ آخرین به‌روزرسانی
        </span>
        <span className="text-sm font-medium">{date}</span>
      </div>

      <div className="lg:block flex justify-between  w-full lg:mb-0 mb-2  items-center">
        <span className="lg:hidden block font-bold">قیمت خودرو</span>
        <span className="text-sm font-medium">
          <TextField
            sx={{
              borderRadius: "10px!important",
              color: "#1242E0",
              input: { fontSize: "12px", padding: "10px 4px" },
              div: { padding: "4px" },
              p: { fontSize: "14px" },
              "& .MuiInputBase-input": { padding: "6px 8px" },
            }}
            type="text"
            id="outlined-helperText"
            onChange={changeAmountHandler}
            label="قیمت"
            defaultValue={changedPrice.formattedPrice}
            value={changedPrice.formattedPrice}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  sx={{ "& .MuiTypography-root ": { fontSize: "12px" } }}
                >
                  تومان
                </InputAdornment>
              ),
            }}
          />
        </span>
      </div>

      <div className="lg:block flex tablet:justify-between justify-end w-full lg:mb-0 mb-2  items-center">
        <button
          className={`bg-blue text-white rounded-lg px-16 py-2 h-fit text-sm ${
            status.loading && "cursor-not-allowed"
          }`}
          onClick={handleClick}
          disabled={status.loading ? true : false}
        >
          ثبت
          {/* {status.loading && <LinearProgress />} */}
        </button>
      </div>
    </div>
  );
};

export default TableItem;
