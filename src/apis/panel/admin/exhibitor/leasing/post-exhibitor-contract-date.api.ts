import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

export function PostExhibitorLeasingContract(formData: any): Promise<any> {
  return httpService
    .post(`${FRONT2MESSAGE}/Exhibitor/Leasing/Contract/Date`, formData)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}
