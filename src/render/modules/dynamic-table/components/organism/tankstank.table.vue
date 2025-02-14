<script setup generic="TData extends object" lang="ts">
import { defineProps, inject, ComputedRef, Ref } from "vue";
import {
  useVueTable,
  ColumnDef,
  getCoreRowModel,
  FlexRender,
  ColumnFilter,
  Updater,
  ColumnFiltersState,
} from "@tanstack/vue-table";
import Paginator, { PageState } from "primevue/paginator";
import { PagingData } from "../../useDynamicTable";

// Define Props

const props = defineProps<{
  columns: ColumnDef<TData>[];
}>();

// Define Emits

const { tableData, isLoading } = inject<{
  tableData: Ref<TData[]>;
  isLoading: Ref<[]>;
}>("table-data")!;
const { columnFilters, updateFilter } = inject<{
  columnFilters: ComputedRef<ColumnFilter[]>;
  updateFilter: (updater: Updater<ColumnFiltersState>) => void;
}>("columnFilters")!;

const { onPaginate, pageData } = inject<{
  onPaginate: (event: PageState) => void;
  pageData: ComputedRef<PagingData>;
}>("pagination")!;
// TanStack Table Instance
const table = useVueTable<TData>({
  data: tableData,
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
  manualFiltering: true,

  state: {
    get columnFilters() {
      return columnFilters.value;
    },
  },
  onColumnFiltersChange: (updater) => updateFilter(updater),
});
</script>

<template>
  <!-- Table -->
  <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd">
    <thead>
      <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          colSpan="{header.colSpan}"
          style="border: 1px solid #ddd; padding: 0.5rem; text-align: left"
        >
          <FlexRender
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="isLoading">
        <tr>
          <td
            :colspan="columns.length"
            style="text-align: center; padding: 1rem"
          >
            Loading...
          </td>
        </tr>
      </template>
      <template v-else-if="table.getRowModel().rows.length > 0">
        <slot name="table-body" :rows="table.getRowModel().rows" />
      </template>
      <template v-else>
        <tr>
          <td
            :colspan="columns.length"
            style="text-align: center; padding: 1rem"
          >
            No data available
          </td>
        </tr>
      </template>
    </tbody>
  </table>

  <!-- Pagination -->

  <Paginator
    v-if="pageData"
    :rows="pageData.pageSize"
    :totalRecords="pageData.totalRecords"
    @page="onPaginate"
  ></Paginator>
</template>
