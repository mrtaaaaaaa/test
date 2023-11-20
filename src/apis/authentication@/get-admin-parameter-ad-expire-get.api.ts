import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

export function GetAdminParameterAdExpireGet(): Promise<any> {
  return httpService
    .get(`${AUTH_URL}/Admin/Parameter/Ad/Expire/Get`)
    .then((res) => res.data)
    .catch((error) => console.log(error));
}
