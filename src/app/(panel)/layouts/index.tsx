import { ReactNode } from "react";
import { SidebarPanel } from "./sidebar";

interface LayoutType {
  children: ReactNode;
}

const PanelLayout = ({ children }: LayoutType) => {
  return (
    <>
      <div className="grid xl:grid-cols-12 lg:grid-cols-4 tablet:grid-cols-6 grid-cols-1 tablet:gap-4 gap-0">
        <div className="tablet:block xl:col-span-3 lg:col-span-1 tablet:col-span-2 tablet:px-4 rounded-lg md:h-fit tablet:h-[52rem]  tablet:sticky  tablet:top-32">
          <SidebarPanel />
        </div>
        <section className="xl:col-span-9 lg:col-span-3 col-span-4 tablet:mt-0 mt-4">
          {children}
        </section>
      </div>
    </>
  );
};

export default PanelLayout;
