import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

export const postUserRole = async (postData: any) => {
  const data = await httpService
    .post(`${AUTH_URL}/Auth/User/Role/Set`, postData)
    .then((res) => {
      return res.data;
    });

  return data;
};
