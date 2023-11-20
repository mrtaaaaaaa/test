import { img } from "@/data";
import { useAppSelector } from "@/hooks/redux-hooks";
import { authSelector } from "@/redux/auth/auth-Slice";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  border: 0,
  borderRadius: "10px",
  outline: "none",
  height: "auto",
  maxHeight: "90%",
  width: { xs: "90%", md: "80%", lg: "30%" },
};

// interface ExhibitorStatusAlertTypeProps {
//   status: string;
//   title: string;
//   open: boolean;
//   setOpen: (value: { show: boolean; status: boolean; title: string }) => void;
// }

export default function ExhibitorStatusAlert({ status, title, open, setOpen }) {
  const handleClose = () => setOpen(false);
  const { userInfo } = useAppSelector(authSelector);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="bg-white rounded-lg p-3 flex flex-col gap-4">
          <div className="bg-white relative">
            <img src={img.logo_main.src} alt="logo" className="mx-auto" />
            <button onClick={handleClose} className="absolute left-0 top-0">
              <GrFormClose />
            </button>
          </div>
          {status ? (
            <AiFillCheckCircle
              color="#13C39C"
              size={50}
              stroke="#03AC87"
              strokeWidth={2}
              className="mx-auto"
            />
          ) : (
            <AiFillCloseCircle
              color="#DF2040"
              size={50}
              stroke="#03AC87"
              strokeWidth={2}
              className="mx-auto"
            />
          )}
          <span className="block text-center font-medium ">{title}</span>
          <Link
            href={
              userInfo.roles[0] == "Exhibitors"
                ? "/panel/exhibitor/leasing/customers-req"
                : "/panel/admin/exhibitor/leasing/customers-req"
            }
            className="text-center block bg-blue text-white px-8 py-2 rounded-md outline-none mx-auto"
          >
            بازگشت به صفحه پرونده‌ها
          </Link>
        </div>
      </Box>
    </Modal>
  );
}
