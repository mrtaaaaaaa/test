import httpService from "@/services/http-service";
import { AUTH_URL } from "@/config/url";

export const idGenerator = () => {
  if (typeof window != undefined) {
    httpService.get(`${AUTH_URL}/Auth/Guuid/Get`).then((res) => {
      return window.localStorage.setItem("id", res.data.guuid);
    });
  }
};
