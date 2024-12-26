<script setup lang="ts">
import { useGlobalState } from "@render/composables/use-global-state";
import { inject, Ref, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "@render/composables/use-toast";
import { useForm } from "vee-validate";
import { NewDonate } from "@shared/types/donates/donates.dto";
import { toTypedSchema } from "@vee-validate/zod";
import AddDonorDetails from "@render/modules/donate/components/organism/add-donor-details.vue";
import AddFinancialDonate from "@render/modules/donate/components/organism/add-financial-donate.vue";
import AddDonateItems from "@render/modules/donate/components/organism/add-donate-items.vue";
import { newDonateSchema } from "@shared/services/schema/donate.schema";
import { donateRepository } from "@render/modules/donate/repository/donate.repository";
import ConfirmDialog from "@render/components/organisms/confirm-dialog.vue";
import { useConfirm } from "@render/composables/use-confirm";
import { Locale } from "@shared/types/util.types";
import {
  QUERY_KEYS,
  useQueryHelper,
} from "@render/composables/use-query-typed";

const isVisible = defineModel<boolean>();
const { t, locale } = useI18n<object, Locale>();

const { storage } = useGlobalState();

const { invalidateQueries } = useQueryHelper();

const selectedDate = inject<Ref<Date, Date>>("currentSelectedDate");

const { getters } = useGlobalState();
const { setValues, handleSubmit, isSubmitting, values } = useForm<NewDonate>({
  initialValues: {
    branch_id: getters.getBranchId(),
    created_by: getters.getCurrentUser()!.username,
    date: new Date(),
    financialTransaction: {
      branch_id: getters.getBranchId(),
      amount: 0,
    },
  },
  validationSchema: toTypedSchema(newDonateSchema(locale.value)),
});

const submitDataToServer = async () => {
  try {
    console.log(JSON.stringify(values));
    await donateRepository.createNewDonate(values);
    await invalidateQueries(QUERY_KEYS.TRANSACTION(selectedDate!));

    successToast();
    isVisible.value = false;
  } catch (error) {
    failedToast(error);
  }
};

const onSubmit = handleSubmit(
  () => confirmProps.showDialog(),
  (errors) =>
    console.error(JSON.stringify({ ...errors.errors, ...errors.values })),
);

const { failedToast, successToast } = useToast();
const confirmProps = useConfirm(submitDataToServer);
</script>
<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    class="w-full max-w-[700px]"
    :header="t('add', { label: t('item') })"
  >
    <form
      @submit="onSubmit"
      class="flex flex-col flex-center gap-3 *:max-w-full"
    >
      <AddDonorDetails />
      <AddFinancialDonate />

      <AddDonateItems @set-items="(items) => setValues({ items })" />
      <div class="flex mt-4 self-end gap-2">
        <Button
          type="reset"
          :disabled="isSubmitting"
          severity="secondary"
          @click="isVisible = false"
        >
          {{ t("cancel") }}
        </Button>
        <Button type="submit" :loading="isSubmitting">
          {{ t("save") }}
        </Button>
      </div>
    </form>
    <ConfirmDialog v-bind="confirmProps" />
  </Dialog>
</template>
