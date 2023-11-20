import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";
import { toast } from "react-toastify";

export const GetVehicleCheckAPI = async (endPoint: string) => {
  const response = await httpService.get(
    `${FRONT2DB}/VehicleCheck/Get/User/${endPoint}`
  );
  return response.data;
};
