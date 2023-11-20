export interface SavedSearchesType {
  data: {
    brands: string;
    city: string;
    max_price: number | null;
    min_price: number | null;
    models: string;
    notification_type: string;
    user_name: string;
  } | null;
  loading: boolean;
  error: boolean;
}

export interface CitiesType {
  cities: {
    value: string;
    label: string;
  }[];
}
