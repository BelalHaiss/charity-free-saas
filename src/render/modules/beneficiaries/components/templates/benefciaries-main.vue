<script setup lang="ts">
import TableFilterControl from "@render/components/molecules/table-filters/table-filter-control.vue";
import { useQueryTyped } from "@render/composables/use-query-typed";
import type { Locale } from "@render/config/i18n";
import { TableColumns, TableFilter } from "@render/types/table.types";
import { formatDate } from "@render/utils/date.util";
import {
  BeneficiaryTableDTO,
  BeneficiaryTableQuery,
} from "@shared/types/beneficiaries/beneficiaries.dto";
import Column from "primevue/column";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router/auto";
import { beneficiaryRepository } from "../../repository/beneficiary.repository";
import { DataTableFilterEvent, DataTablePageEvent } from "primevue/datatable";

const { t, locale } = useI18n<object, Locale>();
const headers = computed<TableColumns<BeneficiaryTableDTO["data"][number]>[]>(
  () => [
    {
      field: "id",
      dataGetter: (data) => data.id,
      header: t("shared.code"),
      fieldType: "number",
    },
    {
      field: "name",
      dataGetter: (data) => data.name,
      header: t("shared.name", { label: t("shared.beneficiary") }),
    },
    {
      dataGetter: (data) => data.identity_card!,
      field: "identity_card",
      header: t("identity_card"),
      fieldType: "text",
    },
    {
      dataGetter: (data) => data.sponsorship_case_id!.toString(),
      field: "sponsorship_case_id",
      header: t("shared.type", { label: t("shared.sponsorship") }),
      fieldType: "select",
    },
    {
      field: "created_at",
      dataGetter: (data) =>
        formatDate(data.created_at, locale.value, "d / L / y"),

      header: t("shared.created_at"),
      fieldType: "date",
    },
    {
      dataGetter: (data) =>
        formatDate(data.updated_at, locale.value, "d / L / y"),
      header: t("shared.updated_at"),
      field: "updated_at",
      fieldType: "date",
    },
    {
      dataGetter: (data) => data.notes?.slice(0, 30) ?? "",
      field: "notes",
      header: t("shared.note"),
    },
  ],
);
const filters = ref<TableFilter<BeneficiaryTableQuery["filter"]>>({
  id: { value: undefined, matchMode: "contains" },
  identity_card: { value: undefined, matchMode: "contains" },
  name: { value: undefined, matchMode: "contains" },
});

const tableQuery = ref<BeneficiaryTableQuery>({
  pagination: {
    page: 0,
    pageSize: 20,
  },
  filter: {},
});

const { data: apiRes, isFetching } = useQueryTyped({
  queryKey: ["beneficiary", tableQuery],
  queryFn: () => beneficiaryRepository.getBeneficiariesTableData(tableQuery),
});
const onPageChanged = (e: DataTablePageEvent) => {
  tableQuery.value.pagination.page = e.page;
};

const onFilter = (e: DataTableFilterEvent) => {
  filters.value = e.filters;
  tableQuery.value.filter = {
    id: filters.value.id?.value,
    identity_card: filters.value.identity_card?.value,
    name: filters.value.name?.value,
  };
};
</script>
<template>
  <div class="flex flex-col page-content p-2">
    <DataTable
      :rows="tableQuery.pagination.pageSize"
      :value="apiRes?.data"
      :loading="isFetching"
      :filters="filters"
      :totalRecords="apiRes?.totalRecords"
      showGridlines
      lazy
      filter-display="row"
      paginator
      @filter="onFilter"
      @page="onPageChanged"
    >
      <Column
        v-for="column in headers"
        :key="column.header"
        :field="column.field"
        :show-filter-match-modes="false"
        :show-filter-menu="false"
        :header="column.header"
      >
        <template #body="{ data }">
          <span> {{ column.dataGetter(data) }} </span>
        </template>
        <template
          v-if="filters[column.field]"
          #filter="{ filterCallback, filterModel }"
          class="max-w-[100px]"
        >
          <TableFilterControl
            v-model="filterModel.value"
            :name="column.field"
            :type="column.fieldType ?? 'text'"
            @keydown.enter="filterCallback()"
          />
        </template>
      </Column>

      <template #header>
        <RouterLink to="/beneficiaries/create">
          <Button>
            {{ $t("shared.add", { label: $t("shared.beneficiary") }) }}
          </Button>
        </RouterLink>
      </template>
    </DataTable>
  </div>
</template>
