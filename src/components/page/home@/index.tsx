import ExhibitorSection from "./component/exhibitor-section";
import HomeBanner from "./component/home-banner";
import MostVisitedProductTab from "./component/most-visited-product-tab";
import OurBenefits from "./component/our-benefits";
import Services from "./component/services";

export default function Home({brandModelTypes}: any) {
  return (
    <div className="home-page mb-10">
      <HomeBanner brandModelTypes={brandModelTypes} />
      <Services />
      <MostVisitedProductTab />
      <OurBenefits />
      <ExhibitorSection />
    </div>
  );
}
