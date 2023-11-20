import { AUTH_URL } from "@/config/url";
import httpService from "@/services/http-service";

interface FuncInputs {
  phone_number: number | string;
  postData: any;
}

export const postAuthPhoneNumberExhibitorUpdateCompletionAPI = async ({
  phone_number,
  postData,
}: FuncInputs) => {
  const data = await httpService
    .post(
      `${AUTH_URL}/Auth/${phone_number}/Exhibitor/Update/Completion`,
      postData
    )
    .then((res) => {
      return res.data;
    });

  return data;
};
