import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

interface PropTypes {
  endPoint: string;
  data?: any;
  method?: "get" | "post";
}

export default async function GetStaticDatasAPI({
  method = "get",
  endPoint,
  data,
}: PropTypes) {

  const requestConfig = {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    cache: {
      maxAge: 0,
      noStore: true,
    },
  };

  try {
    const response = await httpService[method](
      `${FRONT2DB}${endPoint}`,
      method === "post" ? data : {},
      requestConfig
    );
    
    return response.data;
  } catch (error) {
    console.log("Something went wrong!");
    return Promise.reject(error);
  }
}
