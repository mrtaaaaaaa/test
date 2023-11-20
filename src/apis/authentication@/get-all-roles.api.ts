import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

export const GetAllRolesAPI = async () => {
  const data = await httpService
    .get(`${AUTH_URL}/Auth/Roles/Get`)
    .then((res) => {
      return res.data;
    });

  return data;
};
