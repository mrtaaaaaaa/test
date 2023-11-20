import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

export const postExpireDateForAd = async (body: any) => {
  const res = await httpService
    .post(`${AUTH_URL}/Admin/Parameter/Ad/Expire/Set`, body)
    .then((res) => res);
  return res;
};
