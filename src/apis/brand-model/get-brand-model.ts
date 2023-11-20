import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

interface PropTypes {
  isSSr: boolean;
}

export default async function GetBrandModel(isSsr: PropTypes) {
  const pageData = {
    page_number: 1,
    page_size: 700,
  };
  const requestConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    cache: {
      maxAge: 0,
      noStore: isSsr,
    },
  };
  let data = await httpService.post(
    `${FRONT2DB}/BrandModelType/Get/All`,
    pageData,
    requestConfig
  );
  return data.data;
}
