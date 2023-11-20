import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

export function PostMaxFacility(postData: any): Promise<any> {
  return httpService.post(
    `${FRONT2MESSAGE}/Exhibitor/Leasing/MaxFacility`,
    postData
  );
}
