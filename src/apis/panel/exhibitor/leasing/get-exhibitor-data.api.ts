import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export function GetExhibitorData(id: string | number): Promise<any> {
  return httpService
    .get(`${FRONT2DB}/Exhibitor/Leasing/Id/${id}`)
    .then((res) => res.data.exhibitorLeasings)
    .catch((error) => Promise.reject(error));
}
