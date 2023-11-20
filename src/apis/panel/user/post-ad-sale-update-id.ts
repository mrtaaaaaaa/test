import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

export const postAdSaleUpdateId = async (ad_id: string, formData: any) => {
  const data = await httpService
    .post(`${FRONT2MESSAGE}/AdSale/Update/Id/${ad_id}`, formData)
    .then((res) => {
      return res;
    });

  return data;
};
