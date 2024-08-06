import { FetcherArgs } from "@render/utils/api.util";
import {
  QueryFunction,
  UndefinedInitialQueryOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/vue-query";

type QueryOptions<T> = Parameters<typeof useQuery<T>>[0];
type TypedQueryArg<T extends object> = {
  queryKey: [FetcherArgs["url"], object?];
  queryFn: () => Promise<T>;
} & QueryOptions<T>;

const a: TypedQueryArg<{ a: number }> = {
  queryFn: () => new Promise((res) => res({ a: 1 })),
  queryKey: ["beneficiary"],
};
export const useQueryTyped = <T extends object>({
  queryKey,
  queryFn,
}: TypedQueryArg<T>) => {
  return useQuery({ queryKey, queryFn });
};
