import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

export async function GetFilterGet() {
  try {
    let res = await httpService.get(`${FRONT2DB}/Filter/Get`);
    return res.data;
  } catch (err) {}
}
