<script setup lang="ts">
import { TableColumns } from "@render/types/table.types";
import { formatDate } from "@render/utils/date.util";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { DayData } from "../../view-model/home-summary-view-mode";
import { ClientTransaction } from "@render/modules/transaction/types/transactions.types";
import { useGlobalState } from "@render/composables/use-global-state";
import { getCodeLabel } from "@render/modules/unit/utils/money-unit-utils";

const { getters } = useGlobalState();
const { t } = useI18n();
const headers = computed<TableColumns<ClientTransaction>[]>(() => [
  {
    field: "label",
    dataGetter: (expense) => expense.label,
    header: t("shared.label"),
  },
  {
    field: "amount",
    dataGetter: (expense) =>
      `${expense.amount} ${getCodeLabel(getters.getMoneyUnitById(expense.unit_id)!)}`,
    header: t("shared.amount"),
  },

  {
    field: "created_by",
    dataGetter: (expense) => expense.created_by,
    header: t("shared.user"),
  },
  {
    field: "created_at",
    dataGetter: (expense) => formatDate(expense.created_at, "yyyy-LL-dd"),
    header: t("shared.date"),
  },
]);

const dayData = inject<Ref<DayData>>("dayData");

const expenses = computed<ClientTransaction[]>(
  () => dayData?.value.expenses ?? [],
);

// fetch data
</script>
<template>
  <DataTable
    :rows="expenses.length"
    :value="expenses"
    showGridlines
    lazy
    :pt="{
      bodyRow: {
        class: 'cursor-pointer   transition-all hover:bg-gray-100 ',
      },
    }"
    paginator
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
        <span class="block"> {{ column.dataGetter(data) }} </span>
      </template>
    </Column>
  </DataTable>
</template>
