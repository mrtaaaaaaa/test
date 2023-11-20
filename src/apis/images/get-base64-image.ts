import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export const GetBase64ImageIdAPI = async (image_id: string) => {
  try {
    let res = await httpService.get(`${FRONT2DB}/File/Id/${image_id}`);
    return res.data;
  } catch (err) {
    return Promise.reject(err);
  }
}