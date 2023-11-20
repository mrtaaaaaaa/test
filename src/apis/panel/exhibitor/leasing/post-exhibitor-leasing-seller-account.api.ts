import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

export const postExhibitorLeasingSellerAccount = async (postData: any) => {
  const data = await httpService
    .post(`${FRONT2MESSAGE}/Exhibitor/Leasing/CarOwnerInfo`, postData)
    .then((res) => {
      return res.data;
    });

  return data;
};
