import { ref, computed, Ref, watch, provide } from "vue";
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
  const tableData = ref<MutableTableRow<T>[]>([]);

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
  provide("table-data", {
    tableData,
    isLoading,
    addNewItem,
  });

  provide("pagination", {
    onPaginate,
    pageData,
  });

  provide("tank-table-filter", {
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
    const index = tableData.value.findIndex(
      (row) => "localId" in row && row.localId == localId,
    );
    if (index === -1) return;

    // Only remove from local state
    tableData.value.splice(index, 1);
  };

  const syncSavedRow = (updatedRow: MutableTableRow<T>) => {
    delete updatedRow.isNew;
    const index = tableData.value.findIndex(
      (row) => "localId" in row && row.localId === updatedRow.localId,
    );
    Object.assign(tableData.value[index], updatedRow);
  };

  // Provide these methods for child components
  provide("table-sync-states", {
    syncDeletedRow,
    syncSavedRow,
  });

  return {};
}
