import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export function GetExhibitorLeasingUserName(
  username: string | number
): Promise<any> {
  return httpService
    .get(`${FRONT2DB}/Exhibitor/Leasing/UserName/${username}`)
    .then((res) => res.data.exhibitorLeasings)
    .catch((error) => Promise.reject(error));
}
