<script setup lang="ts">
import { MoneyTotalsBoxes } from "@render/modules/transaction/types/transactions.types";
import MoneyBox from "../atoms/money-box.vue";
import { useI18n } from "vue-i18n";
import NoteBox from "../atoms/note-box.vue";
import { Note } from "@prisma/client";
import { DayData } from "../../view-model/home-summary-view-mode";
import { useGlobalState } from "@render/composables/use-global-state";
import {
  groupAndSumTransactions,
  getTransactionNet,
  convertTransactionGroupToArray,
} from "@render/modules/transaction/util/transaction.util";
import { computed, ref } from "vue";

const { expenses, incomes, notes } = defineProps<DayData>();

const { storage } = useGlobalState();

const units = computed(() => storage.value.units);

const moneyTotals = ref<MoneyTotalsBoxes>({
  incomes: [],
  expenses: [],
  net: [],
});
const totalExpenses = groupAndSumTransactions(expenses, units.value);
const totalIncomes = groupAndSumTransactions(incomes, units.value);
const net = getTransactionNet(totalIncomes, totalExpenses);

moneyTotals.value = {
  expenses: convertTransactionGroupToArray(totalExpenses),
  incomes: convertTransactionGroupToArray(totalIncomes),
  net: convertTransactionGroupToArray(net),
};

const { t } = useI18n();
</script>
<template>
  <div class="flex *:flex-1 items-center gap-2 flex-1">
    <MoneyBox
      class="bg-primary-color"
      :label="t('shared.net')"
      :money-items="moneyTotals.net"
    />
    <MoneyBox
      class="bg-red-500"
      :label="t('shared.expenses')"
      :money-items="moneyTotals.expenses"
    />
    <MoneyBox
      class="bg-primary-color"
      :label="t('shared.donates')"
      :money-items="moneyTotals.incomes"
    />

    <NoteBox :on-click="() => {}" :notes="notes" />
  </div>
</template>
