import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

export function PostExhibitorLeasingVehicle(postData: any): Promise<any> {
  return httpService
    .post(`${FRONT2MESSAGE}/Exhibitor/Leasing/Vehicle`, postData)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}
