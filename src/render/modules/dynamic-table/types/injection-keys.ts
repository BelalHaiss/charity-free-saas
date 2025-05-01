// injection-keys.ts
import { type Ref, type ComputedRef, ref } from "vue";
import type {
  ColumnFilter,
  ColumnFiltersState,
  Updater,
} from "@tanstack/vue-table";
import type { PageState } from "primevue/paginator";
import type { MutableTableRow } from "@render/types/table.types";
import { Identifiable } from "@shared/types/util.types";
import { PagingData } from "../useDynamicTable";

export interface TableDataContext<TData extends MutableTableRow<Identifiable>> {
  tableData: Ref<TData[]>;
  isLoading: Ref<boolean>;
  addNewItem(): TData;
}
export interface PaginationContext {
  onPaginate: (event: PageState) => void;
  pageData: ComputedRef<PagingData>;
}

export interface FilterContext {
  columnFilters: ComputedRef<ColumnFilter[]>;
  updateFilter: (updater: Updater<ColumnFiltersState>) => void;
}

export interface SyncRowUpdateContext<
  TData extends MutableTableRow<Identifiable>,
> {
  syncDeletedRow: (localId: number) => void;
  syncSavedRow: (updatedRow: TData) => void;
}

export const TABLE_DATA_SYMBOL = Symbol("TableData");
export const FILTER_COLUMN_SYMBOL = Symbol("ColumnFilters");
export const PAGINATION_SYMBOL = Symbol("Pagination");
export const SYNC_ROW_SYMBOL = Symbol("SyncRow");
