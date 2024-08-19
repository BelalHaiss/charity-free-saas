<script setup lang="ts">
import { useGlobalState } from "@render/composables/use-global-state";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useToast } from "@render/composables/use-toast";
import { newDonateSchema } from "../../util/transaction.schema";
import { useForm } from "vee-validate";
import { NewDonate } from "@shared/types/donates/donates.dto";
import { toTypedSchema } from "@vee-validate/zod";
import AddDonorDetails from "@render/modules/donate/components/organism/add-donor-details.vue";
import AddFinancialDonate from "@render/modules/donate/components/organism/add-financial-donate.vue";
import AddDonateItems from "@render/modules/donate/components/organism/add-donate-items.vue";

const isVisible = ref(true);
const { t } = useI18n();
const { getters } = useGlobalState();
const { values, setValues } = useForm<NewDonate>({
  initialValues: {
    branch_id: getters.getBranchId(),
    created_by: getters.getCurrentUser().username,
    date: new Date(),
  },
  validationSchema: toTypedSchema(newDonateSchema),
});

console.log({ values });
const { invalidDataToast, failedToast, successToast } = useToast();
const isSubmiting = ref(false);
</script>
<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    class="w-full max-w-[700px]"
    :header="t('shared.add', { label: t('shared.item') })"
  >
    <div class="flex flex-col flex-center gap-3 *:max-w-full">
      <AddDonorDetails />
      <AddFinancialDonate />

      <AddDonateItems @set-items="(items) => setValues({ items })" />
      <div class="flex mt-4 self-end gap-2">
        <Button
          type="button"
          :disabled="isSubmiting"
          severity="secondary"
          @click="isVisible = false"
        >
          {{ t("shared.cancel") }}
        </Button>
        <Button :loading="isSubmiting" type="button" @click="() => {}">
          {{ t("shared.save") }}
        </Button>
      </div>
    </div>
  </Dialog>
</template>
