import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

export function PostExhibitorLeasingDocuments(postData: any): Promise<any> {
  return httpService
    .post(`${FRONT2MESSAGE}/Exhibitor/Leasing/Documents`, postData)
    .then((res) => res)
    .catch((error) => Promise.reject(error));
}
