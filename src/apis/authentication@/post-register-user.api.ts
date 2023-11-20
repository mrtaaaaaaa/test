import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

interface BodyTypes {
  phone_number: number | string;
  password: number | string;
  verify_code: number | string;
  first_name: number | string;
  last_name: number | string;
}

export const postRegisterUserAPI = async (body: any) => {
  const res = await httpService
    .post(`${AUTH_URL}/Auth/Register`, body)
    .then((res) => res);
  return res;
};
