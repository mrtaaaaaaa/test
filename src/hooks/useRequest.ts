import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { FRONT2DB } from "@/config/url";

type Method = "GET" | "POST" | "GP";

type RequestOptions = {
  url: string;
  method: Method;
  data?: any;
  headers?: any;
  isFetch?: boolean;
  pagination?: {
    isPagination?: boolean;
    currentPage?: number;
  };
  onSuccess?: (data: any) => void;
  onError?: (data: any) => void;
};

export const useRequest = (options: RequestOptions) => {
  let isFetch = options.isFetch !== false;

  let userToken: string = "";
  if (typeof window !== "undefined") {
    userToken = JSON.parse(
      String(localStorage.getItem("userToken")) ?? "{}"
    ) as string;
  }

  const axHeader = {
    common: {
      Authorization: `${userToken}`,
    },
  };

  const axiosInstance = axios.create({
    baseURL: `/`,
    timeout: 1000,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      ...(userToken && axHeader),
    },
  });

  if (isFetch) {
    if (options.method === "GET") {
      const { data, isLoading, isError, error } = useQuery(
        options.url,
        async () => {
          const response = await axiosInstance.get(options.url, {
            headers: options.headers,
          });

          if (response.data.result === "OK") {
            if (options.onSuccess) {
              options.onSuccess(response.data);
            }
            return response.data;
          }
          throw new Error(response.data.error);
        },
        {
          refetchOnMount: false,
        }
      );

      return { data, isLoading, isError, error };
    }
    if (options.method === "GP") {
      const { data, isLoading, isError, error } = useQuery(
        options?.pagination?.isPagination
          ? [options.url, options.pagination.currentPage]
          : options.url,
        async (curPage) => {
          const response = await axiosInstance.post(
            options.url,
            {
              ...options.data,
              page_number: options.pagination?.isPagination
                ? curPage?.queryKey[1]
                : options.data?.page_number,
            },
            {
              headers: options.headers,
            }
          );
          if (response.data.result === "OK") {
            if (options.onSuccess) {
              options.onSuccess(response.data);
            }
            return response.data;
          }
          throw new Error(response.data.error);
        },
        {
          refetchOnMount: false,
        }
      );

      return { data, isLoading, isError, error };
    } else if (options.method === "POST") {
      const { data, mutate, isLoading, isError, error } = useMutation(
        async () => {
          const response = await axiosInstance.post(options.url, options.data, {
            headers: options.headers,
          });

          if (response.data.result === "OK") {
            return response.data;
          }
          throw new Error(response.data.error);
        },
        {
          onSuccess: (data) => {
            if (options.onSuccess) {
              options.onSuccess(data);
            }
          },
          onError: (error) => {
            if (options.onError) {
              options.onError(error);
            }
          },
        }
      );

      return { data, mutate, isLoading, isError, error };
    } else {
      throw new Error("Invalid method");
    }
  }
  return { data: null, error: null, isLoading: false, isError: false };
};

{
  /*
sample for post method

const requestOptions = {
  url: 'https://api.example.com/endpoint',
  method: 'POST',
  data: {
    name: '',
    email: '',
  },
};
*/
}

{
  /*
sample for get method

const { data, isLoading, isError, error } = useRequest({
  url: 'https://jsonplaceholder.typicode.com/posts/1',
  method: 'GET',
});

*/
}
