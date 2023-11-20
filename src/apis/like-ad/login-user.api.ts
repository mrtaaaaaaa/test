import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export const LoginUserLikeAdAPI = async (): Promise<any> => {
  try {
    const res = await httpService.get(`${FRONT2DB}/AdSale/Get/Likes`);
    return res.data;
  } catch (error) {
    return await Promise.reject(error);
  }
};
