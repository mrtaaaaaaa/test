import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

export const postAuthChangePassword = async (postData: any) => {
  const data = await httpService
    .post(`${AUTH_URL}/Auth/ChangePassword`, postData)
    .then((res) => {
      return res;
    });

  return data;
};
