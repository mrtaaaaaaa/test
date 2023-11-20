import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

type PostDataType = {
  page_number: number;
  page_size: number;
};

export function PostExhibitorLeasingAll(postData: PostDataType): Promise<any> {
  return httpService
    .post(`${FRONT2DB}/Exhibitor/Leasing/All`, postData)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error));
}
