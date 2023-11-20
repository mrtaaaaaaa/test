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
  width: { xs: "90%", md: 500 },
  bgcolor: "background.paper",
  border: "2px solid transparent",
  boxShadow: 24,
  borderRadius: "1rem",
};

export default function MyAdRemoveReasonModal({
  open,
  setOpen,
  is_draft,
  advertiser_id,
  buttonState,
  setButtonState,
}) {
  let formData = new FormData();

  const [showDesc, setShowDesc] = useState(false);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const handleClose = () => {
    setOpen(false);
    setShowDesc(false);
  };

  let removeAdReasons = [
    "خودرو از طریق اُتو فروخته شد.",
    "از روش های دیگر خودرو را فروختم.",
    "از فروش خودرو منصرف شدم.",
    "دلایل دیگر",
  ];

  const handleChange = (e) => {
    e.stopPropagation();

    setValue(e.target.value);
    if (e.target.value == "دلایل دیگر") {
      setShowDesc(true);
    } else {
      setShowDesc(false);
    }
  };

  const handleConfirmClick = () => {
    setButtonState({
      ...buttonState,
      is_draft: {
        state: is_draft,
        loading: true,
        error: null,
      },
    });

    if (value && value !== "error") {
      formData.append("reason", value == "دلایل دیگر" ? description : value);

      httpService
        .post(`${FRONT2MESSAGE}/AdSale/Id/${advertiser_id}/Draft`, formData)
        .then((res) => {
          toast.success("آگهی با موفقیت حذف شد");
          setButtonState({
            is_undraft: {
              state: true,
              loading: null,
              error: null,
            },
            is_draft: {
              state: false,
              loading: false,
              error: false,
            },
          });
        })
        .catch(() => {
          toast.error("حذف آگهی با خطا مواجه شد");
          setButtonState({
            ...buttonState,
            is_draft: {
              state: is_draft,
              loading: false,
              error: true,
            },
          });
        });

      setOpen(false);
      setShowDesc(false);
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
