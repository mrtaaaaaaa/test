import { PostExhibitorLeasingChangeStatus } from "@/apis/panel/exhibitor";
import { toast } from "react-toastify";

export function getExhibitorAdminMenu(status: string, leasing: any) {
  const links = [];

  //  change Status
  const changeStatusHandler = (condition: string) => {
    const changeStatusData = new FormData();

    changeStatusData.append(
      "exhibitor_leasing_id",
      leasing.exhibitor_leasing_id
    );
    changeStatusData.append("reason", "");
    changeStatusData.append("condition", condition);

    PostExhibitorLeasingChangeStatus(changeStatusData)
      .then(() => {
        toast.success("اطلاعات با موفقیت تایید شد.");
      })
      .catch(() => {
        toast.error("متاسفانه خطایی رخ داده است.");
      });
  };

  switch (status) {
    case "در انتظار بررسی مدارک":
      let newLink9 = {
        link: `/panel/admin/exhibitor/leasing/check-document/${leasing.exhibitor_leasing_id}`,
        title: "بررسی مدارک",
      };
      links.push(newLink9);
      break;

    case "در انتظار اعلام حداکثر میزان ارائه تسهیلات":
      let newLink = {
        link: `/panel/admin/exhibitor/leasing/set-maximum-loan/${leasing.exhibitor_leasing_id}`,
        title: "اعلام حداکثر میزان ارائه تسهیلات",
      };
      links.push(newLink);
      break;

    case "در انتظار بررسی اطلاعات ضامنین":
      let newLink1 = {
        link: `/panel/admin/exhibitor/leasing/confirm-guarantors-docs/${leasing.exhibitor_leasing_id}`,
        title: "بررسی اطلاعات ضامنین",
      };
      links.push(newLink1);
      break;

    case "در انتظار اعزام کارشناس خودرو":
      let newLink2 = {
        link: `/panel/admin/exhibitor/leasing/check-vehiclecheck/${leasing.exhibitor_leasing_id}`,
        title: "مشاهده اطلاعات درخواست کارشناسی خودرو",
      };
      let newLink3 = {
        onClick: () => changeStatusHandler("در انتظار ثبت تاریخ قرارداد"),
        title: "تایید کارشناسی خودرو",
      };

      links.push(newLink2);
      links.push(newLink3);
      break;

    case "در انتظار ثبت تاریخ قرارداد":
      let newLink20 = {
        link: `/panel/admin/exhibitor/leasing/set-contract-date/${leasing.exhibitor_leasing_id}`,
        title: "ثبت تاریخ قرارداد",
      };

      links.push(newLink20);
      break;

    case "در حال بررسی تصاویر چک":
      let newLink5 = {
        link: `/panel/admin/exhibitor/leasing/check-exhibitorsChecks/${leasing.exhibitor_leasing_id}`,
        title: "مشاهده تصاویر چک",
      };

      links.push(newLink5);
      break;

    case "در انتظار امضای قرارداد":
      let newLink7 = {
        link: `/panel/admin/exhibitor/leasing/online-contract/${leasing.exhibitor_leasing_id}`,
        title: "بررسی قرارداد",
      };

      links.push(newLink7);
      break;

    case "در انتظار بستن پرونده":
      let newLink8 = {
        onClick: () => changeStatusHandler("پرونده بسته شده است"),
        title: "بستن پرونده",
      };

      links.push(newLink8);
      break;

    default:
      break;
  }

  return links;
}
