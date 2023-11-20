import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export const GetCarsListAPi = async (endPoint: string) => {

  const requestConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    cache: {
      maxAge: 0,
      noStore: true,
    },
  };

  const response = await httpService.get(`${FRONT2DB}/AdSale/Get/Published/${endPoint}`, requestConfig);
  return response.data;
};