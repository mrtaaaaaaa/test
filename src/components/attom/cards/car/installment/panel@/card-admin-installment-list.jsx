import moment from "jalali-moment";
import { useRouter } from "next/router";

export default function CardAdminInstallmentList({ data }) {
  return (
    <>
      <h1 className="font-bold text-lg mb-4">
        درخواست‌های ثبت‌شده خرید اقساطی
      </h1>

      <div className="tablet:grid lg:grid-cols-9 tablet:grid-cols-5 flex flex-col lg:gap-0 gap-4">
        <div
          className="col-span-9 tablet:grid lg:grid-cols-12 tablet:grid-cols-5 hidden text-blue font-bold items-center rounded-tr-md rounded-tl-md px-6 py-3"
          style={{ background: "rgba(37, 109, 133, 0.1)" }}
        >
          <div className="lg:block hidden text-sm ">#</div>
          <div className="text-sm text-center lg:col-span-3">
            نام و نام‌‌خانوادگی
          </div>
          <div className="text-sm text-center">تاریخ</div>
          <div className="text-sm text-center lg:col-span-3">مبلغ درخواستی</div>
          <div className="text-sm  col-span-2">وضعیت</div>
          <div></div>
        </div>
        {data.map((item, index) => (
          <TableItem index={++index} data={item} />
        ))}
      </div>
    </>
  );
}

const TableItem = ({ index, data }) => {
  const navigate = useRouter();
  const showUserInfoHadler = () => {
    navigate.push(`/admin/car-installment/detail`, {
      state: {
        user_name: `${data.name} ${data.family}`,
        phone_number: data.user.phone_number,
      },
    });
  };
  return (
    <div className="tablet:col-span-9 col-span-1 tablet:grid lg:grid-cols-12 tablet:grid-cols-5 tablet:gap-0 gap-2  flex flex-col items-center rounded-tr-tablet rounded-tl-tablet tablet:px-6 tablet:py-12 p-5 tablet:border-0 border border-grey-300 rounded-lg lg:border-b border-b-gray-300 lg:rounded-none">
      <div className="font-medium lg:block hidden tablet:w-fit w-full">
        {index}
      </div>
      <div class="tablet:hidden block  flex-col justify-between tablet:w-fit w-full ">
        <span className="tablet:hidden block font-bold mb-4">
          درخواست خرید اقساطی
        </span>
      </div>

      <div class="tablet:block flex justify-between w-full lg:col-span-3">
        <span className="tablet:hidden block font-bold text-sm">
          نام و نام‌خانوادگی
        </span>
        <div className="md:text-center lg:text-base">{`${data.name} ${data.family}`}</div>
      </div>

      <div class="tablet:block flex justify-between w-full">
        <span className="tablet:hidden block font-bold text-sm">تاریخ</span>
        <div className="text-sm font-medium md:text-center">
          {moment.unix(data.created_at).locale("fa").format("D MMMM YYYY")}
        </div>
      </div>

      <div class="tablet:block flex justify-between w-full lg:col-span-3">
        <span className="tablet:hidden block font-bold text-sm">
          مبلغ درخواستی
        </span>
        <div className="text-sm md:text-center flex gap-1 items-center justify-center">
          <span className="font-bold">{data.loan_amount}</span>
          <span className="text-xs whitespace-nowrap">میلیون تومان</span>
        </div>
      </div>

      <div class="tablet:block flex justify-between w-full items-center lg:col-span-2">
        <span className="tablet:hidden block font-bold text-sm">وضعیت</span>
        <div className="text-sm font-medium ">{data.status}</div>
      </div>

      <div
        class="flex justify-end w-full items-center lg:col-span-2"
        onClick={showUserInfoHadler}
      >
        <button className="bg-blue text-white px-6 py-2 w-full font-bold rounded-lg text-sm text-center">
          نمایش
        </button>
      </div>
    </div>
  );
};
