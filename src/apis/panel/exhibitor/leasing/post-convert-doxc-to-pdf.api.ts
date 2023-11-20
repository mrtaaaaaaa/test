import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";

export const postConvertDoxcToPdf = async (postData: any) => {
  const data = await httpService
    .post(`${FRONT2MESSAGE}/File/Word/Pdf`, postData, {
      headers: {
        "Content-Type": "application/pdf",
      },
      responseType: "arraybuffer",
    })
    .then((res) => {
      return res.data;
    });

  return data;
};
