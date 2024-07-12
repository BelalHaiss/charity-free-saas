import { FetcherArgs } from "@render/utils/api.util";
import { QueryFunction, useQuery } from "@tanstack/vue-query";

type TypedQueryArg<T extends object> = {
  queryKey: [FetcherArgs["url"], object?];
  queryFn: QueryFunction<T>;
};
export const useQueryTyped = <T extends object>({
  queryKey,
  queryFn,
}: TypedQueryArg<T>) => {
  return useQuery({ queryKey, queryFn });
};
