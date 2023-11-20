export function getExhibitorMenu(status: string, leasing: any) {
  const links = [];

  switch (status) {
    case "تایید اعتبارسنجی اولیه":
      let newLink = {
        link: `/panel/exhibitor/leasing/upload-document`,
        title: "بارگذاری مدارک",
        query: { exhibitor_leasing_id: leasing.exhibitor_leasing_id },
      };

      links.push(newLink);
      break;
      
    case "رد مدارک و اطلاعات متقاضی":
      let newLink3 = {
        link: `/panel/exhibitor/leasing/update-info`,
        query: {
          exhibitor_leasing_id: leasing.exhibitor_leasing_id,
          reason: leasing.status.reason,
        },
        title: "اصلاح اطلاعات",
      };

      links.push(newLink3);
      break;

    case "در انتظار ثبت اطلاعات خودرو و میزان تسهیلات درخواستی":
      let newLink4 = {
        link: `/panel/exhibitor/leasing/requested-loan/${leasing.exhibitor_leasing_id}`,
        title: "ثبت اطلاعات خودرو و میزان تسهیلات درخواستی",
      };

      links.push(newLink4);
      break;
    //one
    case "در انتظار ثبت اطلاعات ضامنین":
      let newLink5 = {
        link:
          leasing.installment_info.facility_amount >= 300000000 &&
          leasing.installment_info.facility_amount < 600000000
            ? `/panel/exhibitor/leasing/customer-guarantors/choose/${leasing.exhibitor_leasing_id}`
            : `/panel/exhibitor/leasing/customer-guarantors/complete-form/${leasing.exhibitor_leasing_id}`,
        title: "ثبت اطلاعات ضامنین",
      };

      links.push(newLink5);
      break;

    case "رد اطلاعات ضامنین":
      let newLink13 = {
        link:
          leasing.installment_info.facility_amount >= 300000000 &&
          leasing.installment_info.facility_amount < 600000000
            ? `/panel/exhibitor/leasing/customer-guarantors/choose/${leasing.exhibitor_leasing_id}`
            : `/panel/exhibitor/leasing/customer-guarantors/complete-form/${leasing.exhibitor_leasing_id}`,
            query: {
              reason: leasing.status.reason,
            },
        title: "ویرایش اطلاعات ضامنین",
      };

      links.push(newLink13);
      break;

    case "در انتظار ثبت درخواست کارشناسی":
      let newLink6 = {
        link: `/panel/exhibitor/leasing/vehicle-check/${leasing.exhibitor_leasing_id}`,
        title: "ثبت درخواست کارشناسی خودرو",
      };

      links.push(newLink6);
      break;

    case "در انتظار بارگذاری تصاویر چک":
      let newLink7 = {
        link: `/panel/exhibitor/leasing/upload-check/${leasing.exhibitor_leasing_id}`,
        title: "بارگذاری تصاویر چک",
      };

      links.push(newLink7);
      break;

    case "رد تصاویر چک":
      let newLink8 = {
        link: `/panel/exhibitor/leasing/upload-check/${leasing.exhibitor_leasing_id}`,
        title: "بارگذاری تصاویر چک",
        query: {
          reason: leasing.status.reason,
        },
      };

      links.push(newLink8);
      break;

    case "در انتظار پرداخت کارمزد":
      let newLink9 = {
        link: `/panel/exhibitor/leasing/determine-cost/${leasing.exhibitor_leasing_id}`,
        title: "پرداخت کارمزد",
      };

      links.push(newLink9);
      break;

    case "رد قرارداد":
      let newLink11 = {
        link: `/panel/exhibitor/leasing/customer-online-contract/${leasing.exhibitor_leasing_id}`,
        title: "ارسال قرارداد آنلاین",
      };

      links.push(newLink11);
      break;

    case "در انتظار تعیین اطلاعات فروشنده":
      let newLink12 = {
        link: `/panel/exhibitor/leasing/seller-account-number/${leasing.exhibitor_leasing_id}`,
        title: "تعیین اطلاعات فروشنده  ",
      };

      links.push(newLink12);
      break;

    case "در انتظار ارسال قرارداد":
      let newLink20 = {
        link: `/panel/exhibitor/leasing/customer-online-contract/${leasing.exhibitor_leasing_id}`,
        title: "ارسال قرارداد",
      };

      links.push(newLink20);
      break;

    default:
      break;
  }

  return links;
}
