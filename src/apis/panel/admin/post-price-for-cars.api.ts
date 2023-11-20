import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

interface BodyType {
  model: string;
  brand: string;
  price: number;
  type: string;
  vc_price: number;
}

export const PostPriceForCarsAPI = (data: BodyType) => {
  return httpService.post(`${FRONT2MESSAGE}/Price/Set`, data).then((res) => {
    return res.data;
  });
};
