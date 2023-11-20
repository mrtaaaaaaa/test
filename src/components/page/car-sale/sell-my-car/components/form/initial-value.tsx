import { staticData } from "@/data";

interface StaticData {
  [name: string]: any;
}

// @@@___________________ Formik initial Values ___________________@@@
export let carSaleInitialValues: StaticData = {};

(() => {
  staticData.car_sale_items.forEach(({ name }: { name: string }) => {
    carSaleInitialValues[name] = "";
  });
})();