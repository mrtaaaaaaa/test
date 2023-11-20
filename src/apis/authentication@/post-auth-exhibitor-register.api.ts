import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

export const postAuthExhibitorRegisterAPI = async (postedData: any) => {

  const data = await httpService
    .post(`${AUTH_URL}/Auth/Exhibitor/Register`, postedData)
    .then((res) => {
      return res;
    });

  return data;
};
