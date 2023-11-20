import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

export const postAuthLoginRequest = async (number: any) => {
  let formData = new FormData();
  formData.append("phone_number", number);
  const data = await httpService
    .post(`${AUTH_URL}/Auth/Login/Request`, formData)
    .then((res) => {
      return res;
    });

  return data;
};
