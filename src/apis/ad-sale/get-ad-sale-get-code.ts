import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export const GetAdsaleGetCode = async (code: number) => {
  try {
    const res = await httpService.get(`${FRONT2DB}/AdSale/Get/Code/${code}`);
    return res.data.ads;
  } catch (err) {
    return Promise.reject(err);
  }
}
