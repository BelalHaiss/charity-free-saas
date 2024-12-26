<script setup lang="ts">
import { MoneyTotalsBoxes } from "@render/modules/transaction/types/transactions.types";
import MoneyBox from "../atoms/money-box.vue";
import { useI18n } from "vue-i18n";

import { DayData } from "../../view-model/home-summary-view-mode";
import { useGlobalState } from "@render/composables/use-global-state";
import {
  groupAndSumTransactions,
  getTransactionNet,
  convertTransactionGroupToArray,
} from "@render/modules/transaction/util/transaction.util";
import { computed, ref } from "vue";
import { Locale } from "@shared/types/util.types";
import AddExpenseModal from "@render/modules/transaction/components/organisms/add-expense.modal.vue";
import AddDonateModal from "@render/modules/transaction/components/organisms/add-donate.modal.vue";

const { expenses, incomes } = defineProps<DayData>();

const { storage } = useGlobalState();
const { locale } = useI18n<object, Locale>();

const moneyUnits = computed(() => storage.value.moneyUnits);

const moneyTotals = ref<MoneyTotalsBoxes>({
  incomes: [],
  expenses: [],
  net: [],
});

const totalExpenses = groupAndSumTransactions(
  expenses,
  moneyUnits.value,
  locale.value,
);
const totalIncomes = groupAndSumTransactions(
  incomes,
  moneyUnits.value,
  locale.value,
);
const net = getTransactionNet(totalIncomes, totalExpenses);

moneyTotals.value = {
  expenses: convertTransactionGroupToArray(totalExpenses),
  incomes: convertTransactionGroupToArray(totalIncomes),
  net: convertTransactionGroupToArray(net),
};

const isExpenseModalVisible = ref(false);
const isDonateModalVisible = ref(false);
const { t } = useI18n();
</script>
<template>
  <div class="flex *:flex-1 items-center gap-2 flex-1">
    <MoneyBox
      class="bg-primary-color"
      :label="t('net')"
      :money-items="moneyTotals.net"
    />
    <MoneyBox
      class="bg-red-500"
      :label="t('expenses')"
      :money-items="moneyTotals.expenses"
      :on-click="
        () => {
          isExpenseModalVisible = true;
        }
      "
    />
    <MoneyBox
      :on-click="
        () => {
          isDonateModalVisible = true;
        }
      "
      class="bg-primary-color"
      :label="t('donates')"
      :money-items="moneyTotals.incomes"
    />

    <AddExpenseModal v-model="isExpenseModalVisible" />

    <AddDonateModal v-model="isDonateModalVisible" />
  </div>
</template>
