import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

interface PropTypes {
  data: any;
}

export function PostExhibitorLeasing(postData: PropTypes): Promise<any> {
  return httpService
    .post(`${FRONT2MESSAGE}/Exhibitor/Leasing`, postData)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}
