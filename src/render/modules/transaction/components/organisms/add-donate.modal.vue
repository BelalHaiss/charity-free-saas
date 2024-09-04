<script setup lang="ts">
import { useGlobalState } from "@render/composables/use-global-state";
import { ref } from "vue";
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

const isVisible = ref(true);
const { t } = useI18n();
const { getters } = useGlobalState();
const { setValues, handleSubmit, isSubmitting } = useForm<NewDonate>({
  initialValues: {
    branch_id: getters.getBranchId(),
    created_by: getters.getCurrentUser().username,
    date: new Date(),
    financialTransaction: {
      branch_id: getters.getBranchId(),
      amount: 0,
    },
  },
  validationSchema: toTypedSchema(newDonateSchema),
});

const submitDataToServer = async (values: NewDonate) => {
  try {
    await donateRepository.createNewDonate(values);
    successToast();
  } catch (error) {
    failedToast();
  }
};
const onSubmit = handleSubmit(submitDataToServer, (error) => {
  fieldMissingToast();
});

const { invalidDataToast, failedToast, successToast, fieldMissingToast } =
  useToast();
</script>
<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    class="w-full max-w-[700px]"
    :header="t('shared.add', { label: t('shared.item') })"
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
          {{ t("shared.cancel") }}
        </Button>
        <Button type="submit" :loading="isSubmitting">
          {{ t("shared.save") }}
        </Button>
      </div>
    </form>
  </Dialog>
</template>
