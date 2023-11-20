"use client";

import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { CloseCircle, Trash } from "iconsax-react";
import { useState } from "react";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #DF2040",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

const DeleteSaveSearch = ({ setSearches }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    httpService
      .get(`${FRONT2MESSAGE}/Filter/Disable`)
      .then((res) => {
        setOpen(false);
        toast.success("جستجوی ذخیره شده با موفقیت حذف شد");
        setSearches({
          data: [],
          loading: false,
          error: false,
        });
      })
      .catch((err) =>
        toast.error("مشکلی در حذف جستجوی ذخیره شده به‌ وجود آمده‌است")
      );
  };

  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="border mr-auto ml-2 my-2 gap-1 flex items-center py-2 px-3 text-[#DF2040] border-[#DF2040] rounded-lg"
      >
        <Trash size="18" color="#DF2040" />
        <span className="text-sm font-medium">حذف آگهی</span>
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex gap-2 items-center mb-4">
            <CloseCircle size="25" color="#DF2040" variant="Bold" />
            آیا از حذف جستجوی‌ ذخیره‌شده خود مطمئن هستید؟
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={handleClose}
              sx={{
                border: "1px solid #ABABAB",
                borderRadius: "10px",
                padding: "4px 32px",
                color: "#242424",
                "&:hover": { background: "#fff" },
              }}
            >
              انصراف
            </Button>
            <Button
              onClick={handleSubmit}
              autoFocus
              sx={{
                background: "#DF2040",
                color: "#fff",
                borderRadius: "10px",
                padding: "4px 32px",
                "&:hover": { background: "#DF2040", color: "#fff" },
              }}
            >
              تایید
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteSaveSearch;
