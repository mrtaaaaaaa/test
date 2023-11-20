import { icons } from "@/data";

const CardOrderPanel = ({ order, badge }:any) => {
  return (
    <div className="custom-shadow rounded-lg flex flex-col items-center relative">
      <div className="badge bg-blue text-white w-fit rounded-full px-2  tracking-tighter font-thin absolute -top-3">
        {badge}
      </div>
      <div className="bg-gray-900 w-full rounded-t-lg flex justify-center py-8">
        <img src={icons.logo_blue.src} alt="logo" />
      </div>
      <div className="flex flex-col gap-2 items-center mt-3 p-4">
        {order.model && (
          <span className="block text-blue  font-bold text-lg">
            {order.model}
          </span>
        )}

        {order.ad_sale_model && (
          <span className="block text-blue  font-bold text-lg">
            {order.ad_sale_model}
          </span>
        )}

        {order.first_name && (
          <span className="block">
            {order.first_name} {order.last_name}
          </span>
        )}

        {order.contact_phone_number && (
          <span className="block text-gray-500">
            ({order.contact_phone_number})
          </span>
        )}

        {order.user_name && (
          <span className="block text-gray-500">({order.user_name})</span>
        )}

        {order.budget && (
          <div>
            <span>بودجه: </span>
            <span className="text-blue ">
              <span className="font-bold">{order.budget}</span>
            </span>
          </div>
        )}

        {order.ad_sale_announced_price && (
          <div>
            <span>قیمت: </span>
            <span className="text-blue ">
              <span className="font-bold">{order.ad_sale_announced_price}</span> 
               <span className="text-sm font-light bolock mr-1">تومان</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardOrderPanel;
