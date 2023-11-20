import { img } from "@/data";
import SearchCard from "./search/search-card";


const HomeBanner = ({ brandModelTypes }: any) => {
  return (
    <div className="max-w-[1360px] w-full mx-auto p-4">
      <div
        className="mx-auto lg:p-10 p-5 flex items-center md:justify-end justify-center rounded-3xl"
        style={{
          background: `url(${img.home_page_banner.src}) no-repeat center top`,
          backgroundSize: "cover",
        }}
      >
        <SearchCard brandModelTypes={brandModelTypes} />
      </div>
    </div>
  );
};

export default HomeBanner;
