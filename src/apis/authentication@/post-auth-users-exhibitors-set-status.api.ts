import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

export const postAuthUsersExhibitorsSetStatus = async (postData: any) => {
  const data = await httpService
    .post(`${AUTH_URL}/Auth/Users/Exhibitors/SetStatus`, postData)
    .then((res) => {
      return res.data;
    });

  return data;
};
