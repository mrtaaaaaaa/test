import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

interface PropTypes {
  brands: string | any[];
  models: string | any[];
  min_price: number;
  max_price: number;
  city: string;
  notification_type: string;
  user_name: string;
}

export function PostFilterSave(postData: PropTypes): Promise<any> {
  return httpService
    .post(`${FRONT2MESSAGE}/Filter/Save`, postData)
    .then((res) => res.data.ads)
    .catch((error) => Promise.reject(error));
}
