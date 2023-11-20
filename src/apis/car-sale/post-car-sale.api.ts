import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

export function PostCarSaleAPI(postData: any): Promise<any> {
  return httpService
    .post(`${FRONT2MESSAGE}/AdSale`, postData)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}
