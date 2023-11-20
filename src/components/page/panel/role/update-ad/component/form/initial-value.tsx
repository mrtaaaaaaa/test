import { staticData } from "@/data";

interface StaticData {
  [name: string]: any;
}

// @@@___________________ Formik initial Values ___________________@@@
export const UpdateAdSaleInitValue = (advertise: any) => {
  const UpdateAdSaleInitialValues: StaticData = {};

  staticData.car_sale_items.forEach(({ name }: { name: string }) => {
    name == "tire_health_percentage"
      ? advertise.tire_health_percentage == -1
        ? (UpdateAdSaleInitialValues[name] = "")
        : (UpdateAdSaleInitialValues[name] = advertise[name])
      : name == "year_of_manufacture"
      ? (UpdateAdSaleInitialValues[name] =
          advertise?.year_of_manufacture_display)
      :  (UpdateAdSaleInitialValues[name] = advertise[name]);
  });

  return UpdateAdSaleInitialValues;
};
