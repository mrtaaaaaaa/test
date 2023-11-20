import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

export const postExhibitorRequestLoginAPI = async (body: any) => {
  const res = await httpService
    .post(`${AUTH_URL}/Auth/Exhibitor/RequestLogin`, body)
    .then((res) => res);
  return res;
};
