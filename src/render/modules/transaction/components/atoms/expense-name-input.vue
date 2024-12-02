<script setup lang="ts">
import { QUERY_KEYS } from "@render/composables/use-query-typed";
import { transactionRepository } from "../../repository/transaction.repository";
import { useGlobalState } from "@render/composables/use-global-state";
import { computed, ref } from "vue";
import { SelectOptions } from "@render/types/form.types";
import CreatableSelect from "@render/components/molecules/creatable-select.vue";
import { useI18n } from "vue-i18n";
import { useQuery } from "@tanstack/vue-query";

const { t } = useI18n();
const { storage } = useGlobalState();
const branch = computed(() => storage.value.branchId);
const { data: expensesNames, isLoading } = useQuery({
  queryKey: QUERY_KEYS.EXPENSES_NAME(branch),
  queryFn: () => transactionRepository.getExpensesName(branch.value),
  initialData: [],
});

const newExpensesNameCreated = ref<SelectOptions<string>[]>([]);
const expenseOptions = computed((): SelectOptions[] => {
  const apiOptons =
    expensesNames.value?.map((label) => ({ label, value: label })) ?? [];

  return apiOptons.concat(newExpensesNameCreated.value);
});

const expenseNameValue = defineModel<SelectOptions<string>>();
const handleNewItem = (val: string) => {
  const newExpenseName: SelectOptions<string> = { label: val, value: val };
  // - new value will concat to current options and will be expenseName ref
  newExpensesNameCreated.value.push(newExpenseName);
  // - expense name refValue
  expenseNameValue.value = newExpenseName;
};
</script>
<template>
  <CreatableSelect
    v-model="expenseNameValue"
    :options="expenseOptions"
    :label="t('shared.expense', { label: t('shared.expense') })"
    :isLoading="isLoading"
    :handleNewItem="handleNewItem"
  />
</template>
