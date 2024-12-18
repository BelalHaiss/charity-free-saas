import { useGlobalState } from "@render/composables/use-global-state";
import { i18nConfig } from "@render/config/i18n";
import type {
  ApiPaginationQueryParams,
  ApiQueryParams,
} from "@shared/types/util.types";
import axios, { AxiosRequestConfig } from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1",
});
const { getters } = useGlobalState();
axiosInstance.interceptors.request.use(
  (config) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(getters.getBranchId(), "axios interceptor ");
    config.headers["Time-Zone"] = timezone;
    config.headers["Branch-ID"] = getters.getBranchId();
    config.headers["Accept-Language"] = i18nConfig.global.locale.value;
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error); // Allow the error to propagate
  },
);

import qs from "qs";

export type FetcherArgs = {
  url: string;
  config?: AxiosRequestConfig;
};
export const fetcher = async <T = unknown>({
  url,
  config,
}: FetcherArgs): Promise<T> => {
  const res = await axiosInstance<T>(url, config);
  return res.data;
};

export const queryStringify = (
  query: ApiQueryParams<object> | ApiPaginationQueryParams<object>,
): string => {
  const queryWithPreservedEmptyObject = {
    ...query,
    filter:
      Object.keys(query.filter).length === 0
        ? { dummy: 0 }
        : { ...query.filter },
  };

  const queryString = qs.stringify(queryWithPreservedEmptyObject);
  return queryString;
};
