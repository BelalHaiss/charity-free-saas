<script setup lang="ts">
import { useGlobalState } from "@render/composables/use-global-state";
import { inject, Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "@render/composables/use-toast";
import { NewTransaction } from "@shared/types/transaction/transaction.dto";
import MoneyInput from "../atoms/money-input.vue";
import ExpenseNameInput from "../atoms/expense-name-input.vue";
import { newExpenseSchema } from "../../util/transaction.schema";
import { transactionRepository } from "../../repository/transaction.repository";
import {
  useQueryHelper,
  QUERY_KEYS,
} from "@render/composables/use-query-typed";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Locale } from "@shared/types/util.types";
import FormControl from "@render/components/molecules/form/form-control.vue";
const isVisible = defineModel<boolean>();
const { t, locale } = useI18n<object, Locale>();
const { storage } = useGlobalState();

const { invalidateQueries } = useQueryHelper();

const selectedDate = inject<Ref<Date, Date>>("currentSelectedDate");

const { handleSubmit, isSubmitting, isFieldDirty } = useForm<NewTransaction>({
  validationSchema: toTypedSchema(newExpenseSchema(locale.value)),
  initialValues: {
    branch_id: storage.value.branchId,
    created_by: storage.value.user.username,
    type: "EXPENSE",
    date: new Date(),
  },
});
const { failedToast, successToast } = useToast();

const saveNewItem = async (newTransaction: NewTransaction) => {
  try {
    await transactionRepository.createTransaction(newTransaction);
    await invalidateQueries(QUERY_KEYS.TRANSACTION(selectedDate!));
    successToast();

    isVisible.value = false;
  } catch (error) {
    console.error({ error });
    failedToast();
  }
};
const onSubmit = handleSubmit(saveNewItem, (erro) => {
  console.log(erro.errors);
});
</script>
<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    class="w-full max-w-[600px]"
    :header="t('shared.add', { label: t('shared.item') })"
  >
    <form @submit="onSubmit" class="flex flex-col flex-center gap-3">
      <FormControl
        v-bind="{
          name: 'date',
          label: t(`shared.select-date`),
          type: 'date',
        }"
      />
      <ExpenseNameInput formFieldName="label" class="w-[300px]" />
      <MoneyInput amountFieldName="amount" moneyUnitFieldName="unit_id" />
      <div class="flex mt-4 self-end gap-2">
        <Button
          type="button"
          :disabled="isSubmitting"
          severity="secondary"
          @click="isVisible = false"
        >
          {{ t("shared.cancel") }}
        </Button>
        <Button
          :loading="isSubmitting"
          :disabled="!isFieldDirty('label') || !isFieldDirty('amount')"
          type="submit"
        >
          {{ t("shared.save") }}
        </Button>
      </div>
    </form>
  </Dialog>
</template>
