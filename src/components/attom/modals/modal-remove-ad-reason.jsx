import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid transparent",
  boxShadow: 24,
  borderRadius: "1rem",
};

export default function ModalRemoveAdReason({
  open,
  setOpen,
  product,
  setRemoveLoading,
  setRepublish,
}) {
  let formData = new FormData();

  const [showDesc, setShowDesc] = useState(false);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const handleClose = () => setOpen(false);

  let removeAdReasons = [
    "خودرو از طریق متاخودرو فروخته شد.",
    "از روش های دیگر خودرو را فروختم.",
    "از فروش خودرو منصرف شدم.",
    "دلایل دیگر",
  ];

  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value == "دلایل دیگر") {
      setShowDesc(true);
    } else {
      setShowDesc(false);
    }
  };

  const handleConfirmClick = () => {
    if (value && value !== "error") {
      formData.append("reason", value == "دلایل دیگر" ? description : value);

      httpService
        .post(
          `${FRONT2MESSAGE}/AdSale/Id/${product.advertiser_id}/Draft`,
          formData
        )
        .then((res) => {
          if (res.status === 200) {
            setRepublish(true);
            product.is_draft = true;
            setRemoveLoading(false);
            toast.success("آگهی با موفقیت حذف شد");
            setRemoveLoading(true);
          }
        })
        .catch(() => {
          toast.error("حذف آگهی با خطا مواجه شد");
          setRemoveLoading(false);
        });

      setOpen(false);
    } else {
      setValue("error");
    }
  };

  const handleTextAreaChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between border-b border-[#EBEBEB] p-3 items-center">
            <h1 className="font-bold text-xl">حذف آگهی</h1>
            <button onClick={handleClose}>
              <AiOutlineClose />
            </button>
          </div>

          <div className="py-5 px-7">
            <h2 className="font-bold pb-4">دلیل حذف آگهی را مشخص کنید.</h2>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                {removeAdReasons.map((item, index) => {
                  return (
                    <>
                      <FormControlLabel
                        key={item}
                        control={<Radio value={item} onChange={handleChange} />}
                        label={item}
                      />
                    </>
                  );
                })}
                <div className="w-[11rem]">
                  {showDesc && (
                    <textarea
                      onChange={handleTextAreaChange}
                      placeholder="توضیحات"
                      className="border rounded-md w-[28rem] p-3 mt-2 bg-[#F3F3F3] outline-none"
                    />
                  )}
                </div>
              </RadioGroup>
              {value == "error" && (
                <span className="text-xs text-red-500">
                  انتخاب دلیل حذف آگهی الزامی است
                </span>
              )}
            </FormControl>
          </div>

          <div className="border-t  border-[#EBEBEB] flex gap-5 justify-end py-8 px-5">
            <button
              className="border  rounded-lg h-10 w-24 border-b-gray-dark"
              onClick={handleClose}
            >
              انصراف
            </button>
            <button
              className="bg-blue rounded-lg h-10 w-24 text-white"
              onClick={handleConfirmClick}
            >
              تایید
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
