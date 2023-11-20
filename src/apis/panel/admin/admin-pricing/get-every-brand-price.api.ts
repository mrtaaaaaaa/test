import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";
import { useQuery } from "react-query";

interface PropTypes {
  page_number: number | string;
  page_size: number | string;
}

export const GetBrandsPricingAPI = async ({
  page_number,
  page_size,
}: PropTypes) => {
  let pagedata = { page_number: page_number, page_size: page_size };
  const data = await httpService
    .post(`${FRONT2DB}/Price/Get/all`, pagedata)
    .then((res) => {
      return res.data;
    });
  return data;
};
