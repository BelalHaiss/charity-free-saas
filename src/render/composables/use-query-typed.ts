import { FetcherArgs } from "@render/utils/api.util";
import { useQuery } from "@tanstack/vue-query";

type QueryOptions<T> = Parameters<typeof useQuery<T>>[0];
type TypedQueryArg<T> = {
  queryKey: [FetcherArgs["url"], unknown?];
  queryFn: () => Promise<T>;
} & QueryOptions<T>;

export const useQueryTyped = <T>({ queryKey, queryFn }: TypedQueryArg<T>) => {
  return useQuery({ queryKey, queryFn });
};
