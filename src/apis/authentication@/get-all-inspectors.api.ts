import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";
import { toast } from "react-toastify";

export const GetAllInspectorsAPI = () => {
  return httpService
    .get(`${AUTH_URL}/Auth/Users/Inspectors`)
    .then((res) => res)
    .catch(() => {
      toast.error("دریافت لیست با خطا مواجه شد!");
    });
};
