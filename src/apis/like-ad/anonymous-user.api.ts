import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

export const AnonymousUserLikeAdAPI = async (): Promise<any> => {
  try {
    const res = await httpService.get(`${AUTH_URL}/Auth/Anonymous`);
    return res.data;
  } catch (error) {
    return await Promise.reject(error);
  }
};
