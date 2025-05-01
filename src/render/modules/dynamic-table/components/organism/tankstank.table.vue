<script setup generic="TData extends MutableTableRow<Identifiable>" lang="ts">
import { defineProps, watch } from "vue";
import {
  useVueTable,
  ColumnDef,
  getCoreRowModel,
  FlexRender,
} from "@tanstack/vue-table";
import Paginator from "primevue/paginator";
import { MutableTableRow } from "@render/types/table.types";
import { Identifiable } from "@shared/types/util.types";
import AddBtnIcon from "@render/components/atoms/add-btn-icon.vue";
import { useDynamicTableContext } from "../../useDynamicTable";

// Define Props

const props = defineProps<{
  columns: ColumnDef<TData>[];
}>();

// Define Emits

const {
  tableData,
  columnFilters,
  updateFilter,
  pageData,
  onPaginate,
  isLoading,
  addNewItem,
} = useDynamicTableContext<TData>();

watch(
  tableData,
  (tableData) => {
    console.log(tableData, "deep watch");
  },
  { deep: true },
);
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
      <tr
        class="bg-brand-300"
        v-for="headerGroup in table.getHeaderGroups()"
        :key="headerGroup.id"
      >
        <th
          class="py-2"
          v-for="header in headerGroup.headers"
          :key="header.id"
          colSpan="{header.colSpan}"
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
    <tfoot>
      <tr>
        <td :colspan="columns.length" class="text-center py-4">
          <AddBtnIcon @click="addNewItem" />
        </td>
      </tr>
    </tfoot>
  </table>

  <!-- Pagination -->

  <Paginator
    v-if="pageData"
    :rows="pageData.pageSize"
    :totalRecords="pageData.totalRecords"
    @page="onPaginate"
  ></Paginator>
</template>
