import {
  Calendar,
  DocumentText,
  KeySquare,
  LoginCurve,
  Message,
  People,
  Profile,
  TableDocument,
} from "iconsax-react";
import { AiOutlineSetting } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "next/link";

const Sidebar = () => {
  let LS;
  useEffect(() => {
    if (typeof window !== "undefined") {
      LS = window.localStorage;
    }
  }, []);

  const location = useLocation();

  let { userInfo } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    if (typeof window !== "undefined") {
      LS.removeItem("userToken");
      LS.removeItem("userInfo");
    }
  };

  const AdminMenu = [
    {
      value: "اطلاعات فردی",
      icon: <Profile size="18" color="#1242E0" variant="TwoTone" />,
      href: "/admin/info",
      onClick: "",
    },
    {
      value: "آگهی‌های من",
      icon: <TableDocument size="18" color="#1242E0" variant="TwoTone" />,
      href: "/admin/ads",
      onClick: "",
    },
    {
      value: "درخواست‌های ثبت‌ شده خرید ویژه",
      icon: <DocumentText size="18" color="#1242E0" variant="TwoTone" />,
      href: "/admin/vip/car-order",
      onClick: "",
    },
    {
      value: "درخواست‌های ثبت‌شده خرید عادی",
      icon: <DocumentText size="18" color="#1242E0" variant="TwoTone" />,
      href: "/admin/normal/car-order",
      onClick: "",
    },
    {
      value: "درخواست‌های ثبت‌شده فروش ویژه",
      icon: <DocumentText size="18" color="#1242E0" variant="TwoTone" />,
      href: "/admin/vip/car-sale",
      onClick: "",
    },
    {
      value: "درخواست‌های ثبت‌شده فروش عادی",
      icon: <DocumentText size="18" color="#1242E0" variant="TwoTone" />,
      href: "/admin/list",
      onClick: "",
    },
    {
      value: "درخواست‌های ثبت‌شده کارشناسی",
      icon: <DocumentText size="18" color="#1242E0" variant="TwoTone" />,
      href: "/admin/vehicle-checks",
      onClick: "",
    },
    {
      value: "درخواست‌های  ثبت‌شده خرید اقساطی",
      icon: <DocumentText size="18" color="#1242E0" variant="TwoTone" />,
      href: "/admin/car-installment",
      onClick: "",
    },
    {
      value: "قیمت‌گذاری",
      icon: <DocumentText size="18" color="#1242E0" variant="TwoTone" />,
      href: "/admin/car-pricing",
      onClick: "",
    },
    // {
    //   value: "مدیریت آگهی‌ها",
    //   icon: <AiOutlineSetting />,
    //   href: "/admin/list",
    //   onClick: "",
    // },
    // {
    //   value: "  قیمت‌گذاری خودرو ها",
    //   icon: <AiOutlineMenu />,
    //   href: "/admin/car-pricing",
    //   onClick: "",
    // },
    {
      value: "ارسال پیامک",
      icon: <Message size="18" color="#1242E0" variant="TwoTone" />,
      href: "/admin/message",
      onClick: "",
    },
    {
      value: "تغییر گذرواژه",
      icon: <KeySquare size="18" color="#1242E0" variant="TwoTone" />,
      href: "/admin/change-password",
      onClick: "",
    },
  ];

  const SuperAdminMenu = [
    {
      value: "اطلاعات فردی",
      icon: <Profile size="18" color="#1242E0" variant="TwoTone" />,
      href: "/super-admin/info",
      onClick: "",
    },
    {
      value: "تغییر دسترسی کاربران",
      icon: <People size="18" color="#1242E0" variant="TwoTone" />,
      href: "/super-admin/change-role",
      onClick: "",
    },
    {
      value: "تعیین تاریخ انقضای آگهی‌ها",
      icon: <Calendar size="18" color="#1242E0" variant="TwoTone" />,
      href: "/super-admin/expiration-date",
      onClick: "",
    },
    {
      value: "تغییر گذرواژه",
      icon: <KeySquare size="18" color="#1242E0" variant="TwoTone" />,
      href: "/super-admin/change-password",
      onClick: "",
    },
  ];

  return (
    <ul className="md:block flex w-full custom-scrollbar overflow-auto md:gap-0 gap-5 pb-2 md:border-b-0 border-b border-gray-250">
      {userInfo?.role == "Admin" &&
        AdminMenu.map(({ value, icon, href, onClick }, index) => {
          let isActive = location.pathname === href;
          return (
            <Link
              key={index}
              href={href}
              className={` ${
                isActive && "text-blue font-bold"
              } md:whitespane-none whitespace-nowrap flex items-center gap-2  ${
                value === "خروج"
                  ? "md:border-b-0 "
                  : "md:border-b md:border-gray-250 "
              } md:py-3 py-1 cursor-pointer md:text-base text-sm md:border-gray-250`}
            >
              <div onClick={onClick}>
                {icon}
                <li>{value}</li>
              </div>
            </Link>
          );
        })}

      {userInfo?.role == "SuperAdmin" &&
        SuperAdminMenu.map(({ value, icon, href, onClick }, index) => {
          let isActive = location.pathname === href;
          return (
            <Link
              key={index}
              href={href}
              className={`${
                isActive && "text-blue font-bold"
              } md:whitespane-none whitespace-nowrap flex items-center gap-2 md:border-b md:border-gray-250 md:py-3 py-1 cursor-pointer md:text-base text-sm `}
            >
              <div onClick={onClick}>
                {icon}
                <li>{value}</li>
              </div>
            </Link>
          );
        })}

      <button
        type="button"
        className="md:whitespane-none whitespace-nowrap flex items-center gap-2 md:py-3 py-1 cursor-pointer md:text-base text-sm"
        onClick={handleLogout}
      >
        <LoginCurve size="18" color="#1242E0" variant="TwoTone" />
        <li>خروج</li>
      </button>
    </ul>
  );
};

export default Sidebar;
