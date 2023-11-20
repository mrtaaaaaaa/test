import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

export const GetAllUsersAPI = async () => {
  const data = await httpService.get(`${AUTH_URL}/Auth/Users`).then((res) => {
    return res.data;
  });

  return data;
};
