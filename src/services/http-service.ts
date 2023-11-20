import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { v4 as uuidv4 } from "uuid";
import { isTokenExpired } from '../utils';

const httpService: AxiosInstance = axios.create({});

httpService.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  let userToken: string = "";
  if (typeof window !== 'undefined') {
    userToken = localStorage.getItem("userToken") as string;
  }
  if (
    (
      config.url?.includes('/AdSale/Get/Likes') ||
      config.url?.includes('/Auth/Anonymous') ||
      config.url?.match(/\/AdSale\/Id\/[a-zA-Z0-9-]+\/Like/) ||
      config.url?.match(/\/AdSale\/Id\/[a-zA-Z0-9-]+\/UnLike/)
    ) &&
    isTokenExpired(userToken)
  ) {
    config.headers["User-Id"] =
      localStorage.getItem("userId") ||
      localStorage.getItem("tempId") ||
      localStorage.setItem("tempId", uuidv4());
  } else {
    if (userToken) {
      config.headers["Authorization"] = JSON.parse(userToken);
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

httpService.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpService;