import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

interface BodyType {
  page_number: number;
  page_size: number;
}

export const GetAllPricesAPI = (data: BodyType) => {
  return httpService.post(`${FRONT2DB}/Price/Get/all`, data).then((res) => {
    return res.data;
  });
};
