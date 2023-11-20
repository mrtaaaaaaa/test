import {
  Calendar,
  DocumentText,
  Heart,
  KeySquare,
  Message,
  People,
  Profile,
  Save2,
  TableDocument,
} from "iconsax-react";
import { AiOutlineMenu } from "react-icons/ai";
import { parseJwt } from "./jwt";
import { checkExistWindow } from "./check-exist-window";

export function getPermissions() {
  const userToken =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("userToken") ?? "{}");

  const { roles } = userToken
    ? checkExistWindow() &&
      parseJwt(JSON.parse(window.localStorage.getItem("userToken") ?? "{}"))
    : { roles: [] };

  const menu = [
    // All users
    {
      value: "اطلاعات فردی",
      icon: <Profile size="18" color="#FFF" variant="TwoTone" />,
      href: `/panel/${roles[0]}/info`,
      permission: [
        "User",
        "SuperAdmin",
        "CallCenterExpert",
        "TechnicalCarBodyExpert",
        "SalesExpert",
        "Exhibitors",
        "OperationsDirector",
      ],
    },
    {
      value: "آگهی‌های من",
      icon: <TableDocument size="18" color="#FFF" variant="TwoTone" />,
      href: `/panel/${roles[0]}/ads`,
      permission: [
        "User",
        "SuperAdmin",
        "CallCenterExpert",
        "TechnicalCarBodyExpert",
        "SalesExpert",
        "Exhibitors",
        "OperationsDirector",
      ],
    },


    {
      value: "درخواست‌های خرید ویژه من",
      icon: <TableDocument size="18" color="#FFF" variant="TwoTone" />,
      href: `/panel/${roles[0]}/orders/vip`,
      permission: [
        "User",
        "SuperAdmin",
        "CallCenterExpert",
        "TechnicalCarBodyExpert",
        "SalesExpert",
        "Exhibitors",
        "OperationsDirector",
      ],
    },
    
    // {
    //   value: "آگهی‌های من",
    //   icon: <TableDocument size="18" color="#FFF" variant="TwoTone" />,
    //   href: "/panel/admin/ads",
    //   permission: ["OperationsDirector"],
    // },

    // SuperAdmin
    {
      value: "تغییر دسترسی کاربران",
      icon: <People size="18" color="#FFF" variant="TwoTone" />,
      href: "/panel/super-admin/change-role",
      permission: ["SuperAdmin"],
    },
    {
      value: "تعیین تاریخ انقضای آگهی‌ها",
      icon: <Calendar size="18" color="#FFF" variant="TwoTone" />,
      href: "/panel/super-admin/expiration-date",
      permission: ["SuperAdmin"],
    },

    // OperationsDirector
    {
      value: "درخواست‌های ثبت‌شده خرید عادی",
      icon: <DocumentText size="18" color="#FFF" variant="TwoTone" />,
      href: "/panel/admin/car-order/normal",
      permission: ["OperationsDirector"],
    },
    {
      value: "درخواست‌های ثبت‌شده خرید ویژه",
      icon: <DocumentText size="18" color="#FFF" variant="TwoTone" />,
      href: "/panel/admin/car-order/vip",
      permission: ["OperationsDirector"],
    },
    {
      value: "درخواست‌های ثبت‌شده فروش عادی",
      icon: <DocumentText size="18" color="#FFF" variant="TwoTone" />,
      href: "/panel/admin/car-sale/normal",
      permission: ["OperationsDirector"],
    },
    {
      value: "درخواست‌های ثبت‌شده کارشناسی",
      icon: <DocumentText size="18" color="#FFF" variant="TwoTone" />,
      href: "/panel/admin/vehicle-checks",
      permission: ["OperationsDirector"],
    },
    {
      value: "درخواست های خرید اقساطی",
      icon: <DocumentText size="18" color="#FFF" variant="TwoTone" />,
      href: "/panel/admin/exhibitor/leasing/customers-req",
      permission: ["OperationsDirector"],
    },
    {
      value: "قیمت‌گذاری",
      icon: <DocumentText size="18" color="#FFF" variant="TwoTone" />,
      href: "/panel/admin/car-pricing",
      permission: ["OperationsDirector"],
    },
    {
      value: "ارسال پیامک",
      icon: <Message size="18" color="#FFF" variant="TwoTone" />,
      href: "/panel/admin/message",
      permission: ["OperationsDirector"],
    },
    {
      value: "درخواست‌های نمایشگاه‌داران",
      icon: <Calendar size="18" color="#FFF" variant="TwoTone" />,
      href: "/panel/admin/exhibitor/requests",
      permission: ["OperationsDirector"],
    },

    // Exhibitors
    {
      value: "ثبت درخواست اقساطی",
      icon: <DocumentText size="18" color="#FFF" variant="TwoTone" />,
      href: "/panel/exhibitor/leasing/req-registeration",
      permission: ["Exhibitors"],
    },
    // {
    //   value: "مشاهده آگهی های خودرو",
    //   icon: <DocumentText size="18" color="#FFF" variant="TwoTone" />,
    //   href: "",
    //   permission: ["Exhibitors"],
    // },
    {
      value: "وضعیت پرونده متقاضیان",
      icon: <DocumentText size="18" color="#FFF" variant="TwoTone" />,
      href: "/panel/exhibitor/leasing/customers-req",
      permission: ["Exhibitors"],
    },
    // {
    //   value: "خودروهای خریداری شده",
    //   icon: <DocumentText size="18" color="#FFF" variant="TwoTone" />,
    //   href: "",
    //   permission: ["Exhibitors"],
    // },
    // {
    //   value: "گفتگوی آنلاین",
    //   icon: <Message size="18" color="#FFF" variant="TwoTone" />,
    //   href: "",
    //   permission: ["Exhibitors"],
    // },
    {
      value: "درخواست های من",
      icon: <DocumentText size="18" color="#FFF" variant="TwoTone" />,
      href: "/panel/exhibitor/my-requests",
      permission: ["Exhibitors"],
    },

    // User
    {
      value: "درخواست‌های کارشناسی خودرو",
      icon: <DocumentText size="18" color="#FFF" variant="TwoTone" />,
      href: `/panel/${roles[0]}/vehicle-check`,
      permission: [
        "User",
        "SuperAdmin",
        "CallCenterExpert",
        "TechnicalCarBodyExpert",
        "SalesExpert",
        "Exhibitors",
        "OperationsDirector",
      ],
    },

    // TechnicalCarBodyExpert
    {
      value: "درخواست‌های ثبت‌شده کارشناسی ",
      icon: <AiOutlineMenu />,
      href: "/panel/technical-car-body-expert/registered-vehicle-check",
      permission: ["TechnicalCarBodyExpert"],
    },

    // All users
    {
      value: "آگهی‌‌های پسندیده شده",
      icon: <Heart size="18" color="#FFF" variant="TwoTone" />,
      href: `/panel/${roles[0]}/likes`,
      permission: [
        "User",
        "SuperAdmin",
        "CallCenterExpert",
        "TechnicalCarBodyExpert",
        "SalesExpert",
        "Exhibitors",
        "OperationsDirector",
      ],
    },
    {
      value: "جست‌و‌جوی ذخیره شده",
      icon: <Save2 size="18" color="#FFF" variant="TwoTone" />,
      href: `/panel/${roles[0]}/recent-searches`,
      permission: [
        "User",
        "SuperAdmin",
        "CallCenterExpert",
        "TechnicalCarBodyExpert",
        "SalesExpert",
        "Exhibitors",
        "OperationsDirector",
      ],
    },
    {
      value: "تغییر گذرواژه",
      icon: <KeySquare size="18" color="#FFF" variant="TwoTone" />,
      href: `/panel/${roles[0]}/change-password`,
      permission: [
        "User",
        "SuperAdmin",
        "CallCenterExpert",
        "TechnicalCarBodyExpert",
        "SalesExpert",
        "Exhibitors",
        "OperationsDirector",
      ],
    },
  ];

  const filteredMenu = menu.filter((item) =>
    item.permission.some((role) => roles.includes(role))
  );

  return filteredMenu;
}
