import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

interface PropTypes {
  data: any;
}

export function PostExhibitorLeasingUpdate(postData: PropTypes): Promise<any> {
  return httpService
    .post(`${FRONT2MESSAGE}/Exhibitor/Leasing/Update`, postData)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}
