import NormalPurchase from "./components/normal";
import VipPurchase from "./components/vip";

const NormalVipPurchase = ({brandModel}:any) => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
      <VipPurchase brandModel={brandModel}/>
      <NormalPurchase />
    </div>
  );
};

export default NormalVipPurchase;
