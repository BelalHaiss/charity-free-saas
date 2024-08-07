<script setup lang="ts">
import { useGlobalState } from "@render/composables/use-global-state";
import CategorySelect from "@render/modules/category/components/atoms/category-select.vue";
import SelectItemUnit from "@render/modules/unit/components/atoms/select-item-unit.vue";
import { SelectOptions } from "@render/types/form.types";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "@render/composables/use-toast";
import { NewTransaction } from "@shared/types/transaction/transaction.dto";
import MoneyInput from "../atoms/money-input.vue";
import { MoneyUnit } from "@prisma/client";
import ExpenseNameInput from "../atoms/expense-name-input.vue";
import { newExpenseSchema } from "../../util/transaction.schema";
import { transactionRepository } from "../../repository/transaction.repository";
const isVisible = ref(true);
const { t } = useI18n();
const { storage, getters } = useGlobalState();
const newExpenseItem = ref<NewTransaction>({
  branch_id: storage.value.branchId,
  amount: 0,
  created_by: storage.value.user.username,
  type: "EXPENSE",
  unit_id: 0,
  label: "",
});

const expenseNameValue = ref<SelectOptions<string>>();
const moneyUnit = ref<MoneyUnit>(getters.getMoneyUnitByEnCode("EGP")!);
const amount = ref(0);

watch([expenseNameValue, moneyUnit, amount], (newVal) => {
  newExpenseItem.value.label = newVal[0]?.value ?? "";
  newExpenseItem.value.unit_id = newVal[1]?.id ?? 0;
  newExpenseItem.value.amount = newVal[2] ?? 0;
});

const { invalidDataToast, failedToast, successToast } = useToast();
const isSubmiting = ref(false);

const saveNewItem = async () => {
  const { error } = newExpenseSchema.safeParse(newExpenseItem.value);
  if (error) {
    invalidDataToast();
    return;
  }
  try {
    await transactionRepository.createTransaction(newExpenseItem.value);
    isSubmiting.value = true;
    successToast();
    isVisible.value = false;
  } catch (error) {
    console.error({ error });
    failedToast();
  } finally {
    isSubmiting.value = true;
  }
};
</script>
<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    class="w-full max-w-[600px]"
    :header="t('shared.add', { label: t('shared.item') })"
  >
    <div class="flex flex-col flex-center gap-3">
      <ExpenseNameInput v-model="expenseNameValue" class="w-[300px]" />
      <MoneyInput v-model:value="amount" v-model:unit="moneyUnit" />
      <div class="flex mt-4 self-end gap-2">
        <Button
          type="button"
          :disabled="isSubmiting"
          severity="secondary"
          @click="isVisible = false"
        >
          {{ t("shared.cancel") }}
        </Button>
        <Button :loading="isSubmiting" type="button" @click="saveNewItem">
          {{ t("shared.save") }}
        </Button>
      </div>
    </div>
  </Dialog>
</template>
