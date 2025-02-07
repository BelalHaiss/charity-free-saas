<script setup generic="TData extends object" lang="ts">
import { defineProps, defineEmits, watch } from "vue";
import {
  useVueTable,
  ColumnDef,
  getCoreRowModel,
  FlexRender,
} from "@tanstack/vue-table";
import Paginator from "primevue/paginator";

// Define Props
interface PagingData {
  totalRecords: number;
  pageSize: number;
}

const props = defineProps<{
  columns: ColumnDef<TData>[];
  data: TData[];
  loading: boolean;
  pagingData?: PagingData;
}>();

// Define Emits
const emit = defineEmits<{
  (event: "onPaginationChange", page: number): void;
  (event: "onFilter", value: string): void;
}>();

const handlePageChange = (pageNumber: number) => {
  emit("onPaginationChange", pageNumber); // Reset to first page on page size change
};

// TanStack Table Instance
const table = useVueTable<TData>({
  data: props.data,
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
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
      <template v-if="loading">
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
    v-if="pagingData"
    :rows="pagingData.pageSize"
    :totalRecords="pagingData.totalRecords"
    @page="(page) => handlePageChange(page.page)"
  ></Paginator>
</template>
