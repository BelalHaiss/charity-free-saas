<script setup lang="ts">
import Column from "primevue/column";
import TableFilterControl from "@render/components/molecules/table-filters/table-filter-control.vue";
import { RouterLink } from "vue-router/auto";
import { useBeneficiaryTable } from "../../view-model/beneficiary-table.view-model";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const {
  apiRes,
  tableQuery,
  isFetching,
  filters,
  onFilter,
  onPageChanged,
  navigateToBeneficiary,
  headers,
} = useBeneficiaryTable();
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
      :pt="{
        bodyRow: {
          class: 'cursor-pointer   transition-all hover:bg-gray-100 ',
        },
      }"
      filter-display="row"
      paginator
      @filter="onFilter"
      @page="onPageChanged"
      @row-click="(event) => navigateToBeneficiary(event.data)"
    >
      <Column
        v-for="column in headers"
        :key="column.header"
        :field="column.field"
        :show-filter-match-modes="false"
        :show-filter-menu="false"
        :header="column.header"
      >
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

        <template #body="{ data }">
          <span v-if="column.dataGetter"> {{ column.dataGetter(data) }} </span>
        </template>
      </Column>

      <template #header>
        <RouterLink to="/beneficiaries/create">
          <Button>
            {{ t("add", { label: t("beneficiary") }) }}
          </Button>
        </RouterLink>
      </template>
    </DataTable>
  </div>
</template>
