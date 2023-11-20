import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

interface ResponseData {
  data: any;
  [name: string]: any;
}
export const GetPriceGetAllAPI = async () => {
  let pagedata = { page_number: 1, page_size: 1071 };
  const data = await httpService
    .post(`${FRONT2DB}/Price/Get/all`, pagedata)
    .then((res: ResponseData) => {
      return res.data;
    });

  return data;
};
