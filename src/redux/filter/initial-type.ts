export interface InitialType {
  shownCars: any[];
  type: any[];
  brand: any[];
  model: any[];
  min_price: number;
  max_price: number;
  min_Mileage: number;
  max_Mileage: number;
  colors: string[];
  carDamage: any[];
  gear_box_types: any[];
  fuel_types: any[];
  min_year_of_manufacture: number;
  max_year_of_manufacture: number;
  previewData: any[];
  showNull: boolean;
  showNullButton: boolean;
  byDefault: boolean;
  with_image: boolean;
  insurances: {
    [name: string]: boolean;
  };
  mapData: {
    longitude: number;
    latitude: number;
  };
  distance: number;
  sort: string;
  ascending: boolean;
}
