import { checkExistWindow } from "@/utils/check-exist-window";
import { parseJwt } from "@/utils/jwt";
import Link from "next/link";

export default function DropDownProfile() {
  let userInfo =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("userInfo") ?? "{}");

  const userToken =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("userToken") ?? "{}");

  const { roles } = userToken
    ? parseJwt(
        checkExistWindow() &&
          JSON.parse(window.localStorage.getItem("userToken") ?? "{}")
      )
    : { roles: [] };

  return (
    <div className="tablet:flex pl-4 hidden gap-4">
      <span className="h-[25px] bg-[#E3ECFF] block w-[1px]"></span>
      <Link
        href={`/panel/${roles?.[0]}/info`}
        className="flex flex-col justify-center items-center gap-1"
      >
        {/* <span className="block bg-white rounded-full w-8 h-8"></span> */}
        <span className="text-xs text-blue-text">
          {userInfo?.first_name !== undefined &&
          userInfo?.first_name?.trim() !== ""
            ? userInfo.first_name.trim()
            : "پنل کاربری"}
        </span>
      </Link>
    </div>
  );
}
