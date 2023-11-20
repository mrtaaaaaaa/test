import { TextField } from "@mui/material";
import { useState } from "react";
import TableRow from "./table-row";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import CustomPagination from "@/attom/pagination/pagination";
import { useRequest } from "@/hooks/useRequest";
import { FRONT2DB } from "@/config/url";
import { toast } from "react-toastify";

const AdminExhibitorsLeasingCustomersReq = () => {
  const [inputText, setInputText] = useState<string | number>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [pagenum, setPageNum] = useState(1);

  const { data, isLoading, isError } = useRequest({
    method: "GP",
    url: `${FRONT2DB}/Exhibitor/Leasing/All`,
    data: {
      page_number: 1,
      page_size: 1075,
    },
  });

  const totalLeasings = data?.exhibitorLeasings || [];

  const handleChangePage = (
    event: React.ChangeEvent<HTMLInputElement>,
    newPage: number
  ): void => {
    setPageNum(newPage);
  };

  const {
    data: leasing,
    isLoading: leasLoading,
    isError: leasIsError,
  } = useRequest({
    method: "GP",
    url: `${FRONT2DB}/Exhibitor/Leasing/All`,
    data: {
      page_number: pagenum,
      page_size: 10,
    },
    pagination: {
      isPagination: true,
      currentPage: pagenum,
    },
  });

  let inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputText(value);

    if (value) {
      const filteredResults = totalLeasings.filter(
        (item: any) =>
          item.applicant_info.mobile_number.includes(value) |
          item.applicant_info.national_code.includes(value)
      );
      setFilteredData(filteredResults);
    } else {
      setFilteredData([]);
      // toast.info("درخواستی با این کد ملی ثبت نشده است.");
    }
  };

  return (
    <div>
      <TextField
        fullWidth
        value={inputText}
        onChange={inputHandler}
        sx={{ marginBottom: "1rem" }}
        id="outlined-basic"
        label="جستجو بر اساس شماره موبایل یا کد ملی"
        variant="outlined"
      />
      {leasLoading ? (
        <Loading />
      ) : leasIsError ? (
        <Alert title="متاسفانه خطایی رخ داده است." type="error" />
      ) : leasing?.exhibitorLeasings.length > 0 ? (
        <>
          {
            <div className="lg:grid lg:grid-cols-7 flex flex-col">
              <div className="lg:col-span-7 col-span-1 gap-2 tablet:grid tablet:grid-cols-12 hidden bg-blue-100 items-center rounded-tr-md rounded-tl-md px-3 py-4">
                <div className="text-xs font-medium lg:block hidden">#</div>
                <div className="text-xs text-center font-medium">
                  {" "}
                  کد متقاضی{" "}
                </div>
                <div className="text-xs text-center font-medium col-span-2">
                  {" "}
                  نام متقاضی
                </div>
                <div className="text-xs text-center font-medium col-span-2">
                  کدملی{" "}
                </div>
                <div className="text-xs text-center font-medium col-span-2">
                  {" "}
                  شماره تماس{" "}
                </div>
                <div className="text-xs text-center font-medium col-span-2">
                  وضعیت{" "}
                </div>
                <div className="text-xs text-center font-medium lg:col-span-2 tablet:col-span-3"></div>
              </div>

              {filteredData.length == 0
                ? 
                  leasing?.exhibitorLeasings?.map((item: any, index: number) => {
                    return <TableRow leasing={item} index={++index} />;
                  })
                : filteredData?.map((item, index) => {
                    return <TableRow leasing={item} index={++index} />;
                  })}
            </div>
          }
        </>
      ) : (
        <Alert title="خرید اقساطی ثبت نشده است." type="error" />
      )}
      <CustomPagination
        count={Math.ceil(leasing?.count_all / 10)}
        handleChangePage={handleChangePage}
      />
    </div>
  );
};

export default AdminExhibitorsLeasingCustomersReq;
