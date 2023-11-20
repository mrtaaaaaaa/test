import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export const GetPublishedListAPI = async () => {
  const requestConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    cache: {
      maxAge: 0,
      noStore: true,
    },
  };

  const response = await httpService.get(
    `${FRONT2DB}/AdSale/Get/Published`,
    requestConfig
  );
  return response.data;
};
