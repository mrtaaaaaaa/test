import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export const GetColorListAPi = async () => {
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
    `${FRONT2DB}/Color/Get/All`,
    requestConfig
  );
  return response.data;
};
