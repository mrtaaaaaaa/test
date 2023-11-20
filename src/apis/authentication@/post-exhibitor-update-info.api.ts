import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

interface PropTypes {
  phone: number | string;
  body: any;
}

export const postExhibitorUpdateInfoAPI = async ({body, phone}: PropTypes) => {
  console.log("phone",body);
  
  const res = await httpService
    .post(`${AUTH_URL}/Auth/${phone}/Exhibitor/Update`, body)
    .then((res) => res);
  return res;
};
