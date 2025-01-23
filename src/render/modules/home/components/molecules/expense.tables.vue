<script setup lang="ts">
import { TableColumns } from "@render/types/table.types";
import { formatDate } from "@render/utils/date.util";
import { computed, inject, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { DayData } from "../../view-model/home-summary-view-mode";
import { ClientTransaction } from "@render/modules/transaction/types/transactions.types";
import { useGlobalState } from "@render/composables/use-global-state";
import { getCodeLabel } from "@render/modules/unit/utils/money-unit-utils";
import IconRepository from "@render/components/atoms/icon-repository.vue";
import DeleteItemWithConfirmDialog from "@render/components/molecules/delete-item-with-confirm-dialog.vue";
import { transactionRepository } from "@render/modules/transaction/repository/transaction.repository";
import { useToast } from "@render/composables/use-toast";
import {
  QUERY_KEYS,
  useQueryHelper,
} from "@render/composables/use-query-typed";

const { successToast, failedToast } = useToast();
const { invalidateQueries } = useQueryHelper();
const selectedDate = inject<Ref<Date, Date>>("currentSelectedDate");
const handleDeleteExpense = async (expenseId: number) => {
  try {
    await transactionRepository.deleteExpense(expenseId);
    await invalidateQueries(QUERY_KEYS.TRANSACTION(selectedDate!));
    successToast();
  } catch (e) {
    failedToast(e);
  }
};
const { getters } = useGlobalState();
const { t } = useI18n();
const headers = computed<TableColumns<ClientTransaction>[]>(() => [
  {
    field: "label",
    dataGetter: (expense) => expense.label,
    header: t("label"),
  },
  {
    field: "amount",
    dataGetter: (expense) =>
      `${expense.amount} ${getCodeLabel(getters.getMoneyUnitById(expense.unit_id)!)}`,
    header: t("amount"),
  },

  {
    field: "created_by",
    dataGetter: (expense) => expense.created_by,
    header: t("user"),
  },
  {
    field: "created_at",
    dataGetter: (expense) => formatDate(expense.created_at, "yyyy-LL-dd"),
    header: t("date"),
  },
  {
    field: "delete",
    header: "delete",
    headerComponent: {
      component: IconRepository,
      props: { iconName: "filled-delete" },
    },
    bodyComponent: {
      component: DeleteItemWithConfirmDialog,
      props: (expense) => ({
        handleDelete: () => handleDeleteExpense(expense.id),
      }),
    },
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
      <template v-if="column.headerComponent" #header>
        <component
          :is="column.headerComponent.component"
          v-bind="column.headerComponent.props"
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
  </DataTable>
</template>
