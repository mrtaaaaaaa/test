"use client";
import {
  GetBrandsPricingAPI,
  GetPriceGetAllAPI,
} from "@/apis/panel/admin/admin-pricing";
import { Loading } from "@/attom/loading/loading";
import CustomPagination from "@/attom/pagination/pagination";
import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableItem from "./table-item";

interface TotalBrandType {
  vcPrice_price: any[];
}

interface CarsDataType {
  brands: any;
  isLoading: boolean;
}

const TablePricing = () => {
  const [inputText, setInputText] = useState<string>("");
  const [totalBrands, setTotalBrands] = useState<TotalBrandType>();
  const [currPage, setCurrPage] = useState(1);
  const [carsData, setCarsData] = useState<CarsDataType>({
    brands: [],
    isLoading: false,
  });

  async function fetchData() {
    setCarsData({ ...carsData, isLoading: true });
    return GetBrandsPricingAPI({
      page_number: 1,
      page_size: 50,
    })
      .then((res) => {
        setCarsData({ brands: res.vcPrice_price, isLoading: false });
      })
      .catch(() => {
        setCarsData({ ...carsData, isLoading: false });
      });
  }

  useEffect(() => {
    fetchData();
    GetPriceGetAllAPI()
      .then((res) => setTotalBrands(res))
      .catch((err) => toast.error("متاسفانه خطایی رخ داده است."));
  }, []);

  let filteredModel: any[] = [];

  const inputHandler = (e: any) => {
    setInputText((e.target as HTMLInputElement).value.toLowerCase());
  };

  if (inputText) {
    totalBrands?.vcPrice_price?.map((car) => {
      try {
        if (
          car?.brand.includes(inputText) ||
          car?.model.includes(inputText) ||
          car?.type.includes(inputText)
        ) {
          filteredModel.push(car);
        }
      } catch (error) {
        return error;
        // toast.error("متاسفانه خطایی پیش آمده است.");
      }
    });
  }

  const handleChangePage = (event, newPage) => {
    filteredModel = [];
    httpService
      .post(`${FRONT2DB}/Price/Get/all`, {
        page_number: newPage,
        page_size: 50,
      })
      .then((res: any) => {
        setCurrPage(newPage);
        setCarsData({ brands: res.data.vcPrice_price, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {carsData.isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className="font-bold">قیمت‌گذاری خودروها</h1>
          <TextField
            fullWidth
            value={inputText}
            onChange={inputHandler}
            sx={{ marginY: "1rem" }}
            id="outlined-basic"
            label="جستجوی برند یا مدل خودرو"
            variant="outlined"
          />
          {
            <div className="lg:grid lg:grid-cols-5 flex flex-col gap-4">
              <div
                className="col-span-5 lg:grid lg:grid-cols-5 hidden text-blue items-center rounded-tr-md rounded-tl-md px-6 py-3"
                style={{ background: "rgba(37, 109, 133, 0.1)" }}
              >
                <div className="lg:block hidden text-sm text-black">#</div>
                <div className="text-sm"> برند و مدل</div>
                <div className="text-sm"> تاریخ آخرین به‌روزرسانی </div>
                <div className="text-sm">قیمت خودرو</div>
              </div>

              {filteredModel.length == 0
                ? carsData.brands?.length > 0 &&
                  carsData.brands?.map((item, index) => {
                    return (
                      <TableItem
                        index={
                          currPage < 2
                            ? index + 1
                            : (currPage - 1) * 50 + (index + 1)
                        }
                        brand={item.brand}
                        model={item.model}
                        type={item.type}
                        created_at={item.vc_price_at}
                        price={item.price}
                        vc_price={item.vc_price}
                      />
                    );
                  })
                : filteredModel?.map((item, index) => {
                    return (
                      <TableItem
                        type={item.type}
                        index={++index}
                        brand={item.brand}
                        model={item.model}
                        created_at={item.vc_price_at}
                        price={item.price}
                        vc_price={item.vc_price}
                      />
                    );
                  })}
            </div>
          }
        </>
      )}
      <CustomPagination
        handleChangePage={handleChangePage}
        count={Math.ceil(totalBrands?.count_all / 50)}
      />
    </div>
  );
};

export default TablePricing;
