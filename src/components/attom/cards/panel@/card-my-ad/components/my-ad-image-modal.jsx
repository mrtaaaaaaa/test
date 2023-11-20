import {
  Box,
  Dialog,
  DialogContent,
  LinearProgress,
  Modal,
} from "@mui/material";
import ImageUploader from "@/attom/form@/components@/file-uploader/file-uploader";
import httpService from "@/services/http-service";
import { FRONT2MESSAGE } from "@/config/url";
import { Add, GalleryAdd } from "iconsax-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { B64toBlob } from "@/utils/b64-to-blob";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 600, xs: "90%" },
  bgcolor: "background.paper",
  border: "0",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function MyAdImageModal({ advertiser_id, setLoadImage }) {
  const [open, setOpen] = useState(false);
  const [imgsSrc, setImgsSrc] = useState([]);
  const [status, setStatus] = useState({ loading: null, error: null });
  const { userInfo } = useSelector((state) => state.auth);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleSubmitImage = (e) => {
    e.stopPropagation();
    if (imgsSrc.length !== 0) {
      setStatus({ ...status, loading: true });

      let data = new FormData();

      if (imgsSrc.length === 1) {
        data.append("files", B64toBlob(imgsSrc[0].src));
      } else if (imgsSrc.length > 1) {
        imgsSrc.map((item) => {
          return data.append("files", B64toBlob(item.src));
        });
      }

      data.append("user_name", userInfo.phone_number);

      httpService
        .post(`${FRONT2MESSAGE}/AdSale/Id/${advertiser_id}/Images/Add`, data)
        .then(() => {
          setStatus({ ...status, loading: false });
          toast.success("تصاویر خودرو با موفقیت بارگذاری شد");

          setOpen(false);
          setLoadImage((prev) => !prev);
        })
        .catch(() => {
          setStatus({ loading: true, error: true });
          toast.error("ثبت تصاویر با خطا مواجه شد");
          setOpen(false);
        });
    } else {
      toast.error("لطفا تصویری انتخاب نمایید");
    }
  };

  return (
    <div className="lg:col-span-2 col-span-7 lg:h-full h-auto flex flex-col justify-center items-center lg:object-cover object-fit m-auto lg:border-0 border-b border-gray-600 lg:p-0 p-4 lg:w-auto w-full">
      <GalleryAdd size="30" className="text-gray-500" />
      <span className="mt-3">تصویری ثبت نشده است</span>
      <button
        className="mt-4 flex items-center gap-1 bg-blue  px-3 py-2 rounded-md text-white  font-bold text-sm"
        name="open"
        onClick={handleOpen}
      >
        <Add size={18} />
        <span>افزودن تصویر</span>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h4 className="font-bold mb-4 w-full my-2 text-lg">افزودن تصویر</h4>
          <div className="flex flex-col w-full">
            <ImageUploader
              imgsSrc={imgsSrc}
              setImgsSrc={setImgsSrc}
              title="تصاویر مورد نظر خود را بارگذاری کنید."
            />
            <button
              className={`bg-blue text-white px-8 py-2 rounded-md text-md mt-4 w-fit mx-auto ${
                status.loading && "cursor-not-allowed"
              }`}
              disabled={status.loading ? true : false}
              onClick={(e) => {
                handleSubmitImage(e);
              }}
            >
              ثبت
              {status.loading && <LinearProgress />}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
