import { img } from "@/data";
import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  outline: "none",
  height: { xs: "95%", md: "70%", lg: "90%", xl: "90%" },
  width: { xs: "90%", xl: "70rem" },
  padding: "2rem",
  overflow: "auto",
};

const childeStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  outline: "none",
  height: { xs: "auto", md: "70%", lg: "90%", xl: "90%" },
  width: { xs: "90%", xl: "70rem" },
  padding: "2rem",
  overflow: "auto",
};

const ImageGuideModal = ({ onClick, open, onClose }) => {
  // Child Modal component
  const ChildModal = ({ content }) => {
    const [openChildModal, setOpenChildModal] = useState(false);

    // Open ChildModal
    const handleOpen = (e) => {
      e.stopPropagation();
      setOpenChildModal(true);
    };

    // Close ChildModal
    const handleClose = (e) => {
      e.stopPropagation();
      setOpenChildModal(false);
    };
    return (
      <>
        <button
          onClick={handleOpen}
          className="absolute w-full h-full text-transparent"
        >
          {content.title}
        </button>
        <Modal
          open={openChildModal}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={childeStyle}>
            <div className="flex flex-col justify-center items-center h-full realtive">
              <button className="absolute top-2 left-2" onClick={handleClose}>
                <AiFillCloseCircle size="20px" color="#666" />
              </button>
              <img src={content.img} alt="image" />
              <span className="text-sm mt-2">{content.title}</span>
            </div>
          </Box>
        </Modal>
      </>
    );
  };

  const boxes = [
    {
      img: img.upload_img_guide1.src,
      title: "نمای کنار خودرو(نمای سمت شاگرد)",
    },
    {
      img: img.upload_img_guide2.src,
      title: "زاویه 45 درجه از پشت خودرو سمت راننده",
    },
    { img: img.upload_img_guide3.src, title: "نمای پشت خودرو" },
    {
      img: img.upload_img_guide4.src,
      title: "زاویه 45 درجه ازجلوی خودرو سمت شاگرد",
    },
    { img: img.upload_img_guide14.src, title: "نمای جلوی خودرو" },
    {
      img: img.upload_img_guide15.src,
      title: "زاویه 45 درجه از جلوی خودرو سمت راننده",
    },
    { img: img.upload_img_guide5.src, title: "آپشن‌های خودرو" },
    { img: img.upload_img_guide6.src, title: "آپشن‌های خودرو" },
    { img: img.upload_img_guide7.src, title: "نمای صندلی جلو(سمت راننده)" },
    { img: img.upload_img_guide8.src, title: "نمای صندلی عقب" },
    {
      img: img.upload_img_guide9.src,
      title: "نمای داخلی خودرو جلو(کل داشبورد)",
    },
    { img: img.upload_img_guide10.src, title: "نمای صفحه کیلومتر خودرو" },
    {
      img: img.upload_img_guide11.src,
      title: "نمای رینگ و لاستیک جلو (سمت راننده)",
    },
    { img: img.upload_img_guide12.src, title: "نمای رینگ و لاستیک" },
    {
      img: img.upload_img_guide13.src,
      title: "نمای رینگ و لاستیک جلو (سمت شاگرد)",
    },
    { img: img.upload_img_guide16.src, title: "نمای رکاب(سمت راننده)" },
    { img: img.upload_img_guide17.src, title: "دنده اتومات" },
    { img: img.upload_img_guide18.src, title: "آپشن‌های خودرو" },
    { img: img.upload_img_guide19.src, title: "آپشن‌های خودرو" },
    {
      img: img.upload_img_guide20.src,
      title: "عکس خوردگی یا خط‌و‌خش بدنه خودرو",
    },
  ];

  return (
    <>
      <span
        onClick={onClick}
        className="bg-purple text-white px-4 py-1 rounded-full text-xs absolute top-1 left-1 cursor-pointer"
      >
        راهنمای آپلود عکس
      </span>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span className="text-xl font-bold block">راهنمای بارگذاری عکس</span>
          <span className="text-sm mb-4 block">
            با استفاده از این راهنما عکس‌های لازم برای ثبت آگهی خودروی‌تان را
            تصویربرداری کنید.
          </span>
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-3 realtive mt-5">
            {boxes.map((item) => (
              <div className="flex flex-col gap-2 custom-shadow p-3 rounded-md items-center justify-center bg-white guide-image cursor-pointer relative">
                <img key={item.title} src={item.img} alt="image" />
                <span className="text-sm mt-2">{item.title}</span>
                <ChildModal content={item} />
              </div>
            ))}
          </div>
          <button className="absolute top-2 left-2" onClick={onClose}>
            <AiFillCloseCircle size="20px" color="#666" />
          </button>
        </Box>
      </Modal>
    </>
  );
};

export default ImageGuideModal;
