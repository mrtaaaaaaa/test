import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

interface PropTypes {
  endPoint: string;
  method?: string;
  data?: any;
}

export default function GetStaticDatasNotSSRAPI({
  method = "get",
  endPoint,
  data = {},
}: PropTypes) {
  //@ts-ignore
  return httpService[method.toLowerCase()](`${FRONT2DB}${endPoint}`, data)
    .then((res: { data: any[] }) => res.data)
    .catch((err: any) => console.log(err));
}
