import { ref, computed, Ref, watch, provide, inject } from "vue";
import { useQuery } from "@tanstack/vue-query";
import {
  ApiPaginationQueryParams,
  ApiPaginationQueryResponse,
  Identifiable,
  SortValue,
} from "@shared/types/util.types";
import { API_QUERY_STRING, queryStringify } from "@render/utils/api.util";
import { useToast } from "@render/composables/use-toast";
import { DataTableSortEvent } from "primevue/datatable";
import { ColumnFilter, ColumnFiltersState, Updater } from "@tanstack/vue-table";
import { PageState } from "primevue/paginator";
import { MutableTableRow } from "@render/types/table.types";
import {
  TableDataContext,
  TABLE_DATA_SYMBOL,
  FilterContext,
  FILTER_COLUMN_SYMBOL,
  PaginationContext,
  PAGINATION_SYMBOL,
  SyncRowUpdateContext,
  SYNC_ROW_SYMBOL,
} from "./types/injection-keys";
export interface PagingData {
  totalRecords: number;
  pageSize: number;
}

// Define the Input Object for the Composable
export interface UseDynamicTableOptions<
  T extends Identifiable,
  TQuery extends ApiPaginationQueryParams,
> {
  queryFn: (params: API_QUERY_STRING) => Promise<ApiPaginationQueryResponse<T>>;
  initialQuery?: TQuery;
  addNewItem(): MutableTableRow<T>;
}

export function useDynamicTable<
  T extends Identifiable,
  TQuery extends ApiPaginationQueryParams,
>({
  queryFn,
  addNewItem,
  initialQuery = {
    pagination: { page: 0, pageSize: 10 },
    filter: {},
  } as TQuery,
}: UseDynamicTableOptions<T, TQuery>) {
  const tableData = ref([]) as Ref<MutableTableRow<T>[]>;

  const totalRecords = ref(0);
  const { failedToast } = useToast();

  // Reactive query parameters
  const queryParams = ref(initialQuery) as Ref<TQuery>;

  const columnFilters = computed<ColumnFilter[]>(() =>
    Object.entries(queryParams.value.filter).map(([key, val]) => ({
      id: key,
      value: val,
    })),
  );
  const onPaginate = (event: PageState) => {
    queryParams.value.pagination.page = event.page;
    queryParams.value.pagination.pageSize = event.rows;
  };
  const pageData = computed<PagingData>(() => ({
    pageSize: queryParams.value.pagination.pageSize,
    totalRecords: totalRecords.value,
  }));
  const qs = computed(() => queryStringify(queryParams.value));
  // Query for fetching table data

  const { error, isLoading, data } = useQuery({
    queryKey: ["tableData", qs],
    queryFn: () => queryFn(qs.value),
  });

  provide<TableDataContext<MutableTableRow<T>>>(TABLE_DATA_SYMBOL, {
    tableData,
    isLoading,
    addNewItem,
  });

  provide<PaginationContext>(PAGINATION_SYMBOL, {
    onPaginate,
    pageData,
  });

  provide<FilterContext>(FILTER_COLUMN_SYMBOL, {
    columnFilters,
    updateFilter: (updater: Updater<ColumnFiltersState>) => {
      const newFilters =
        updater instanceof Function ? updater(columnFilters.value) : updater;

      queryParams.value.filter = Object.fromEntries(
        newFilters.map(({ id, value }) => [id, value]),
      );
    },
  }); // Default to empty array if not provided

  watch(data, (newData) => {
    if (!newData) return;
    tableData.value = newData.data.map((row) => ({
      ...row,
      localId: row.id,
    }));
    totalRecords.value = newData.totalRecords;
  });

  watch(error, (newError) => {
    if (!newError) return;
    failedToast(newError);
  });

  const onSort = (event: DataTableSortEvent) => {
    const isSorting = event.sortOrder;
    if (!isSorting || !event.sortField) {
      queryParams.value.sort = undefined;
      return;
    }

    const sortValue: SortValue = isSorting === 1 ? "asc" : "desc";
    queryParams.value.sort = {
      [event.sortField as string]: sortValue,
    };
  };

  const syncDeletedRow = (localId: number) => {
    tableData.value = tableData.value.filter(
      (item) => item.localId !== localId,
    );
  };

  const syncSavedRow = (updatedRow: MutableTableRow<T>) => {
    delete updatedRow.isNew;

    tableData.value = tableData.value.map((item) =>
      item.localId === updatedRow.localId ? updatedRow : item,
    );
  };

  provide<SyncRowUpdateContext<MutableTableRow<T>>>(SYNC_ROW_SYMBOL, {
    syncDeletedRow,
    syncSavedRow,
  });
  return {};
}

export function useDynamicTableContext<
  TData extends MutableTableRow<Identifiable>,
>() {
  const tableData = inject<TableDataContext<TData>>(TABLE_DATA_SYMBOL)!;
  const columnFilter = inject<FilterContext>(FILTER_COLUMN_SYMBOL)!;

  const pagination = inject<PaginationContext>(PAGINATION_SYMBOL)!;
  const syncRow = inject<SyncRowUpdateContext<TData>>(SYNC_ROW_SYMBOL)!;

  if (!tableData || !pagination || !columnFilter) {
    throw new Error(
      "useDynamicTableContext must be used within a table provider",
    );
  }

  return {
    ...tableData,
    ...pagination,
    ...columnFilter,
    ...syncRow,
  };
}
