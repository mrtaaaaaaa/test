import { authSelector } from "@/redux/auth/auth-Slice";
import { checkExistWindow } from "@/utils/check-exist-window";
import { getPermissions } from "@/utils/permisssions";
import { LoginCurve } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "src/hooks/redux-hooks";

export function SidebarPanel() {
  const router = useRouter();
  const LS: any = checkExistWindow() && window.localStorage;

  const {userInfo} = useAppSelector(authSelector);

  const handleLogout = () => {
    LS.removeItem("userToken");
    LS.removeItem("userInfo");
    router.push("/");
  };  

  const menus = getPermissions();

  return (
    <div className="w-full h-full md:gap-0 gap-5 md:border-b-0 bg-[#091642] py-6 px-4 flex flex-col sticky top-16">
      {/* <h3 className="font-bold text-white text-2xl mb-4"></h3> */}

      <ul className="xl:px-4 px-0 tablet:block gap-4 flex custom-scrollbar overflow-auto">
        {menus.map(({ value, icon, href, onClick }, index) => {
          let isActive = router.pathname === href;
          return (
            <Link
              key={index}
              href={href}
              className={`text-white text-sm ${
                isActive && "font-bold"
              } md:whitespane-none whitespace-nowrap flex items-center gap-2 md:py-3 py-1 cursor-pointer tablet:border-b md:border-[#212d56] font-light`}
              onClick={onClick}
            >
              {icon}
              <li>{value}</li>
            </Link>
          );
        })}

        <button
          type="button"
          className="md:whitespane-none whitespace-nowrap flex items-center gap-2 md:py-3 py-1 cursor-pointer md:text-base text-white font-light text-sm"
          onClick={handleLogout}
        >
          <LoginCurve size="18" color="#FFF" variant="TwoTone" />
          خروج
        </button>
      </ul>

      <div className="flex items-center gap-1 mt-auto pb-4">
        <div className=" bg-gray-200 rounded-full w-8 h-8"></div>
        <div className="flex items-center gap-4">
          <span className="text-white block">
            {userInfo?.first_name?.trim()} {userInfo?.last_name?.trim()}
          </span>
          <span className="block text-white text-xs font-light ">
            {userInfo?.phone_number}
          </span>
        </div>
      </div>
    </div>
  );
}
