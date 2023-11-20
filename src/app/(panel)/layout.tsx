"use client";
import { PageProvider } from "@/template";
import React, { ReactNode, useEffect } from "react";
import { SidebarPanel } from "./layouts/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { checkExistWindow } from "@/utils/check-exist-window";

interface LayoutType {
  children: ReactNode;
}

const Layout = ({ children }: LayoutType) => {
  const path = usePathname();

  const router = useRouter();
  useEffect(() => {
    const user =
      checkExistWindow() &&
      JSON.parse(window.localStorage.getItem("userInfo") ?? "{}");
    if (!Object.hasOwn(user, "roles")) {
      router.push("/auth/check");
    }
  }, []);
  return (
    <PageProvider>
      <div className="grid xl:grid-cols-12 lg:grid-cols-4 tablet:grid-cols-6 grid-cols-1 tablet:gap-4 gap-0">
        <div className="tablet:block xl:col-span-3 lg:col-span-1 tablet:col-span-2 tablet:px-4 rounded-lg md:h-fit tablet:h-[52rem]  tablet:sticky  tablet:top-32">
          <SidebarPanel />
        </div>
        <section className="xl:col-span-9 lg:col-span-3 col-span-4 tablet:mt-0 mt-4">
          {children}
        </section>
      </div>
    </PageProvider>
  );
};

export default Layout;
