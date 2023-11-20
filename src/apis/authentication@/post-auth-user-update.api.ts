import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

export function PostAuthUserUpdate(postData: any): Promise<any> {
  return httpService
    .post(`${AUTH_URL}/Auth/User/Update`, postData)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}
