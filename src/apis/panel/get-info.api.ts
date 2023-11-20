import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

interface PropTypes {
  endPoint: string;
}

export const GetInfoAPI = async (endPoint: PropTypes) => {
  const response = await httpService.post(
    `${FRONT2DB}/AdSale/Get/User/${endPoint}`
  );
  return response.data;
};
