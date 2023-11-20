import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";
import { toast } from "react-toastify";

export const GetLikedAdsAPI = async () => {
  try {
    const response = await httpService.get(`${FRONT2DB}/AdSale/Get/Likes`);
    return response.data;
  } catch (error) {
    toast.error("دریافت لیست آگهی های پسندیده شده با خطا مواجه شد.");
    throw error;
  }
};
