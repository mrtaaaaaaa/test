import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React from "react";
import InsuranceItem from "./Insurance-item";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: 500 },
  maxHeight: "80%",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 15,
  p: 3,
  borderRadius: "1em",
};

const Insurance = ({ handleOpen, setOpen, open }) => {
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  let accordionData = [
    // { title: "بیمه بدنه خودرو", enName: "BodyInsurance" },
    { title: "بیمه شخص ثالث", enName: "ThirdPartyInsurance" },
    // { title: "بیمه حوادث راننده", enName: "CarAccidentInsurance" },
    // { title: "بیمه خودروی بین الملل", enName: "InternationalCarInsurance" },
  ];

  return (
    <>
      <button
        type="button"
        className="bg-blue  text-white px-16 py-2 mx-auto rounded-lg mt-4 flex justify-center gap-2"
        onClick={handleOpen}
      >
        <AddCircleOutlineIcon />
        افزودن بیمه
      </button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="border-b border-b-gray-300 flex justify-between mb-4">
            <span className="text-lg w-full block pb-3 pr-6 font-bold">
              افزودن بیمه
            </span>
            <button onClick={handleClose}>
              <CloseIcon style={{ color: "#999CA0" }} />
            </button>
          </div>
          {accordionData.map(({ title, enName }, index) => {
            return <InsuranceItem key={enName} title={title} enName={enName} />;
          })}
        </Box>
      </Modal>
    </>
  );
};

export default Insurance;
