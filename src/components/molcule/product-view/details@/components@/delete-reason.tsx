import httpService from "@/services/http-service";
import { Dialog, DialogContent, LinearProgress } from "@mui/material";
import { FRONT2MESSAGE } from "@/config/url";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState } from "@/redux/store";

type AdminConfirmPropsType = {
  name: string;
  advertiser_id: string | number;
  is_published: boolean;
};

type StatusType = {
  confirm: {
    loading: null | boolean;
    error: null | boolean;
  };
  not_confirm: {
    loading: null | boolean;
    error: null | boolean;
  };
};

const AdminConfirm = ({
  name,
  advertiser_id,
  is_published,
}: AdminConfirmPropsType) => {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  // State for dialog guid
  const [openGuide, setOpenGuide] = useState(false);
  const [status, setStatus] = useState<StatusType>({
    confirm: {
      loading: null,
      error: null,
    },
    not_confirm: {
      loading: null,
      error: null,
    },
  });

  const errList = [
    {
      label: "آگهی بیشتر از حدمجاز روزانه ویرایش شده است.",
      value: "آگهی بیشتر از حدمجاز روزانه ویرایش شده است.",
    },
    {
      label: "خودروی آگهی‌شده، غیرمجاز است.",
      value: "خودروی آگهی‌شده، غیرمجاز است.",
    },
    {
      label: "آگهی فاقد عنوان، توضیحات و تصویر خودرو است.",
      value: "آگهی فاقد عنوان، توضیحات و تصویر خودرو است.",
    },
    { label: "محتوای آگهی مناسب نیست.", value: "محتوای آگهی مناسب نیست." },
    {
      label:
        "عبارت‌های تبلیغاتی و نامرتبط در عنوان یا توضیحات به‌کاربرده شده است.",
      value:
        "عبارت‌های تبلیغاتی و نامرتبط در عنوان یا توضیحات به‌کاربرده شده است.",
    },
    {
      label: "آگهی تکراری است.",
      value: "آگهی تکراری است.",
    },
  ];

  const initialValues = {
    reason: "",
  };

  // Open dialog guide
  const handleOpenGuide = () => {
    setOpenGuide(true);
  };

  // Close dialog guide
  const handleCloseGuide = () => {
    setOpenGuide(false);
  };

  const validationSchema = Yup.object({
    reason: Yup.string().required("درج دلیل الزامی است."),
    // .matches(
    //   /^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F\u200C\s0-9a-zA-Z]+$/,
    //   "مقدار وارد شده صحیح نیست."
    // ),
  });

  const onSubmit = (values: { reason: string }) => {
    setStatus({
      ...status,
      not_confirm: {
        loading: true,
        error: false,
      },
    });
    let data = new FormData();

    data.append("adId", `${advertiser_id}`);
    data.append("reason", values.reason);

    httpService
      .post(`${FRONT2MESSAGE}/AdSale/UnPublish`, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(`آگهی با نام "${name}" توسط شما رد شد `);
          setOpenGuide(false);

          setStatus({
            ...status,
            not_confirm: {
              loading: false,
              error: false,
            },
          });
        }
      })
      .catch(() => {
        toast.error("مشکلی در حذف آگهی بوجود آمده‌است");
        setOpenGuide(false);
        setStatus({
          ...status,
          not_confirm: {
            loading: false,
            error: true,
          },
        });
      });
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleConfirmClick = (id: string | number) => {
    setStatus({
      ...status,
      confirm: {
        loading: true,
        error: false,
      },
    });

    httpService
      .get(`${FRONT2MESSAGE}/AdSale/Id/${id}/Publish`)
      .then((res) => {
        if (res.status === 200) {
          toast.success(`آگهی با نام "${name}" مورد تایید شما قرار گرفت`);
          setStatus({
            ...status,
            confirm: {
              loading: false,
              error: false,
            },
          });
        }
      })
      .catch(() => {
        toast.error("مشکلی در تایید آگهی بوجود آمده‌است");
        setStatus({
          ...status,
          confirm: {
            loading: false,
            error: true,
          },
        });
      });
  };

  return (
    userInfo?.roles?.includes("OperationsDirector") && (
      <div className="flex justify-center mt-3 border-t border-gray-300 pt-4 gap-4">
        <button
          className="bg-blue text-white font-medium rounded-md px-4 py-2 md:w-fit w-full disabled:bg-gray-300 disabled:text-gray-dark disabled:cursor-not-allowed"
          onClick={() => handleConfirmClick(advertiser_id)}
          disabled={status.confirm.loading ? true : is_published}
        >
          تایید
          {status.confirm.loading && <LinearProgress />}
        </button>

        <button
          className="bg-white border border-red  text-red font-medium rounded-md px-4 py-2 md:w-fit w-full disabled:bg-gray-300 disabled:text-gray-dark disabled:cursor-not-allowed"
          onClick={handleOpenGuide}
          disabled={status.not_confirm.loading ? true : false}
        >
          عدم تایید
          {status.not_confirm.loading && <LinearProgress />}
        </button>

        <Dialog
          open={openGuide}
          keepMounted
          onClose={handleCloseGuide}
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="pt-5 px-5 relative">
            <span className="font-bold block text-xl">
              لطفا علت رد آگهی را انتخاب نمایید
            </span>
            {formik.errors.reason && formik.touched.reason && (
              <span className="text-red-500 text-xs -mt-5 absolute -bottom-4">
                {formik.errors.reason}
              </span>
            )}
          </div>
          <DialogContent>
            <form onSubmit={formik.handleSubmit}>
              <div role="group" aria-labelledby="my-radio-group">
                {errList.map((item) => (
                  <div className="flex items-center gap-1 mt-2">
                    <input
                      type="radio"
                      name="reason"
                      value={item.value}
                      onChange={formik.handleChange}
                    />
                    <label>{item.label}</label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue text-white font-medium rounded-md px-4 py-2 md:w-fit w-full mt-4"
                >
                  ثبت
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    )
  );
};

export default AdminConfirm;
