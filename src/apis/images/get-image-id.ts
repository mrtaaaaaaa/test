import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";
import { checkExistWindow } from "@/utils/check-exist-window";
import { ResponseType } from "axios";

export const GetImageId = async (image_id: string) => {

  const config = {
    responseType: "blob" as ResponseType,
  };

  try {
    const res = await httpService.get(`${FRONT2DB}/Images/Id/${image_id}`, config);
    return checkExistWindow() && window.URL.createObjectURL(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}
