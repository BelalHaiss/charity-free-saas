<script setup lang="ts">
import { Item } from "@prisma/client";
import TableFilterControl from "@render/components/molecules/table-filters/table-filter-control.vue";
import { useTypedI18n } from "@render/composables/use-typed-i18n";
import { benefitRepository } from "@render/modules/benefits/repository/benefit.repository";
import DynamicColumnRenders from "@render/modules/dynamic-table/components/organism/dynamic-column-renders.vue";
import { useDynamicTable } from "@render/modules/dynamic-table/useDynamicTable";
import UnitLabelSpan from "@render/modules/unit/components/atoms/unit-label-span.vue";
import { TableColumns } from "@render/types/table.types";
import { ItemIncludeCategoryAndBenefit } from "@shared/types/benefit/benefit.dto";
import { DataTableFilterMeta } from "primevue/datatable";
import { computed } from "vue";

const saveFn = async () => {};
const getNewItemValue = () => ({}) as Item;
const {
  filters,
  submitBatch,
  onAddRow,
  cancelAll,
  onFilter,
  onPaginate,
  tableData,
  totalRecords,
  isLoading,
} = useDynamicTable({
  queryFn: benefitRepository.getBenefitItems,
  saveFn,
  initialQuery: {
    pagination: { page: 0, pageSize: 10 },
    filter: {},
  },
  getDefaultValues: getNewItemValue,
});
const { t } = useTypedI18n();
const headers = computed<TableColumns<ItemIncludeCategoryAndBenefit>[]>(() => [
  {
    header: t("category"),
    field: "category_id",
    dataGetter: (data) => data.category.name,
  },
  {
    header: t("item"),
    field: "name",
    dataGetter: (data) => data.name,
  },
  {
    header: t("unit"),
    field: "unit",
    bodyComponent: {
      component: UnitLabelSpan,
      props: (data) => ({
        unitId: data.unit_id,
      }),
    },
  },
  {
    header: t("qty"),
    field: "qty",
    dataGetter: (data) => data.qty,
  },
  {
    header: t("count", { label: t("beneficiaries") }),
    field: "benefit",
    dataGetter: (data) => data.benefit.beneficiaries_count,
  },
]);
</script>
<template>
  <div>
    <DataTable
      :rows="10"
      :value="tableData"
      :loading="isLoading"
      :filters="filters as DataTableFilterMeta"
      :totalRecords="totalRecords"
      lazy
      showGridlines
      :pt="{
        bodyRow: {
          class: 'cursor-pointer   transition-all hover:bg-gray-100 ',
        },
      }"
      filter-display="row"
      paginator
      @filter="onFilter"
      @page="onPaginate"
    >
      <Column
        v-for="column in headers"
        :key="column.header"
        :field="column.field as string"
        :show-filter-match-modes="false"
        :show-filter-menu="false"
        :header="column.header"
      >
        <template v-if="column.headerComponent" #header>
          <component
            :is="column.headerComponent.component"
            v-bind="column.headerComponent.props"
          />
        </template>

        <template
          v-if="filters && filters[column.field as string]"
          #filter="{ filterCallback, filterModel }"
          class="max-w-[100px]"
        >
          <TableFilterControl
            v-model="filterModel.value"
            :name="column.field as string"
            :type="column.fieldType ?? 'text'"
            @keydown.enter="filterCallback()"
          />
        </template>

        <template #body="{ data }">
          <span v-if="column.dataGetter">{{ column.dataGetter!(data) }} </span>
          <component
            v-if="column.bodyComponent"
            :is="column.bodyComponent.component"
            v-bind="column.bodyComponent.props!(data)"
          />
        </template>
      </Column>

      <template #header>
        <RouterLink to="/beneficiaries/create">
          <Button> add </Button>
        </RouterLink>
      </template>
    </DataTable>

    <button @click="onAddRow">
      add row
    </button>
    <button @click="cancelAll">
      cancel All
    </button>
  </div>
</template>
