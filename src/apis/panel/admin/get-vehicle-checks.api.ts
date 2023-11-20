import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";
import { toast } from "react-toastify";

export const GetVehicleCheckListsAPI = () => {
  return httpService
    .get(`${FRONT2DB}/VehicleCheck/Get/All`)
    .then((res) => res.data)
    .catch(() => {
      toast.error("دریافت لیست با خطا مواجه شد!");
    });
};
