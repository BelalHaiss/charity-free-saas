import { ref, computed, Ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import {
  ApiPaginationQueryParams,
  ApiPaginationQueryResponse,
  Identifiable,
  SortValue,
} from "@shared/types/util.types";
import { API_QUERY_STRING, queryStringify } from "@render/utils/api.util";
import { useToast } from "@render/composables/use-toast";
import {
  DataTableFilterEvent,
  DataTablePageEvent,
  DataTableSortEvent,
} from "primevue/datatable";
import { removeFields } from "@shared/services/object.util";

// Define TableRow with Generics for Data Shape
export type TableRow<T> = T & {
  meta: {
    id: number;
    rowType: "view" | "new" | "edit" | "delete";
  };
};

// Define Payload for Batch Operations
export interface Payload<T> {
  new: T[];
  edited: T[];
  deleted: number[];
}

// Define the Input Object for the Composable
export interface UseDynamicTableOptions<
  T extends object,
  TQuery extends ApiPaginationQueryParams,
> {
  queryFn: (params: API_QUERY_STRING) => Promise<ApiPaginationQueryResponse<T>>;
  getDefaultValues: () => T;
  saveFn: (payload: Payload<T>) => Promise<void>;
  initialQuery?: TQuery;
}

export function useDynamicTable<
  T extends Identifiable,
  TQuery extends ApiPaginationQueryParams,
>({
  queryFn,
  getDefaultValues,
  saveFn,

  initialQuery = {
    pagination: { page: 0, pageSize: 10 },
    filter: {},
  } as TQuery,
}: UseDynamicTableOptions<T, TQuery>) {
  const tableData = ref<TableRow<T>[]>([]);
  const totalRecords = ref(0);
  const { failedToast } = useToast();
  const newRowsIds = ref<Set<number>>(new Set());
  const editedRowsIds = ref<Set<number>>(new Set());
  const deletedIds = ref<Set<number>>(new Set());

  // Reactive query parameters
  const queryParams = ref(initialQuery) as Ref<TQuery>;
  const qs = computed(() => queryStringify(queryParams.value));
  // Query for fetching table data
  const { error, isLoading, data, refetch } = useQuery({
    queryKey: ["tableData", qs],
    queryFn: () => queryFn(qs.value),
  });

  watch(data, (newData) => {
    if (!newData) return;
    tableData.value = newData.data.map((item) => ({
      ...item,
      meta: {
        id: item.id, // Ensure item has an `id` property
        rowType: "view",
      },
    }));
    totalRecords.value = newData.totalRecords;
  });

  watch(error, (newError) => {
    if (!newError) return;
    failedToast(newError);
  });

  // Event handlers for PrimeVue DataTable
  const onFilter = (e: DataTableFilterEvent) => {
    queryParams.value.filter = e.filters;
  };

  const onPaginate = (event: DataTablePageEvent) => {
    queryParams.value.pagination.page = event.page;
    queryParams.value.pagination.pageSize = event.rows;
  };

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

  // Row manipulation methods
  const onAddRow = () => {
    const newRow: TableRow<T> = {
      ...getDefaultValues(),
      meta: {
        id: Date.now(),
        rowType: "new",
      },
    };

    newRowsIds.value.add(newRow.meta.id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    tableData.value.push(newRow);
  };

  const onEditRow = (id: number) => {
    const rowIndex = tableData.value.findIndex((row) => row.meta.id === id);
    if (rowIndex !== -1) {
      tableData.value[rowIndex].meta.rowType = "edit";
      editedRowsIds.value.add(tableData.value[rowIndex].meta.id);
    }
  };

  const onDeleteRow = (id: number) => {
    const rowIndex = tableData.value.findIndex((row) => row.meta.id === id);
    if (rowIndex !== -1) {
      const row = tableData.value[rowIndex];
      if (row.meta.rowType === "new") {
        newRowsIds.value.delete(row.meta.id);
        tableData.value.splice(rowIndex, 1);
      } else {
        deletedIds.value.add(id);

        row.meta.rowType = "delete";
        // tableData.value[rowIndex].meta = {
        //   ...row.meta,
        //   rowType: 'delete'
        // };
      }
    }
  };

  const onCancel = (id: number) => {
    const rowIndex = tableData.value.findIndex((row) => row.meta.id === id);
    if (rowIndex !== -1) {
      const row = tableData.value[rowIndex];
      if (row.meta.rowType === "edit") {
        const defaultRowData = data.value?.data.find((item) => item.id === id);
        if (!defaultRowData) {
          console.error("defaultRowData is undefined");
          return;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tableData.value[rowIndex] = {
          ...defaultRowData,
          meta: { rowType: "view", id: defaultRowData.id },
        };
        editedRowsIds.value.delete(id);
      }
    }
  };

  const cancelAll = () => {
    newRowsIds.value.clear();
    editedRowsIds.value.clear();
    deletedIds.value.clear();
    refetch();
  };

  const submitBatch = async () => {
    const newItemsWithMeta = tableData.value.filter(
      (item) => item.meta.rowType === "new",
    );
    const newItems = newItemsWithMeta.map((item) =>
      removeFields(item, ["meta", "id"]),
    );

    const editItemsWithMeta = tableData.value.filter(
      (item) => item.meta.rowType === "edit",
    );
    const editItems = editItemsWithMeta.map((item) =>
      removeFields(item, ["meta"]),
    );

    const payload: Payload<T> = {
      new: newItems as unknown as T[],
      edited: editItems as unknown as T[],
      deleted: [...deletedIds.value],
    };
    await saveFn(payload);

    cancelAll();
  };

  return {
    tableData: computed(() => tableData.value),
    totalRecords: computed(() => totalRecords.value),
    queryParams,
    onAddRow,
    onEditRow,
    onDeleteRow,
    onCancel,
    cancelAll,
    submitBatch,
    onFilter,
    onPaginate,
    onSort,
    filters: queryParams.value.filter,
    isLoading,
  };
}
