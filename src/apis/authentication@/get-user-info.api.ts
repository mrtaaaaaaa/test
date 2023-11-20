import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";
import { toast } from "react-toastify";

export const GetUserInfoAPI = async (endPoint: string) => {
  const data = await httpService
    .get(`${AUTH_URL}/Auth/User/${endPoint}`)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      toast.error("دریافت اطلاعات با خطا مواجه شد.");
    });
  return data;
};
