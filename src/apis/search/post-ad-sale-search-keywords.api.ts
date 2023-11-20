import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export const PostAdSaleSearchKeywords = async (value: any): Promise<any> => {
  try {
    const res = await httpService.get(`${FRONT2DB}/AdSale/Search/Keywords/${value}`);
    return res.data.ads;
  } catch (error) {
    return await Promise.reject(error);
  }
}