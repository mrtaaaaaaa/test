import { getExhibitorMenu } from "@/utils/get-exhibitor-menu";
import Link from "next/link";

type TableRowProps = {
  leasing: any;
  index: number;
};

const TableRow = ({ leasing, index }: TableRowProps) => {
  const links = getExhibitorMenu(leasing.status.condition, leasing);

  return (
    <div className="tablet:col-span-5 tablet:grid tablet:grid-cols-12 flex flex-col gap-2 items-center p-3 tablet:border-b tablet:border-0 tablet:border-b-gray-150 border border-gray-150 tablet:rounded-none rounded-lg tablet:mt-0 mt-4">
      <div className="font-bold lg:block hidden tablet:w-fit w-full text-sm">
        {index} -
      </div>

      <div className="flex justify-between items-center tablet:justify-center w-full ">
        <span className="tablet:hidden block font-bold">کد پرونده</span>
        <span className="text-sm block text-center">
          {leasing?.exhibitor_leasing_code}
        </span>
      </div>

      <div className="flex justify-between items-center tablet:justify-center w-full col-span-2 tablet:border-r tablet:border-gray-150 tablet:pr-2 tablet:h-full">
        <span className="tablet:hidden block font-bold">
          نام و نام‌خانوادگی
        </span>
        <span className="text-sm">
          {leasing?.applicant_info?.name} {leasing?.applicant_info?.family}
        </span>
      </div>

      <div className="flex justify-between items-center tablet:justify-center w-full col-span-2 tablet:border-r tablet:border-gray-150 tablet:pr-2 tablet:h-full">
        <span className="tablet:hidden block font-bold">کد ملی</span>
        <span className="font-bold text-sm">
          {leasing?.applicant_info.national_code}
        </span>
      </div>

      <div className="flex justify-between items-center tablet:justify-center w-full col-span-2 tablet:border-r tablet:border-gray-150 tablet:pr-2 tablet:h-full">
        <span className="tablet:hidden block font-bold">شماره تماس</span>
        <span className="text-sm">{leasing?.applicant_info.mobile_number}</span>
      </div>

      <div className="flex justify-between items-center tablet:justify-center w-full col-span-2 tablet:border-r tablet:border-gray-150 tablet:pr-2 tablet:h-full">
        <span className="tablet:hidden block font-bold">وضعیت</span>
        <span className="text-xs text-orange block text-center">
          {leasing?.status.condition}
        </span>
      </div>

      <div className="flex flex-col items-end gap-2 lg:col-span-2 tablet:col-span-3 w-full tablet:border-r tablet:border-gray-150 tablet:pr-2">
        <Link
          href={`/panel/exhibitor/customer-folder/${leasing?.exhibitor_leasing_id}`}
          className="bg-white text-blue rounded-lg p-2 border border-blue text-center tablet:w-full w-fit"
          style={{ fontSize: "11px" }}
        >
          مشاهده پرونده
        </Link>

        {links.map(({ link, title, query }) => (
          <Link
            href={{pathname:link, query:query }}
            className="bg-blue text-white rounded-lg p-2 border border-blue text-center tablet:w-full w-fit"
            style={{ fontSize: "11px" }}
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TableRow;
