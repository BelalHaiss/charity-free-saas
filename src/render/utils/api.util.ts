import type {
  ApiPaginationQueryParams,
  ApiQueryParams,
} from "@shared/types/util.types";
import axios, { AxiosRequestConfig } from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/v1/",
});

import qs from "qs";
export type ApiPaths =
  | "beneficiary"
  | "setup"
  | "unit"
  | "transaction"
  | "donate"
  | "note"
  | "benefit"
  | "category";

export type FetcherArgs = {
  url: ApiPaths | `${ApiPaths}/${string}`;
  config?: AxiosRequestConfig;
};
export const fetcher = async <T extends object = never>({
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
