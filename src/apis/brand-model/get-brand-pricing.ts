import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export default function GetBrandPricing() {
  const pageData = {
    page_number: 1,
    page_size: 50,
  };
  const requestConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    cache: {
      maxAge: 0,
      noStore: true,
    },
  };
  return httpService
    .post(`${FRONT2DB}/Price/Get/all`, pageData, requestConfig)
    .then((res) => res.data)
    .catch(() => console.log("somthing went wrong!"));
}
