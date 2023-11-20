import { FRONT2DB } from "@/config/url";
import httpService from "@/services/http-service";

interface PropTypes {
  brands: string;
  models: string;
  types: string;
  min_price: number;
  max_price: number;
  min_Mileage: number;
  max_Mileage: number;
  colors: string;
  with_image: boolean;
  gear_box_types: string;
  fuel_types: string;
  min_year_of_manufacture: number;
  max_year_of_manufacture: number;
  car_damaged: string;
  body_insurance: boolean;
  third_party_insurance: boolean;
  car_accident_insurance: boolean;
  international_car_insurance: boolean;
  distance: number;
  long: number;
  lat: number;
  keywords?: string;
  engine_volume: number;
  engine_power: number;
  engine_torque: number;
  sort: string;
  ascending: boolean;
}

export const PostAdSaleSearch = async (postData: PropTypes | any): Promise<any> => {
  try {
    const res = await httpService.post(`${FRONT2DB}/AdSale/Search`, postData);
    return res.data.ads;
  } catch (error) {
    return await Promise.reject(error);
  }
}